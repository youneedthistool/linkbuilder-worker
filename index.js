const redirects = {
  "/charger-foldable-tiktok01095-20": {"asin":"B0D78Q2KWR","trackingId":"tiktok01095-20"},
  "/mac-book-pro-charger-100w-usb-c-charger-fast-charger-ytshorts010c-20": {"asin":"B0D59LHFTS","trackingId":"ytshorts010c-20"},
  "/usb-c-to-usb-c-charging-cable-for-apple-2pack-10ft-tiktok01095-20": {"asin":"B0BJQ93CS9","trackingId":"tiktok01095-20"}
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const slug = url.pathname.slice(1).toLowerCase(); // tira a barra inicial
    const entry = redirects["/" + slug]; // busca com a barra

    if (entry) {
      const targetUrl = `https://www.amazon.com/dp/${entry.asin}?tag=${entry.trackingId}`;
      return Response.redirect(targetUrl, 301);
    }

    return new Response("Not found", { status: 404 });
  }
};
