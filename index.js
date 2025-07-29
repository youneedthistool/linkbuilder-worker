
const redirects = {
  "/amazon-basics-mesh-pen-holder-and-organizer,-black,": "https://www.amazon.com/dp/B08VP72ZNS?tag=youtube0178d-20"
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
