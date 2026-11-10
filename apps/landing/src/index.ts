interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

const MAX_BODY_BYTES = 16_384;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy":
    "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...SECURITY_HEADERS,
    },
  });
}

async function readSubscribeBody(
  request: Request,
): Promise<{ email: string; website: string } | null> {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? "0");

  if (contentLength > MAX_BODY_BYTES) return null;

  if (contentType.includes("application/json")) {
    try {
      const body = (await request.json()) as { email?: unknown; website?: unknown };
      return {
        email: typeof body.email === "string" ? body.email : "",
        website: typeof body.website === "string" ? body.website : "",
      };
    } catch {
      return null;
    }
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    try {
      const body = await request.formData();
      return {
        email: String(body.get("email") ?? ""),
        website: String(body.get("website") ?? ""),
      };
    } catch {
      return null;
    }
  }

  return null;
}

async function subscribe(request: Request, env: Env): Promise<Response> {
  const body = await readSubscribeBody(request);
  if (!body) return json({ ok: false, error: "invalid_request" }, 400);

  // Honeypot: accept silently so bots do not learn the field is ignored.
  if (body.website.trim() !== "") return json({ ok: true });

  const email = body.email.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  try {
    await env.DB.prepare(
      "INSERT INTO subscribers (email, source) VALUES (?, ?) ON CONFLICT(email) DO NOTHING",
    )
      .bind(email, "landing")
      .run();
  } catch (error) {
    console.error("subscribe failed", error);
    return json({ ok: false, error: "storage_error" }, 500);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return json({ ok: true });

  return Response.redirect(new URL("/thanks", request.url).toString(), 303);
}

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return json({ ok: true });
    }

    if (url.pathname === "/api/subscribe") {
      if (request.method !== "POST") {
        return json({ ok: false, error: "method_not_allowed" }, 405);
      }
      return subscribe(request, env);
    }

    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
};
