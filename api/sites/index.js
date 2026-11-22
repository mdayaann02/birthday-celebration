// api/sites/index.js - Vercel Serverless Function to publish website to Oracle VM
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const upstreamRes = await fetch('http://155.248.255.29:3000/api/sites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (upstreamRes.ok) {
      const data = await upstreamRes.json();
      return res.status(200).json(data);
    }
    return res.status(500).json({ error: "Failed to publish on backend server" });
  } catch (err) {
    return res.status(502).json({ error: "Backend database unreachable", details: err.message });
  }
}
