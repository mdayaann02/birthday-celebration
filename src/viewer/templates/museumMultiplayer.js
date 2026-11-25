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

    this.peers = new Map(); // userId -> { name, gender, x, y, z, rotY, isWalking, lastSeen }
    this.ws = null;
    this.bc = null;
    this.isDestroyed = false;
    this.pollingInterval = null;
    this.outboundActions = [];
    this.lastActionId = 0;
    this.seenActionIds = new Set();
    this.isPollingInProgress = false;
    this.currentState = null;

    this.init();
  }

  init() {
    // 1. Layer 1: BroadcastChannel for instant local testing across tabs/windows
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.bc = new BroadcastChannel('museum_room_' + this.room);
        this.bc.onmessage = (event) => {
          this.handleIncomingMessage(event.data);
        };
      } catch (e) {
        console.warn('BroadcastChannel error:', e);
      }
    }

    // 2. Layer 2: WebSockets to backend server (when on direct host or matching protocol)
    this.connectWebSocket();

    // 3. Layer 3: Ultra-Fast HTTP Sync (every 300ms) with Action Queuing
    this.pollingInterval = setInterval(() => {
      this.pollHttpFallback();
    }, 300);

    // Announce Join
    this.broadcast({
      type: 'join',
      room: this.room,
      userId: this.userId,
      name: this.userProfile.name,
      gender: this.userProfile.gender
    });
  }

  connectWebSocket() {
    try {
      const isHttps = window.location.protocol === 'https:';
      // If served from backend server, use same origin ws. Otherwise use Oracle VM public IP
      const wsHost = (window.location.hostname === '155.248.255.29' || window.location.hostname === 'localhost')
        ? `${window.location.host}/ws`
        : `155.248.255.29:3000/ws`;

      const wsUrl = (isHttps ? 'wss://' : 'ws://') + wsHost;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.ws.send(JSON.stringify({
          type: 'join',
          room: this.room,
          userId: this.userId,
          name: this.userProfile.name,
          gender: this.userProfile.gender
        }));
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleIncomingMessage(data);
        } catch (e) {}
      };

      this.ws.onerror = () => {
        // Graceful fallback to HTTP polling
      };

      this.ws.onclose = () => {
        if (!this.isDestroyed) {
          setTimeout(() => this.connectWebSocket(), 4000);
        }
      };
    } catch (e) {
      console.warn('WS Init fallback active');
    }
  }

  handleIncomingMessage(data) {
    if (!data || data.userId === this.userId) return;

    if (data.type === 'move' || data.type === 'join') {
      this.peers.set(data.userId, {
        userId: data.userId,
        name: data.name || 'Visitor',
        gender: data.gender || 'female',
        x: data.x || 0,
        y: data.y || 0,
        z: data.z || 0,
        rotY: data.rotY || 0,
        isWalking: Boolean(data.isWalking),
        lastSeen: Date.now()
      });
      this.onPeerUpdate(new Map(this.peers));
    } else if (data.type === 'action') {
      this.onPeerAction(data);
    } else if (data.type === 'chat') {
      this.onPeerChat(data);
    } else if (data.type === 'leave') {
      this.peers.delete(data.userId);
      this.onPeerUpdate(new Map(this.peers));
    }
  }

  async pollHttpFallback() {
    if (this.isDestroyed || this.isPollingInProgress) return;
    this.isPollingInProgress = true;
    try {
      const actionsToSend = [...this.outboundActions];
      this.outboundActions = [];

      const res = await fetch('/api/museum/sync', {
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
        if (body.peers && Array.isArray(body.peers)) {
          body.peers.forEach(p => {
            if (p.userId !== this.userId) {
              this.peers.set(p.userId, {
                ...p,
                lastSeen: Date.now()
              });
            }
          });
          this.onPeerUpdate(new Map(this.peers));
        }

        if (body.latestActionId) {
          this.lastActionId = Math.max(this.lastActionId, body.latestActionId);
        }

        if (body.actions && Array.isArray(body.actions)) {
          body.actions.forEach(act => {
            const actKey = act._actionId || (act.userId + '_' + act.action + '_' + (act.timestamp || Date.now()));
            if (!this.seenActionIds.has(actKey)) {
              this.seenActionIds.add(actKey);
              if (this.seenActionIds.size > 200) {
                const first = this.seenActionIds.values().next().value;
                this.seenActionIds.delete(first);
              }
              this.handleIncomingMessage(act);
            }
          });
        }
      } else {
        if (actionsToSend.length > 0) {
          this.outboundActions = [...actionsToSend, ...this.outboundActions];
        }
      }
    } catch (e) {
      // Offline fallback silent
    } finally {
      this.isPollingInProgress = false;
    }
  }

  sendMove(x, y, z, rotY, isWalking) {
    this.currentState = {
      name: this.userProfile.name,
      gender: this.userProfile.gender,
      x, y, z, rotY, isWalking
    };

    const payload = {
      type: 'move',
      room: this.room,
      userId: this.userId,
      ...this.currentState
    };
    this.broadcast(payload);
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
    // Immediately trigger sync for real-time delivery
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

  broadcast(payload) {
    const str = JSON.stringify(payload);
    // BroadcastChannel
    if (this.bc) {
      try { this.bc.postMessage(payload); } catch (e) {}
    }
    // WebSocket
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try { this.ws.send(str); } catch (e) {}
    }
  }

  destroy() {
    this.isDestroyed = true;
    clearInterval(this.pollingInterval);
    if (this.bc) this.bc.close();
    if (this.ws) {
      this.broadcast({ type: 'leave', room: this.room, userId: this.userId });
      this.ws.close();
    }
    this.peers.clear();
  }
}
