export default {
  async fetch(request) {
    // URL pública do seu JSON
    const sheetUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiM-V2rm934fIq6j1GKwtqi6AdcwQJtjpQ0x0TxPlHaBDYOHeQ13BL3lTgY5UbVnsdS4F10ItKqiW75tQiwkcRZNUsN2LWE-qMoHUVrbJNwlO0_Z-db17pIl9su3MYtEexBGlQFZixs5amli0woH_rNTlGU0gbKrlILaOpRifuHWqoclwBAq_3Cgt2kGIEvaREB8RZzWzGyN7l73aUYwwYJLhB5eas21D6PJ8-0s8C-KZJqfAO4COCcuBUIiBO1fJkVW-XEduhduPfZO_bVsbfRsh5OVQ&lib=MW1YwIc4opn8BCLYsrzGzfgvQOQADXBUv";

    const url = new URL(request.url);
    const slug = url.pathname.toLowerCase(); // exemplo: "/b0d78q2kwr-tiktok01095-20"
    const fullKey = `https://www.youneedthistool.com${slug}`; // chave completa no JSON

    try {
      const response = await fetch(sheetUrl);
      const redirects = await response.json();

      if (redirects[fullKey]) {
        return Response.redirect(redirects[fullKey], 301);
      } else {
        return new Response("Not found", { status: 404 });
      }
    } catch (e) {
      return new Response("Error fetching redirects: " + e.message, { status: 500 });
    }
  }
};
