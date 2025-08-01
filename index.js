export default {
  async fetch(request) {
    const url = new URL(request.url);
    const slug = url.pathname.toLowerCase();

    // URL do seu JSON hospedado no GitHub Pages
    const redirectsUrl = 'https://youneedthistool.github.io/DataIngestion/redirects.json';

    let redirects;
    try {
      const response = await fetch(redirectsUrl, { cf: { cacheTtl: 300 } }); // cache por 5 min
      redirects = await response.json();
    } catch (e) {
      return new Response("Failed to load redirects", { status: 500 });
    }

    const entry = redirects[slug];
    if (entry) {
      const targetUrl = `https://www.amazon.com/dp/${entry.asin}?tag=${entry.trackingId}`;
      return Response.redirect(targetUrl, 301);
    }

    return new Response("Not found", { status: 404 });
  }
};
