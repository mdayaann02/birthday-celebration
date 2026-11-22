// server/index.js - Full-Stack Backend Server for Celebration Studio

import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup directories
const uploadsDir = path.join(rootDir, 'uploads');
const imagesDir = path.join(uploadsDir, 'images');
const audioDir = path.join(uploadsDir, 'audio');
const dataDir = path.join(rootDir, 'data');
const dbFilePath = path.join(dataDir, 'sites.json');

[uploadsDir, imagesDir, audioDir, dataDir].forEach(dir => {
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
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB max for high quality music/photos
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Files
app.use('/uploads', express.static(uploadsDir));

// API 1: File Upload Endpoint (Images & Music)
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const isAudio = req.file.mimetype.startsWith('audio/') || req.file.originalname.match(/\.(mp3|wav|m4a|aac|ogg)$/i);
  const relativePath = isAudio ? `/uploads/audio/${req.file.filename}` : `/uploads/images/${req.file.filename}`;

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
  
  // Clean host: If running on Oracle VM IP 155.248.255.29, use domain 155-248-255-29.sslip.io (port 80)
  // This guarantees WhatsApp recognizes it as a 100% clickable blue hyperlink with no port 3000 parsing issues.
  let cleanHost = rawHost;
  if (rawHost.includes('155.248.255.29')) {
    cleanHost = '155-248-255-29.sslip.io';
  } else {
    // Strip default port if port 80 is used
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

// Serve Vite Frontend
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Celebration Studio Server running at http://0.0.0.0:${PORT}`);
});
