const redirects = {
  "/basics-mesh-pen-holder-and-organizer-black-tiktok": {"asin":"B08VP72ZNS","trackingId":"TikTok"},
  "/jean-lucka-instagram": {"asin":"B08VP72ZNS","trackingId":"Instagram"},
  "/nekteck-100w-usb-c-charger-compact-and-foldable-fast-charging-gan-iv-charger-with-6-6-ft-cable-yt-shorts": {"asin":"B0D78Q2KWR","trackingId":"YT-Shorts"}
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
