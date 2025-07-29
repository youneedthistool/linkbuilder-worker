
const redirects = {
  "/mesh-pen-holder-and-organizer-black": "https://youneedthistool.com/mesh-pen-holder-and-organizer-black"
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
