export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing ?url= parameter' });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if (parsedUrl.protocol !== 'https:') {
    return res.status(403).json({ error: 'Only HTTPS allowed' });
  }

  const blockedPatterns = ['localhost', '127.', '192.168.', '0.0.0.0'];
  if (blockedPatterns.some(p => parsedUrl.hostname.includes(p))) {
    return res.status(403).json({ error: 'Internal addresses not allowed' });
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', detail: err.message });
  }
}