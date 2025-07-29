const redirects = {
  "/alitte-steno-pads-spiral-6x9-12-pack-assorted-bright-colors-youtube": {"asin":"B074ZQXDWS","trackingId":"ytshorts010c-20"}
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const slug = url.pathname.toLowerCase();
    const entry = redirects[slug];

    if (entry) {
      const targetUrl = `https://www.amazon.com/dp/${entry.asin}?tag=${entry.trackingId}`;
      return Response.redirect(targetUrl, 301);
    }

    return new Response("Not found", { status: 404 });
  }
};
