const redirects = {
  "/": "https://youneedthistool.com", // ajuste aqui para a URL da sua landing page
  "/mesh-pen-holder-and-organizer-black": "https://youneedthistool.com/mesh-pen-holder-and-organizer-black-youtube"
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
