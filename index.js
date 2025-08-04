// worker.js (index.js)

function base64urlEncode(str) {
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function encodeUTF8(str) {
  return new TextEncoder().encode(str);
}

async function signJwt(payload, privateKeyPem) {
  const pem = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "")
    .replace(/\\n/g, "");

  const binaryDer = Uint8Array.from(atob(pem), c => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const header = {
    alg: "RS256",
    typ: "JWT"
  };

  const encodedHeader = base64urlEncode(JSON.stringify(header));
  const encodedPayload = base64urlEncode(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    encodeUTF8(data)
  );

  const signatureBase64Url = base64urlEncode(
    String.fromCharCode(...new Uint8Array(signature))
  );

  return `${data}.${signatureBase64Url}`;
}

async function getAccessToken(env) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  const payload = {
    iss: env.FIREBASE_CLIENT_EMAIL,
    sub: env.FIREBASE_CLIENT_EMAIL,
    aud: "https://oauth2.googleapis.com/token",
    iat,
    exp,
    scope: "https://www.googleapis.com/auth/datastore"
  };

  const jwt = await signJwt(payload, env.FIREBASE_PRIVATE_KEY);

  const params = new URLSearchParams();
  params.set("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer");
  params.set("assertion", jwt);

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await response.json();
  if (!data.access_token) {
    console.error("Failed to get access token:", data);
    throw new Error("Failed to get access token");
  }

  console.log("Access token obtained");
  return data.access_token;
}

async function saveLogToFirestore(logData, env) {
  try {
    const accessToken = await getAccessToken(env);
    console.log("Got access token");

    const url = `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/clicks-db`;

    const body = { fields: {} };

    for (const [key, value] of Object.entries(logData)) {
      if (key === "timestamp") {
        body.fields[key] = { timestampValue: value };
      } else {
        body.fields[key] = { stringValue: String(value) };
      }
    }

    console.log("Sending log to Firestore:", JSON.stringify(body));

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Firestore save failed:", res.status, text);
    } else {
      console.log("Log saved successfully");
    }
  } catch (e) {
    console.error("Error saving log to Firestore:", e);
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const slug = url.pathname.toLowerCase().replace(/^\/go\/|^\/+/, "");

    const redirectsUrl = 'https://youneedthistool.github.io/redirect-engine/redirects.json';

    let data;
    try {
      const response = await fetch(redirectsUrl, { cf: { cacheTtl: 300 } });
      data = await response.json();
      console.log("Redirects loaded");
    } catch (e) {
      console.error("Failed to load redirects:", e);
      return new Response("Failed to load redirects", { status: 500 });
    }

    const entry = data.links?.[slug];
    if (!entry || !entry.affiliateLink) {
      console.log("Slug not found:", slug);
      return new Response("Not found", { status: 404 });
    }

    const headers = request.headers;
    const userAgent = headers.get('User-Agent') || 'unknown';
    const referrer = headers.get('Referer') || 'direct';
    const language = headers.get('Accept-Language') || 'unknown';
    const ip = headers.get('CF-Connecting-IP') || 'unknown';
    const country = headers.get('CF-IPCountry') || 'unknown';
    const deviceType = /mobile/i.test(userAgent) ? 'mobile' : 'desktop';

    const logData = {
      slug,
      timestamp: new Date().toISOString(),
      productId: entry.asin || 'unknown',
      trackingId: entry.trackingId || 'unknown',
      platform: entry.platform || 'unknown',
      fullUrl: request.url,
      userAgent,
      referrer,
      language,
      ip,
      country,
      deviceType,
    };

    console.log("Log data prepared", logData);

    ctx.waitUntil(saveLogToFirestore(logData, env));

    return Response.redirect(entry.affiliateLink, 301);
  }
};
