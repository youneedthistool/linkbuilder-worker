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
      let logMessage = "";

      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxVg14LQT6hUKwE5uIuB2fUbY9KGwHK9h9z_QxasWrpiuxjAXSuedKaA65OkH7xpWuzjQ/exec", {
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
        logMessage = `Log sent, status: ${response.status}`;
      } catch (e) {
        logMessage = `Log error: ${e.message}`;
      }

      return new Response(`Redirecting to Amazon...\n${logMessage}`, {
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
