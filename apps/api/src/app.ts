import { Hono } from "hono";

export function createApp(): Hono {
  const app = new Hono();

  app.get("/health/live", (c) => c.json({ status: "ok" }));

  app.get("/health/ready", (c) => c.json({ ready: true }));

  app.notFound((c) => c.json({ error: "not_found" }, 404));

  return app;
}
