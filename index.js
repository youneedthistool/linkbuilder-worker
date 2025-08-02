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
      // Aqui enviamos o POST para o Firebase pra registrar o clique, sem esperar resposta
      fetch('https://us-central1-amazonaffiliatedata.cloudfunctions.net/logClick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: entry.platform || 'unknown',
          trackingId: entry.trackingId || 'none',
          productId: entry.productId || 'none',
          // você pode enviar mais dados aqui, como timestamp, etc
        }),
        keepalive: true  // importante para não abortar a requisição
      }).catch(() => {
        // Erro no tracking, mas não bloqueia o redirecionamento
      });

      return Response.redirect(entry.affiliateLink, 301);
    }

    return new Response("Not found", { status: 404 });
  }
};
