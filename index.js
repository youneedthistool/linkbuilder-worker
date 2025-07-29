const redirects = {
  "/nekteck-100w-usb-c-charger-compact-and-foldable-fast-charging-gan-iv-charger-with-6-6-ft-cable-compatible-with-macbook-air-pro-ipad-pro-and-all-usbc-devices-black-tiktok": {
    asin: "B0D78Q2KWR",
    trackingId: "tiktok01095-20"
  },
  "/100w-universal-usb-c-power-adapter-fast-charger-x": {
    asin: "B0BY8VJ4MS",
    trackingId: "x2020-20"
  }
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
