export default {
  async fetch(request) {
    const url = new URL(request.url);
    const slug = url.pathname.toLowerCase().replace(/^\/+/, ""); // remove barra inicial

    // URL pública do JSON com os redirects
    const redirectsUrl = 'https://youneedthistool.github.io/DataIngestion/redirects.json';

    let data;
    try {
      const response = await fetch(redirectsUrl, { cf: { cacheTtl: 300 } }); // cache 5 min
      data = await response.json();
    } catch (e) {
      return new Response("Failed to load redirects", { status: 500 });
    }

    const entry = data.links[slug];
    if (entry && entry.affiliateLink) {
      return Response.redirect(entry.affiliateLink, 301);
    }

    return new Response("Not found", { status: 404 });
  }
};
