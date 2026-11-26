// src/viewer/templates/museumMultiplayer.js - Real-Time Multi-User Sync Engine
// Handles: BroadcastChannel (cross-tab 0ms) + WebSockets (cross-device <30ms) + HTTP Polling Fallback

export class MuseumMultiplayer {
  constructor(room, userProfile, onPeerUpdate, onPeerAction, onPeerChat) {
    this.room = room || 'museum_main_room';
    this.userId = 'usr_' + Math.random().toString(36).substring(2, 9);
    this.userProfile = userProfile || { name: 'Visitor', gender: 'male' };
    this.onPeerUpdate = onPeerUpdate || (() => {});
    this.onPeerAction = onPeerAction || (() => {});
    this.onPeerChat = onPeerChat || (() => {});

    this.peers = new Map(); // userId -> { name, gender, x, y, z, rotY, isWalking, isSeated, isKneeling, lastSeen, viaBc }
    this.ws = null;
    this.bc = null;
    this.isDestroyed = false;
    this.pollTimeout = null;
    this.outboundActions = [];
    this.lastActionId = 0;
    this.seenActionIds = new Set();
    this.isPollingInProgress = false;
    this.currentState = {
      name: this.userProfile.name,
      gender: this.userProfile.gender,
      x: 0,
      y: 0,
      z: 0,
      rotY: Math.PI,
      isWalking: false,
      isSeated: false,
      isKneeling: false,
      vx: 0,
      vz: 0
    };
    this._wasWalking = false;

    this._onUnload = () => this.sendLeaveBeacon();
    this.init();
  }

