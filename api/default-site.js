// api/default-site.js - Vercel Serverless Function to proxy default published site to Oracle VM
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const options = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal
    };

    if (req.method === 'POST') {
      options.body = JSON.stringify(req.body);
    }

    const upstreamRes = await fetch('http://155.248.255.29:3000/api/default-site', options);
    clearTimeout(timeout);

    const data = await upstreamRes.json();
    return res.status(upstreamRes.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: "Could not reach backend database", details: err.message });
  }
}
