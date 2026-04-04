export default async function handler(req, res) {
  try {
    const data = req.body;

    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;

    const msg = `
IP: ${data.ip}
Location: ${data.city}, ${data.country}
ISP: ${data.isp}
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

