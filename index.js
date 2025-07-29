export default {
  async fetch(request, env, ctx) {
    const sheetApi = "https://script.google.com/macros/s/AKfycbzZfa08RcxuZFqMgmzIH-s3HPiI4499S7Qi7-Vs5S4hNWFTPOqx1UkBrJ2-fOuBHTs/exec";
    
    try {
      const res = await fetch(sheetApi);
      const redirects = await res.json();

      const url = new URL(request.url);
      const path = url.pathname;

      if (redirects[path]) {
        return Response.redirect(redirects[path], 301);
      } else {
        return new Response("Not found", { status: 404 });
      }

    } catch (e) {
      return new Response("Erro ao buscar redirecionamentos.", { status: 500 });
    }
  }
};
