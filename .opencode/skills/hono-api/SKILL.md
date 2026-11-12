---
name: hono-api
description: Use for Hono routes, middleware, Zod validation, Problem Details errors, request IDs, security headers, body limits, SSE, auth, rate limits, and API tests.
---

# Hono API

## Structure

- Build the app in a factory so tests can call `app.request()` without a port.
- Keep the process entrypoint separate from the app.
- Keep business logic out of route handlers. Call a service.
- Keep the API and worker as separate processes.

## Validation

- Validate params, query, and body with Zod at the boundary.
- Reject unknown fields when the schema is strict.
- Enforce body size limits.
- Treat every client value as untrusted, including workspace IDs.

## Errors

- Use Problem Details: `{ type, title, status, detail, code, requestId }`.
- Use stable codes such as `not_found`, `forbidden`, `validation_failed`, and `rate_limited`.
- Do not return stack traces, SQL, connection strings, or provider payloads.
- Return 404 for cross-workspace access when the resource should not be revealed.

## Middleware

- Request ID.
- Structured request log.
- Security headers.
- Body limit.
- Auth and workspace resolution.
- CSRF or strict origin checks for cookie auth.
- Rate limits.
- Metrics.

## SSE

- Use Hono's streaming helpers.
- Send keepalive comments.
- Support reconnect with `Last-Event-ID`.
- Persist messages before or while streaming so a reconnect can replay.
- Do not buffer the whole response.

## Tests

- Success and failure for every route.
- Validation errors.
- Unauthenticated and unauthorized.
- Cross-workspace access.
- Body limit and rate limit.
- SSE reconnect and replay.
- Real socket integration for middleware that needs it.
