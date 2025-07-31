export default {
  async fetch(request) {
    const url = new URL(request.url);
    const slug = url.pathname.slice(1).toLowerCase();

    console.log("Slug recebido:", slug);  // <--- aqui

    try {
      const response = await fetch(sheetUrl);
      const data = await response.json();

      console.log("JSON recebido:", data);  // <--- aqui

      if (data.links && data.links[slug] && data.links[slug].affiliateLink) {
        console.log("Redirecionando para:", data.links[slug].affiliateLink);  // <--- aqui
        return Response.redirect(data.links[slug].affiliateLink, 301);
      } else {
        console.log("Slug não encontrado");  // <--- aqui
        return new Response("404 Not Found - Link não existe", { status: 404 });
      }
    } catch (e) {
      console.log("Erro ao buscar redirects:", e.message);  // <--- aqui
      return new Response("Error fetching redirects: " + e.message, { status: 500 });
    }
  }
};
