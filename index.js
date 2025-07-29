const redirects = {
  "/nekteck-100w-usb-c-charger-compact-and-foldable-fast-charging-youtube": {"asin":"B0D78Q2KWR","trackingId":"youtube0178d-20"},
  "/nekteck-100w-usb-c-charger-compact-and-foldable-fast-charging-yt-shorts": {"asin":"B0D78Q2KWR","trackingId":"ytshorts010c-20"}
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
