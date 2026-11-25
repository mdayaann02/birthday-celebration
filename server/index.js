// server/index.js - Full-Stack Backend Server for Celebration Studio

import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup directories
const uploadsDir = path.join(rootDir, 'uploads');
const imagesDir = path.join(uploadsDir, 'images');
const audioDir = path.join(uploadsDir, 'audio');
const videosDir = path.join(uploadsDir, 'videos');
const dataDir = path.join(rootDir, 'data');
const dbFilePath = path.join(dataDir, 'sites.json');

[uploadsDir, imagesDir, audioDir, videosDir, dataDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, JSON.stringify({}, null, 2), 'utf-8');
}

// Database helper
function getSitesDB() {
  try {
    const raw = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveSitesDB(db) {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("DB Save error:", err);
    return false;
  }
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/') || file.originalname.match(/\.(mp3|wav|m4a|aac|ogg)$/i)) {
      cb(null, audioDir);
    } else if (file.mimetype.startsWith('video/') || file.originalname.match(/\.(mp4|webm|mov|mkv)$/i)) {
      cb(null, videosDir);
    } else {
      cb(null, imagesDir);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const unique = `${Date.now()}_${cleanBase}${ext}`;
    cb(null, unique);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB max for HD video / high quality music
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Files
app.use('/uploads', express.static(uploadsDir));

// API 0: YouTube Playlist & Track Metadata Scraper
app.get('/api/fetch-playlist', async (req, res) => {
  const rawUrl = req.query?.url || '';
  if (!rawUrl || typeof rawUrl !== 'string') {
    return res.status(400).json({ success: false, error: 'Missing url parameter' });
  }

  const cleanUrl = rawUrl.trim();
  let playlistId = null;
  let videoId = null;

  const listMatch = cleanUrl.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  if (listMatch) {
    playlistId = listMatch[1];
  } else if (/^(PL|RD|FL|UU|LL)[a-zA-Z0-9_-]+$/.test(cleanUrl)) {
    playlistId = cleanUrl;
  }

  const vMatch = cleanUrl.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  if (vMatch) {
    videoId = vMatch[1];
  }

  // 1. If playlistId is present, scrape YouTube playlist HTML
  if (playlistId) {
    try {
      const response = await fetch(`https://www.youtube.com/playlist?list=${playlistId}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      });

      if (response.ok) {
        const html = await response.text();
        const match = html.match(/var ytInitialData\s*=\s*({.+?});<\/script>/s) || html.match(/ytInitialData\s*=\s*({.+?});/);
        if (match) {
          const data = JSON.parse(match[1]);
          const playlistTitle = data.metadata?.playlistMetadataRenderer?.title ||
                                data.header?.playlistHeaderRenderer?.title?.simpleText ||
                                data.microformat?.microformatDataRenderer?.title ||
                                'Romantic YouTube Playlist';
          const tracks = [];

          function walk(node) {
            if (!node || typeof node !== 'object') return;
            if (node.lockupViewModel && node.lockupViewModel.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO') {
              const vm = node.lockupViewModel;
              const meta = vm.metadata?.lockupMetadataViewModel;
              const title = meta?.title?.content || vm.rendererContext?.accessibilityContext?.label || 'YouTube Track';
              const artist = meta?.metadata?.contentMetadataViewModel?.metadataRows?.[0]?.metadataParts?.[0]?.text?.content || 'YouTube Artist';
              const vId = vm.contentId;
              if (vId && !tracks.some(t => t.videoId === vId)) {
                tracks.push({
                  id: tracks.length + 1,
                  title: title.replace(/[\(\[](Official|Music Video|Video|Lyrics|Audio|HD|4K|Visualizer|Lyric Video)[\)\]]/gi, '').trim(),
                  artist,
                  src: `https://www.youtube.com/watch?v=${vId}`,
                  videoId: vId,
                  tag: `TRACK ${String(tracks.length + 1).padStart(2, '0')} 🌸`,
                  duration: '3:30'
                });
              }
            } else if (node.playlistVideoRenderer) {
              const p = node.playlistVideoRenderer;
              const title = p.title?.runs?.map(r => r.text).join('') || p.title?.simpleText || 'YouTube Track';
              const artist = p.shortBylineText?.runs?.map(r => r.text).join('') || 'YouTube Artist';
              const vId = p.videoId;
              if (vId && !tracks.some(t => t.videoId === vId)) {
                tracks.push({
                  id: tracks.length + 1,
                  title: title.replace(/[\(\[](Official|Music Video|Video|Lyrics|Audio|HD|4K|Visualizer|Lyric Video)[\)\]]/gi, '').trim(),
                  artist,
                  src: `https://www.youtube.com/watch?v=${vId}`,
                  videoId: vId,
                  tag: `TRACK ${String(tracks.length + 1).padStart(2, '0')} 🌸`,
                  duration: p.lengthText?.simpleText || '3:30'
                });
              }
            }
            for (const k of Object.keys(node)) {
              walk(node[k]);
            }
          }

          walk(data);

          if (tracks.length > 0) {
            return res.json({
              success: true,
              playlistTitle,
              tracks: tracks.slice(0, 50)
            });
          }
        }
      }
    } catch (err) {
      console.warn('Playlist scrape error:', err.message);
    }
  }

  // 2. Fallback to single video oEmbed
  if (videoId || cleanUrl) {
    try {
      const targetUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : cleanUrl;
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(targetUrl)}&format=json`);
      if (oembedRes.ok) {
        const oeData = await oembedRes.json();
        const title = (oeData.title || 'YouTube Song').replace(/[\(\[](Official|Music Video|Video|Lyrics|Audio|HD|4K|Visualizer|Lyric Video)[\)\]]/gi, '').trim();
        return res.json({
          success: true,
          playlistTitle: title,
          tracks: [
            {
              id: 1,
              title,
              artist: oeData.author_name || 'YouTube Artist',
              src: targetUrl,
              videoId: videoId || '',
              tag: 'OUR THEME 🌸',
              duration: '3:45'
            }
          ]
        });
      }
    } catch (err) {
      console.warn('oEmbed fetch error:', err.message);
    }
  }

  return res.status(404).json({
    success: false,
    error: 'Could not fetch YouTube songs from the provided URL'
  });
});

// API 1: File Upload Endpoint (Images, Music & MP4 Videos)
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const isAudio = req.file.mimetype.startsWith('audio/') || req.file.originalname.match(/\.(mp3|wav|m4a|aac|ogg)$/i);
  const isVideo = req.file.mimetype.startsWith('video/') || req.file.originalname.match(/\.(mp4|webm|mov|mkv)$/i);
  const relativePath = isAudio ? `/uploads/audio/${req.file.filename}` : (isVideo ? `/uploads/videos/${req.file.filename}` : `/uploads/images/${req.file.filename}`);

  return res.json({
    success: true,
    url: relativePath,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size
  });
});

// API 2: Save / Publish Website
app.post('/api/sites', (req, res) => {
  const { templateId, data, customSlug } = req.body;
  if (!templateId || !data) {
    return res.status(400).json({ error: "Missing templateId or data" });
  }

  let slug = customSlug ? customSlug.toLowerCase().replace(/[^a-z0-9_-]/g, '-') : '';
  if (!slug) {
    const baseName = (data.recipientName || 'special').toLowerCase().replace(/[^a-z0-9]/g, '');
    const rand = Math.random().toString(36).substring(2, 7);
    slug = `${baseName}-${rand}`;
  }

  const db = getSitesDB();
  db[slug] = {
    slug,
    templateId,
    data,
    createdAt: new Date().toISOString()
  };

  saveSitesDB(db);

  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const rawHost = req.get('host') || '';
  
  // Clean host: If running on Oracle VM IP 155.248.255.29, use clean port 80 (forwarded via iptables)
  // This guarantees WhatsApp recognizes it as a 100% clickable blue hyperlink with no port 3000 parsing issues.
  let cleanHost = rawHost;
  if (rawHost.includes('155.248.255.29')) {
    cleanHost = '155.248.255.29';
  } else {
    cleanHost = rawHost.replace(/:3000$/, '');
  }

  const fullUrl = `http://${cleanHost}/s/${slug}`;
  const directIpUrl = `http://155.248.255.29/s/${slug}`;
  const vercelUrl = `https://birthday-website-phi-one.vercel.app/s/${slug}`;

  return res.json({
    success: true,
    slug,
    path: `/s/${slug}`,
    fullUrl,
    directIpUrl,
    vercelUrl
  });
});

