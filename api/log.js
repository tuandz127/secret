export default async function handler(req, res) {
  try {
    const data = req.body || {};

    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;

    if (!WEBHOOK_URL) {
      return res.status(500).json({ error: "Missing webhook" });
    }

    const msg = `
IP: ${data.ip || "unknown"}
Location: ${data.city || "?"}, ${data.country || "?"}
ISP: ${data.isp || "unknown"}
`;

    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: msg
      })
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "fail" });
  }
}
