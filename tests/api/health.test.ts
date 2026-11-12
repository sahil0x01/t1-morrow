import assert from "node:assert/strict";
import { test } from "node:test";

import { createApp } from "../../apps/api/src/app.js";

test("api liveness", async () => {
  const response = await createApp().request("/health/live");

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("api readiness", async () => {
  const response = await createApp().request("/health/ready");

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ready: true });
});

test("api not found", async () => {
  const response = await createApp().request("/missing");

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "not_found" });
});
