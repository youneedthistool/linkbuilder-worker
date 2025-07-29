
const redirects = {
  "/oi": "#REF!",
  "/nekteck-100w-usb-c-charger": "https://www.amazon.com/dp/B0D78Q2KWR?tag=x2020-20"
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
