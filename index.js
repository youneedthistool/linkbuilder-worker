const redirects = {
  "/oi": "https://www.amazon.com/dp/B0D1YD7R2C?tag=insta-20"
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
