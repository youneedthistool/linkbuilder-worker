const redirects = {
  "/oi": "https://www.amazon.com/dp/B0D1YD7R2C?tag=youtube0178d-20",
  "/ola-": "https://www.amazon.com/dp/B0D1YD7R2C?tag=insta0178d-205",
  "/oudri": "https://www.amazon.com/dp/B0D1YD7R2C?tag=insta0178d-201"
};

const fallbackSite = "https://youneedthistool-site.pages.dev";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const target = redirects[url.pathname];
    
    if (target) {
      return Response.redirect(target, 301);
    }
    
    // Redireciona para o seu site estático (Pages) se não achar slug no redirects
    // Recria a URL para buscar o recurso no seu site Pages
    const fallbackUrl = new URL(request.url);
    fallbackUrl.hostname = new URL(fallbackSite).hostname;
    
    // Cria uma nova requisição com a URL do site Pages
    const newRequest = new Request(fallbackUrl.toString(), request);
    
    return fetch(newRequest);
  },
};
