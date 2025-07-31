export default {
  async fetch(request) {
    const sheetUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgETtNZnTKWUNmZtL_jjRCnK-N7QfdQ_4FeAQ3wXZxmbLQtwKiW4r4gZCK_8E8uUBpgbRYH58VPSpe05xbV3z8eektrxCuViaB11jKqHsw3S8Upa2z9TDzNG2adjjMU4H1k5zjoXTKU84U1Fq02XRG2irAeicWT7tIUH4hQWSeuat73T-h0wIDcEFJgTj6AlMI1KHbssgXXN8Ak6hUKzCF9Bu1D2dDWdSrzItEJiNrKOQAbbzmSGiJCNRlADs2MdxOFx_mKiU0ZX0t0i_StrHndXVJSXQ&lib=MW1YwIc4opn8BCLYsrzGzfgvQOQADXBUv";
    
    // Adiciona cache buster para garantir atualização
    const urlWithCacheBuster = sheetUrl + "&cacheBuster=" + Date.now();

    const url = new URL(request.url);
    const slug = url.pathname.slice(1).toLowerCase(); // Remove "/" inicial

    try {
      const response = await fetch(urlWithCacheBuster, { cf: { cacheTtl: 0, cacheEverything: false } });
      const data = await response.json();

      if (data.links && data.links[slug] && data.links[slug].affiliateLink) {
        return new Response(null, {
          status: 301,
          headers: {
            "Location": data.links[slug].affiliateLink,
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
            "Surrogate-Control": "no-store"
          }
        });
      } else {
        return new Response("404 Not Found - Link não existe", { status: 404 });
      }
    } catch (e) {
      return new Response("Error fetching redirects: " + e.message, { status: 500 });
    }
  }
};
