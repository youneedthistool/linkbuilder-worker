
const redirects = {
  "/mesh-pen-holder-and-organizer-black": "https://www.amazon.com/Amazon-Basics-Mesh-Pen-Holder/dp/B08VP72ZNS?pd_rd_i=B08VP72ZNS&pd_rd_w=gwG7h&content-id=amzn1.sym.57b80066-10e8-4be7-a5f2-ce3f1faa4959&pf_rd_p=57b80066-10e8-4be7-a5f2-ce3f1faa4959&pf_rd_r=4EPPKJA0RRJF57TECT09&pd_rd_wg=JhqMl&pd_rd_r=242f43b0-784c-4de2-94c7-0ba885110376&th=1&linkCode=ll1&tag=youtube0178d-20&linkId=5dec63b4242126d8b01c48f00f889114&language=en_US&ref_=as_li_ss_tl",
  "/basics-collapsible-fabric-storage-cubes": "https://www.amazon.com/hz/mobile/mission?p=JJN142eYw2ZVtLjcU2lx7I6XDRWCJfyxmXugcjqhQBrb4hLH%2FrHlg5HRyAbRo1vlmbBD6hZLwGN5kgWfkYMDKsOWv9E9M1ZAh393tDZA1h%2FiHPpbCW26lpjzuBVTtI85K5dXQubVoIzVIR0ArRfCQJ1StwSLW2PkM8LXBU%2FaIDQP%2FW5cOsR51Ok%2Bz3xof1Mof4nDW8TvJlitl%2FhT9bWD5VMQz5rE7rnP3YxOZbFUNWEZOCFkmk1F73TYvRcvCbj0dDsyV6a%2BkZWEUJdC4twyZTNaIWfagc%2B1DktYhwyFoRmaWUTJ6v7%2FmlsosK5DZbNCCZ5myXCa2ywAF90LcFYySMbIOdp2jEBq0GNPQ8nNvEdCUdeOwjHj01Z%2F7vhforZCQFlW4xj3rkfESieDhWkAJaWMzJKCOrrKYxKX69o6uPAQo1mJ8ZYUhgOLax%2F7jESO9iFtGeVELxzCYKii4b%2BuUGeMs41lXcwOEpshu6wVfP%2B%2BNXi2aK1A1%2Fpv%2BSQSI5WXfequSs6xE%2FvYya%2FOL45feg%3D%3D&pf_rd_r=JR3QM1VH5NZWTXV745TC&pf_rd_p=06fb772c-2fbd-49f2-83a2-fe8dac05f2d2&pd_rd_r=16ae66d9-d630-445a-828d-d406b33cf955&pd_rd_w=C8egR&pd_rd_wg=2CP00&linkCode=ll2&tag=tiktok01095-20&linkId=c0344c5e6ebb8a9f5f9c8427292c6deb&language=en_US&ref_=as_li_ss_tl"
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
