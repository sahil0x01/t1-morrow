import { createHealthServer } from "./server.js";

const port = Number(process.env.WORKER_HEALTH_PORT ?? "3001");
const server = createHealthServer();

server.listen(port, "0.0.0.0", () => {
  console.log(`morrow-worker health listening on ${port}`);
});

const shutdown = (signal: string): void => {
  console.log(`morrow-worker shutting down on ${signal}`);
  server.close(() => process.exit(0));
  server.closeIdleConnections();
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