// API 3: Retrieve Site By Slug
app.get('/api/sites/:slug', (req, res) => {
  const slug = req.params.slug.toLowerCase();
  const db = getSitesDB();
  const site = db[slug];

  if (!site) {
    return res.status(404).json({ error: "Website not found" });
  }

  return res.json({ success: true, site });
});

// API 4: Save Default Published Celebration Site
const defaultSitePath = path.join(dataDir, 'default_site.json');
app.post('/api/default-site', (req, res) => {
  const { templateId, data } = req.body;
  if (!templateId || !data) {
    return res.status(400).json({ error: "Missing templateId or data" });
  }
  try {
    fs.writeFileSync(defaultSitePath, JSON.stringify({ templateId, data, updatedAt: new Date().toISOString() }, null, 2), 'utf-8');
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to save default site" });
  }
});

// API 5: Get Default Published Celebration Site
app.get(['/api/default-site', '/api/published'], (req, res) => {
  try {
    if (fs.existsSync(defaultSitePath)) {
      const site = JSON.parse(fs.readFileSync(defaultSitePath, 'utf-8'));
      return res.json({ success: true, site });
    }
    return res.json({ success: false, message: "No custom default site set yet" });
  } catch (err) {
    return res.status(500).json({ error: "Error reading default site" });
  }
});

