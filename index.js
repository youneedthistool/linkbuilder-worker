const redirects = {
  "/oi": "https://www.amazon.com/dp/B0D1YD7R2C?tag=youtube0178d-20",
  "/ola-": "https://www.amazon.com/dp/B0D1YD7R2C?tag=insta0178d-205",
  "/oudri": "https://www.amazon.com/dp/B0D1YD7R2C?tag=insta0178d-201",
  "/nekteck-100w-usb-c-charger": "https://www.amazon.com/dp/B0D78Q2KWR?tag=ytshorts010c-20"
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const target = redirects[url.pathname];
    if (target) {
      return Response.redirect(target, 301);
    }
    // Se não achar o slug, redireciona para o seu site principal
    return Response.redirect('https://youneedthistool-site.pages.dev', 302);
  },
};
