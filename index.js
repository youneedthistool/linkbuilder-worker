const redirects = {
  "/basics-mesh-pen-holder-and-organizer-black-tiktok": {
    "asin": "B08VP72ZNS",
    "trackingId": "tiktok01095-20"
  }
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const slug = url.pathname.toLowerCase();
    const entry = redirects[slug];

    if (entry) {
      const targetUrl = `https://www.amazon.com/dp/${entry.asin}?tag=${entry.trackingId}`;

      // 🔁 Enviar log de clique para ClickLogs (via Apps Script)
      fetch("https://script.google.com/macros/s/AKfycbyBbAWVDPc0jfULsPBV5PhKjU89TGa2AW6vTmSYOWxpmoW9NEwEEyEzH-XtPzTYLAY/exec", {
        method: "POST",
        body: JSON.stringify({
          slug: slug.replace(/^\//, ""),
          asin: entry.asin,
          trackingId: entry.trackingId,
          timestamp: new Date().toISOString(),
          referrer: request.headers.get("Referer"),
          userAgent: request.headers.get("User-Agent")
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).catch(() => {}); // Ignora erros silenciosamente

      return Response.redirect(targetUrl, 301);
    }

    return new Response("Not found", { status: 404 });
  }
};