  init() {
    // 1. Layer 1: BroadcastChannel for instant local sync across tabs/windows
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.bc = new BroadcastChannel('museum_room_' + this.room);
        this.bc.onmessage = (event) => {
          this.handleIncomingMessage(event.data, true);
        };
      } catch (e) {
        console.warn('BroadcastChannel error:', e);
      }
    }

    // 2. Layer 2: WebSockets to backend server (only when protocol & host support WS)
    this.connectWebSocket();

    // 3. Layer 3: Adaptive HTTP Sync (280ms when WS inactive, 1200ms heartbeat when WS open)
    this.scheduleNextPoll(50);

    if (typeof window !== 'undefined') {
      window.addEventListener('pagehide', this._onUnload);
      window.addEventListener('beforeunload', this._onUnload);
    }

    // Announce Join immediately
    this.broadcast({
      type: 'join',
      room: this.room,
      userId: this.userId,
      ...this.currentState
    });
  }

  scheduleNextPoll(delayMs = null) {
    if (this.isDestroyed) return;
    clearTimeout(this.pollTimeout);
    const wsConnected = this.ws && this.ws.readyState === WebSocket.OPEN;
    let anyPeerWalking = false;
    for (const p of this.peers.values()) {
      if (p.isWalking) { anyPeerWalking = true; break; }
    }
    const activeMotion = Boolean(this.currentState?.isWalking) || anyPeerWalking;
    const defaultWait = wsConnected ? 1200 : (activeMotion ? 110 : 380);
    const wait = delayMs !== null ? delayMs : defaultWait;
    this.pollTimeout = setTimeout(async () => {
      await this.pollHttpFallback();
      this.scheduleNextPoll();
    }, wait);
  }

  connectWebSocket() {
    try {
      const isHttps = window.location.protocol === 'https:';
      const isDirectOracleOrLocal =
        window.location.hostname === '155.248.255.29' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';

      const wsUrl = isDirectOracleOrLocal
        ? `${isHttps ? 'wss://' : 'ws://'}${window.location.host}/ws`
        : `wss://155.248.255.29.sslip.io/ws`;

      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.ws.send(JSON.stringify({
          type: 'join',
          room: this.room,
          userId: this.userId,
          ...this.currentState
        }));
        // Immediately announce initial position to peers already in room
        this.ws.send(JSON.stringify({
          type: 'move',
          room: this.room,
          userId: this.userId,
          ...this.currentState
        }));
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleIncomingMessage(data, false, true);
        } catch (e) {}
      };

      this.ws.onerror = () => {
        // Graceful fallback to HTTP polling
      };

      this.ws.onclose = () => {
        if (!this.isDestroyed) {
          setTimeout(() => this.connectWebSocket(), 3000);
        }
      };
    } catch (e) {
      console.warn('WS Init fallback active');
    }
  }

  handleIncomingMessage(data, viaBc = false, viaWs = false) {
    if (!data || data.userId === this.userId) return;

    if (data.type === 'move' || data.type === 'join') {
      const prev = this.peers.get(data.userId);
      const now = Date.now();
      this.peers.set(data.userId, {
        userId: data.userId,
        name: data.name || prev?.name || 'Visitor',
        gender: data.gender || prev?.gender || 'female',
        x: typeof data.x === 'number' ? data.x : (prev?.x || 0),
        y: typeof data.y === 'number' ? data.y : (prev?.y || 0),
        z: typeof data.z === 'number' ? data.z : (prev?.z || 0),
        rotY: typeof data.rotY === 'number' ? data.rotY : (prev?.rotY || 0),
        vx: typeof data.vx === 'number' ? data.vx : 0,
        vz: typeof data.vz === 'number' ? data.vz : 0,
        isWalking: Boolean(data.isWalking),
        isSeated: Boolean(data.isSeated),
        isKneeling: Boolean(data.isKneeling),
        lastSeen: now,
        lastWsMoveAt: viaWs ? now : (prev?.lastWsMoveAt || 0),
        viaBc: viaBc || Boolean(prev?.viaBc)
      });
      this.onPeerUpdate(new Map(this.peers));
    } else if (data.type === 'action') {
      const actKey = data._actionId || (data.userId + '_' + data.action + '_' + (data.timestamp || ''));
      if (data.timestamp && this.seenActionIds.has(actKey)) return;
      if (data.timestamp) {
        this.seenActionIds.add(actKey);
        if (this.seenActionIds.size > 200) {
          const first = this.seenActionIds.values().next().value;
          this.seenActionIds.delete(first);
        }
      }
      this.onPeerAction(data);
    } else if (data.type === 'chat') {
      const chatKey = data._actionId || (data.userId + '_chat_' + (data.timestamp || ''));
      if (data.timestamp && this.seenActionIds.has(chatKey)) return;
      if (data.timestamp) this.seenActionIds.add(chatKey);
      this.onPeerChat(data);
    } else if (data.type === 'leave') {
      if (this.peers.has(data.userId)) {
        this.peers.delete(data.userId);
        this.onPeerUpdate(new Map(this.peers));
      }
    }
  }

  async pollHttpFallback() {
    if (this.isDestroyed || this.isPollingInProgress) return;
    this.isPollingInProgress = true;
    try {
      const actionsToSend = [...this.outboundActions];
      this.outboundActions = [];

      const isDirectHost =
        window.location.hostname === '155.248.255.29' ||
        window.location.hostname === '155.248.255.29.sslip.io' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';
      const syncEndpoint = isDirectHost
        ? '/api/museum/sync'
        : 'https://155.248.255.29.sslip.io/api/museum/sync';

      const res = await fetch(syncEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: this.room,
          userId: this.userId,
          state: this.currentState,
          actions: actionsToSend,
          lastActionId: this.lastActionId
        })
      });

      if (res.ok) {
        const body = await res.json();
        const now = Date.now();
        let changed = false;

        if (body.peers && Array.isArray(body.peers)) {
          const serverIds = new Set();
          body.peers.forEach(p => {
            if (p.userId && p.userId !== this.userId) {
              serverIds.add(p.userId);
              const existing = this.peers.get(p.userId);
              // Never overwrite fresh WebSocket movement with stale HTTP snapshot
              const hasFreshWs = existing && (now - (existing.lastWsMoveAt || 0) < 2000);
              if (hasFreshWs) {
                existing.lastSeen = now;
              } else {
                this.peers.set(p.userId, {
                  ...p,
                  lastSeen: now,
                  lastWsMoveAt: existing?.lastWsMoveAt || 0,
                  viaBc: Boolean(existing?.viaBc)
                });
                changed = true;
              }
            }
          });

          // Prune stale peers missing from server or timed out (>7.5s)
          for (const [uid, p] of this.peers.entries()) {
            const expired = now - (p.lastSeen || 0) > 7500;
            const goneFromServer = !p.viaBc && !serverIds.has(uid);
            if (expired || goneFromServer) {
              this.peers.delete(uid);
              changed = true;
            }
          }

          if (changed) {
            this.onPeerUpdate(new Map(this.peers));
          }
        }

        if (body.latestActionId) {
          this.lastActionId = Math.max(this.lastActionId, body.latestActionId);
        }

        if (body.actions && Array.isArray(body.actions)) {
          body.actions.forEach(act => {
            this.handleIncomingMessage(act, false);
          });
        }
      } else if (actionsToSend.length > 0) {
        this.outboundActions = [...actionsToSend, ...this.outboundActions];
      }
    } catch (e) {
      // Offline fallback silent
    } finally {
      this.isPollingInProgress = false;
    }
  }

  sendMove(x, y, z, rotY, isWalking, isSeated = false, isKneeling = false, vx = 0, vz = 0) {
    this.currentState = {
      name: this.userProfile.name,
      gender: this.userProfile.gender,
      x, y, z, rotY, isWalking, isSeated, isKneeling, vx, vz
    };

    const payload = {
      type: 'move',
      room: this.room,
      userId: this.userId,
      ...this.currentState
    };
    this.broadcast(payload);

    // If walking state just started or stopped and WS is inactive, flush HTTP sync immediately
    const wsConnected = this.ws && this.ws.readyState === WebSocket.OPEN;
    if (!wsConnected && Boolean(isWalking) !== this._wasWalking) {
      this._wasWalking = Boolean(isWalking);
      this.pollHttpFallback();
    } else {
      this._wasWalking = Boolean(isWalking);
    }
  }

  sendAction(action, extra = {}) {
    const payload = {
      type: 'action',
      room: this.room,
      userId: this.userId,
      name: this.userProfile.name,
      gender: this.userProfile.gender,
      action,
      timestamp: Date.now(),
      ...extra
    };
    this.broadcast(payload);
    this.outboundActions.push(payload);
    this.pollHttpFallback();
  }

  sendChat(text) {
    const payload = {
      type: 'chat',
      room: this.room,
      userId: this.userId,
      name: this.userProfile.name,
      gender: this.userProfile.gender,
      text,
      timestamp: Date.now()
    };
    this.broadcast(payload);
    this.outboundActions.push(payload);
    this.pollHttpFallback();
  }

  sendLeaveBeacon() {
    const leavePayload = { type: 'leave', room: this.room, userId: this.userId };
    this.broadcast(leavePayload);
  }

  broadcast(payload) {
    const str = JSON.stringify(payload);
    if (this.bc) {
      try { this.bc.postMessage(payload); } catch (e) {}
    }
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try { this.ws.send(str); } catch (e) {}
    }
  }

  destroy() {
    this.isDestroyed = true;
    clearTimeout(this.pollTimeout);
    if (typeof window !== 'undefined') {
      window.removeEventListener('pagehide', this._onUnload);
      window.removeEventListener('beforeunload', this._onUnload);
    }
    this.sendLeaveBeacon();
    if (this.bc) this.bc.close();
    if (this.ws) {
      this.ws.close();
    }
    this.peers.clear();
  }
}
