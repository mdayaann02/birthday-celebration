// api/upload-chunk.js - Vercel Serverless Function to proxy chunked uploads to Oracle VM
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const upstreamRes = await fetch('http://155.248.255.29:3000/api/upload-chunk', {
      method: 'POST',
      headers: {
        'content-type': req.headers['content-type'] || '',
        ...(req.headers['content-length'] ? { 'content-length': req.headers['content-length'] } : {})
      },
      body: req,
      duplex: 'half'
    });

    const data = await upstreamRes.json();
    return res.status(upstreamRes.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: "Failed to forward chunk to backend server", details: err.message });
  }
}
