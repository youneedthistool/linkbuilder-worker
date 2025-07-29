const redirects = {
  "/basics-mesh-pen-holder-and-organizer-black-tiktok": {"asin":"B08VP72ZNS","trackingId":"https://www.amazon.com/Amazon-Basics-Mesh-Pen-Holder/dp/B08VP72ZNS?pd_rd_i=B08VP72ZNS&pd_rd_w=gwG7h&content-id=amzn1.sym.57b80066-10e8-4be7-a5f2-ce3f1faa4959&pf_rd_p=57b80066-10e8-4be7-a5f2-ce3f1faa4959&pf_rd_r=4EPPKJA0RRJF57TECT09&pd_rd_wg=JhqMl&pd_rd_r=242f43b0-784c-4de2-94c7-0ba885110376&th=1&linkCode=ll1&tag=tiktok01095-20&linkId=42f6023efe17c0f859ffbd7de25513e4&language=en_US&ref_=as_li_ss_tl"},
  "/jean-lucka-instagram": {"asin":"B08VP72ZNS","trackingId":"https://www.amazon.com/dp/B08VP72ZNS?th=1&linkCode=ll1&tag=instareels0103-20&linkId=91857a7c6fd97a2ce9f34ab4723e8c66&language=en_US&ref_=as_li_ss_tl"},
  "/nekteck-100w-usb-c-charger-compact-and-foldable-fast-charging-gan-iv-charger-with-6-6-ft-cable-yt-shorts": {"asin":"B0D78Q2KWR","trackingId":"https://www.amazon.com/dp/B0D78Q2KWR?th=1&linkCode=ll1&tag=ytshorts010c-20&linkId=02e39197e0d6e5c213c251a046825761&language=en_US&ref_=as_li_ss_tl"}
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
