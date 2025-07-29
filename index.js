const redirects = {
  "/basics-mesh-pen-holder-and-organizer-black-tiktok": {
    asin: "B08VP72ZNS",
    trackingId: "tiktok01095-20"
  }
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const slug = url.pathname.toLowerCase();
    const entry = redirects[slug];

    if (entry) {
      const targetUrl = `https://www.amazon.com/dp/${entry.asin}?tag=${entry.trackingId}`;
      let logStatus = "";

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbyBbAWVDPc0jfULsPBV5PhKjU89TGa2AW6vTmSYOWxpmoW9NEwEEyEzH-XtPzTYLAY/exec", {
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
        });
        logStatus = `Log sent, status: ${response.status}`;
      } catch (e) {
        logStatus = `Log error: ${e.message}`;
      }

      // Resposta personalizada para DEBUG — remove depois
      return new Response(`Redirecting to Amazon... ${logStatus}`, {
        status: 302,
        headers: {
          Location: targetUrl,
          "Content-Type": "text/plain"
        }
      });
    }

    return new Response("Not found", { status: 404 });
  }
};