// Route: View Short URL
app.get('/s/:slug', (req, res) => {
  const distIndex = path.join(rootDir, 'dist', 'index.html');
  if (fs.existsSync(distIndex)) {
    return res.sendFile(distIndex);
  }
  return res.redirect(`/#site=${req.params.slug}`);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// ============================================================================
// MUSEUM REAL-TIME MULTIPLAYER SYSTEM (WebSocket + HTTP Sync + Action Buffer)
// ============================================================================
const museumRooms = new Map(); // roomId -> Set of ws clients
const museumState = new Map(); // roomId -> Map(userId -> { user state, lastSeen })
const museumActions = new Map(); // roomId -> Array of { id, senderId, data, timestamp }
let nextActionId = 1;

function pushRoomAction(room, senderId, actionData) {
  if (!museumActions.has(room)) museumActions.set(room, []);
  const list = museumActions.get(room);
  const actionEntry = {
    id: nextActionId++,
    senderId,
    data: actionData,
    timestamp: Date.now()
  };
  list.push(actionEntry);

  // Keep only last 60 actions within 30s
  const cutoff = Date.now() - 30000;
  while (list.length > 60 || (list.length > 0 && list[0].timestamp < cutoff)) {
    list.shift();
  }

  // Also broadcast to WebSocket clients in the room
  const roomClients = museumRooms.get(room);
  if (roomClients) {
    const payloadStr = JSON.stringify(actionData);
    for (const client of roomClients) {
      if (client.readyState === 1 && client.userId !== senderId) {
        try { client.send(payloadStr); } catch (e) {}
      }
    }
  }
}

// HTTP sync endpoint (CORS enabled for cross-origin or proxy calls)
app.options('/api/museum/sync', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

app.post('/api/museum/sync', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { room = 'default', userId, state, action, actions, lastActionId = 0 } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  if (!museumState.has(room)) museumState.set(room, new Map());
  const rMap = museumState.get(room);

  if (state) {
    rMap.set(userId, { ...state, userId, lastSeen: Date.now() });
  }

  // Handle incoming actions from HTTP client
  const incomingActions = actions || (action ? [action] : []);
  for (const act of incomingActions) {
    pushRoomAction(room, userId, act);
  }

  // Purge peers inactive for > 6s
  const now = Date.now();
  for (const [uid, udata] of rMap.entries()) {
    if (now - udata.lastSeen > 6000) rMap.delete(uid);
  }

  const peers = [];
  for (const [uid, udata] of rMap.entries()) {
    if (uid !== userId) peers.push(udata);
  }

  // Collect new actions for this user
  const roomActionList = museumActions.get(room) || [];
  const pendingActions = roomActionList
    .filter(a => a.id > lastActionId && a.senderId !== userId)
    .map(a => ({ ...a.data, _actionId: a.id }));

  const maxId = roomActionList.length > 0 ? roomActionList[roomActionList.length - 1].id : lastActionId;

  return res.json({ success: true, peers, actions: pendingActions, latestActionId: maxId });
});

// Serve Vite Frontend
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

const server = http.createServer(app);

// Attach WebSocket Server
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  let userRoom = 'default';
  let userId = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'join') {
        userRoom = data.room || 'default';
        userId = data.userId;
        ws.userId = userId;
        ws.userRoom = userRoom;
        if (!museumRooms.has(userRoom)) museumRooms.set(userRoom, new Set());
        museumRooms.get(userRoom).add(ws);
        return;
      }

      if (data.type === 'action' || data.type === 'chat') {
        pushRoomAction(userRoom, userId, data);
      } else {
        // Broadcast move directly
        const roomClients = museumRooms.get(userRoom);
        if (roomClients) {
          for (const client of roomClients) {
            if (client !== ws && client.readyState === 1) { // 1 = OPEN
              client.send(message.toString());
            }
          }
        }
      }
    } catch (e) {
      console.warn('WS parse error:', e);
    }
  });

  ws.on('close', () => {
    if (userRoom && museumRooms.has(userRoom)) {
      museumRooms.get(userRoom).delete(ws);
      const roomClients = museumRooms.get(userRoom);
      if (roomClients) {
        const leaveMsg = JSON.stringify({ type: 'leave', userId });
        for (const client of roomClients) {
          if (client.readyState === 1) client.send(leaveMsg);
        }
      }
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Celebration Studio Server & WebSocket running at http://0.0.0.0:${PORT}`);
});
