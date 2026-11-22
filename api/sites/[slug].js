// api/sites/[slug].js - Vercel Serverless Function to fetch site from Oracle VM
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { slug } = req.query;
  if (!slug) {
    return res.status(400).json({ error: "Missing slug" });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const upstreamRes = await fetch(`http://155.248.255.29:3000/api/sites/${encodeURIComponent(slug)}`, {
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (upstreamRes.ok) {
      const data = await upstreamRes.json();
      return res.status(200).json(data);
    }
    return res.status(404).json({ error: "Website not found on upstream database" });
  } catch (err) {
    return res.status(502).json({ error: "Could not reach database server", details: err.message });
  }
}
