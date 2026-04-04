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

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    });

    const data = await response.text();

    const baseUrl = new URL(targetUrl).origin;
    const rewrittenHtml = data
      .replace(/href="\//g, `href="/api/proxy?url=${baseUrl}/`)
      .replace(/src="\//g, `src="/api/proxy?url=${baseUrl}/`);

    res.status(response.status).send(rewrittenHtml);

  } catch (err) {
    res.status(500).json({ error: 'Proxy error', detail: err.message });
  }
}