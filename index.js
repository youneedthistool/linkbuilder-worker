const redirects = {
  "/nekteck-100w-usb-c-charger-compact-and-foldable-fast-charging-tiktok": {"asin":"B0D78Q2KWR","trackingId":"tiktok01095-20"}
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
