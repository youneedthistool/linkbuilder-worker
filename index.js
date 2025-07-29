const redirects = {
  "/basics-mesh-pen-holder-and-organizer-black-tiktok": {
    asin: "B08VP72ZNS",
    trackingId: "tiktok01095-20"
  }
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const slug = url.pathname.toLowerCase();
    const entry = redirects[slug];

    if (!entry) {
      return new Response("Not found", { status: 404 });
    }

    const targetUrl = `https://www.amazon.com/dp/${entry.asin}?tag=${entry.trackingId}`;

    // Envia o log assincronamente, sem bloquear o redirect
    ctx.waitUntil(
      fetch("https://script.google.com/macros/s/AKfycbxVg14LQT6hUKwE5uIuB2fUbY9KGwHK9h9z_QxasWrpiuxjAXSuedKaA65OkH7xpWuzjQ/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slug.replace(/^\//, ""),
          asin: entry.asin,
          trackingId: entry.trackingId,
          timestamp: new Date().toISOString(),
          referrer: request.headers.get("Referer") || "",
          userAgent: request.headers.get("User-Agent") || ""
        })
      }).catch(() => {
        // Ignora erros para não impactar o usuário
      })
    );

    // Redireciona imediatamente para a URL da Amazon
    return Response.redirect(targetUrl, 302);
  }
};
