// api/health.js - Interconnection health check (Vercel Frontend <-> Oracle VM Backend)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const startTime = Date.now();
  let oracleStatus = "unreachable";
  let oracleData = null;
  let latencyMs = 0;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const upstreamRes = await fetch('http://155.248.255.29:3000/api/health', {
      signal: controller.signal
    });
    clearTimeout(timeout);

    latencyMs = Date.now() - startTime;
    if (upstreamRes.ok) {
      oracleStatus = "connected";
      oracleData = await upstreamRes.json();
    }
  } catch (err) {
    oracleStatus = "error";
    oracleData = { message: err.message };
  }

  return res.status(oracleStatus === "connected" ? 200 : 502).json({
    ok: oracleStatus === "connected",
    architecture: {
      frontend: "Vercel Edge Network (celebration-studio-02.vercel.app)",
      backend: "Oracle Cloud VM Server (155.248.255.29:3000)",
      storage: "Oracle Cloud Persistent Disk (/data/sites.json & /uploads)",
      repository: "GitHub (mdayaann02/celebration-studio)"
    },
    interconnection: {
      status: oracleStatus,
      latencyMs,
      oracleTimestamp: oracleData?.timestamp || null
    },
    timestamp: new Date().toISOString()
  });
}
