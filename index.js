export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const slug = url.pathname.toLowerCase().replace(/^\/go\/|^\/+/, "");

    const redirectsUrl = 'https://youneedthistool.github.io/redirect-engine/redirects.json';

    let data;
    try {
      const response = await fetch(redirectsUrl, { cf: { cacheTtl: 300 } });
      data = await response.json();
    } catch (e) {
      return new Response("Failed to load redirects", { status: 500 });
    }

    const entry = data.links?.[slug];
    if (!entry || !entry.affiliateLink) {
      return new Response("Not found", { status: 404 });
    }

    const headers = request.headers;
    const userAgent = headers.get('User-Agent') || 'unknown';
    const referrer = headers.get('Referer') || 'direct';
    const language = headers.get('Accept-Language') || 'unknown';
    const ip = headers.get('CF-Connecting-IP') || 'unknown';
    const country = headers.get('CF-IPCountry') || 'unknown';
    const deviceType = /mobile/i.test(userAgent) ? 'mobile' : 'desktop';

    const logData = {
      slug,
      timestamp: new Date().toISOString(),
      productId: entry.asin || 'unknown',
      trackingId: entry.trackingId || 'unknown',
      platform: entry.platform || 'unknown',
      fullUrl: request.url,
      userAgent,
      referrer,
      language,
      ip,
      country,
      deviceType,
    };

    // Registra o clique no Firebase sem atrasar o redirect
    ctx.waitUntil(
      fetch('https://logclick-n6djtiedea-uc.a.run.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData),
      }).catch(err => console.error("Logging failed:", err))
    );

    return Response.redirect(entry.affiliateLink, 301);
  }
}
