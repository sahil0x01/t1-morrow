import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import { test } from "node:test";

import { createHealthServer } from "../../apps/worker/src/server.js";

test("worker health server", async () => {
  const server = createHealthServer();
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));

  const address = server.address() as AddressInfo;
  const base = `http://127.0.0.1:${address.port}`;

  try {
    const live = await fetch(`${base}/health/live`);
    const ready = await fetch(`${base}/health/ready`);
    const missing = await fetch(`${base}/missing`);

    assert.equal(live.status, 200);
    assert.deepEqual(await live.json(), { status: "ok" });
    assert.equal(ready.status, 200);
    assert.deepEqual(await ready.json(), { ready: true });
    assert.equal(missing.status, 404);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
