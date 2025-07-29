
const redirects = {
  "/mesh-pen-holder-and-organizer-black": "https://www.amazon.com/Amazon-Basics-Mesh-Pen-Holder/dp/B08VP72ZNS?pd_rd_i=B08VP72ZNS&pd_rd_w=gwG7h&content-id=amzn1.sym.57b80066-10e8-4be7-a5f2-ce3f1faa4959&pf_rd_p=57b80066-10e8-4be7-a5f2-ce3f1faa4959&pf_rd_r=4EPPKJA0RRJF57TECT09&pd_rd_wg=JhqMl&pd_rd_r=242f43b0-784c-4de2-94c7-0ba885110376&th=1&linkCode=ll1&tag=youtube0178d-20&linkId=5dec63b4242126d8b01c48f00f889114&language=en_US&ref_=as_li_ss_tl",
  "/collapsible-fabric-storage-cubes-organizer-with-handles": "https://www.amazon.com/Amazon-Basics-Collapsible-Storage-Organizer/dp/B071225BBS/ref=pd_ci_mcx_mh_mcx_views_0_title?pd_rd_w=3tCuA&content-id=amzn1.sym.15aac070-d8be-4c31-b9b5-dbe49c8bb011%3Aamzn1.symc.1065d246-0415-4243-928d-c7025bdd9a27&pf_rd_p=15aac070-d8be-4c31-b9b5-dbe49c8bb011&pf_rd_r=XJ1BT9FTN4XK127K4XHN&pd_rd_wg=AQMDR&pd_rd_r=a050f5bc-fb32-4c75-a926-cb745c4d1a8a&pd_rd_i=B071225BBS&th=1"
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const target = redirects[url.pathname];
    if (target) {
      return Response.redirect(target, 301);
    }
    return new Response("Not found", { status: 404 });
  },
};
