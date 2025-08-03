export default {
  async fetch(request) {
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

    const entry = data.links[slug];
    if (entry && entry.affiliateLink) {
      try {
        await fetch('https://logclick-n6djtiedea-uc.a.run.app', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            platform: entry.platform || 'unknown',
            trackingId: entry.trackingId || 'none',
            productId: entry.asin || 'none',
            userAgent: request.headers.get('User-Agent') || 'unknown',
            referrer: request.headers.get('Referer') || 'unknown',
            language: request.headers.get('Accept-Language') || 'unknown',
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (e) {
        console.error('Tracking error:', e);
      }
      return Response.redirect(entry.affiliateLink, 301);
    }

    return new Response("Not found", { status: 404 });
  }
};
