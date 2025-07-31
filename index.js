const redirects = {
  "/charger-foldable": {"asin":"B0D78Q2KWR","trackingId":"tiktok01095-20"},
  "/mac-book-pro-charger-100w-usb-c-charger-fast-charger": {"asin":"B0D59LHFTS","trackingId":"ytshorts010c-20"},
  "/usb-c-to-usb-c-charging-cable-for-apple-2pack-10ft": {"asin":"B0BJQ93CS9","trackingId":"tiktok01095-20"},
  "/monitor-stand-riser-2-tier-computer-stand-desk-organizers-and-accessories": {"asin":"B0FCY4PRML","trackingId":"x2020-20"}
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
