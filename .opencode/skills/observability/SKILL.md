---
name: observability
description: Use for pino logging, OpenTelemetry traces and metrics, redaction, request IDs, health checks, alerts, incident debugging, and cost or latency visibility.
---

# Observability

If we cannot see it, we cannot secure it or debug it.

## Logs

- JSON logs with pino.
- Include `service`, `requestId`, `workspaceId` where safe, `route`, `status`, and `durationMs`.
- Redact authorization, cookies, passwords, tokens, API keys, and connection strings.
- Do not log request bodies by default.
- Do not log prompts, model output, tool output, or email bodies by default.
- Use stable event names such as `http.request`, `task.started`, `tool.completed`, and `webhook.received`.
- Never log a raw secret, even at debug level.

## Request IDs

- Accept a valid `x-request-id` or generate a UUID.
- Echo it in the response.
- Attach it to logs and traces.
- Never trust an oversized or malformed ID.

## Traces

- OpenTelemetry with W3C `traceparent`.
- Spans for HTTP requests, model calls, tool calls, webhooks, and jobs.
- Record status, duration, provider, model, and token counts.
- Do not record prompts or tool output by default.
- Propagate trace context into jobs and sandbox calls.
- Keep the collector optional. The product must run without it.

## Metrics

- Bounded cardinality. No user IDs, workspace IDs, or raw URLs as labels.
- HTTP requests, errors, latency, queue depth, task failures, provider errors, and sandbox starts.
- Expose a Prometheus text endpoint or OTLP metrics.
- Restrict metrics to the private network in production.

## Health

- `/health/live`: process is alive.
- `/health/ready`: dependencies are reachable and the worker is ready.
- Readiness is not a full functional test, but it must not lie.
- The worker reports queue state and last job time.

## Alerts

Alert on:

- Error rate above a threshold.
- p95 latency above a threshold.
- Queue depth or task age above a threshold.
- Repeated provider or webhook failures.
- Disk, memory, or connection pool pressure.
- Backup failure.

## Sentry

- Optional.
- Scrub PII and secrets before send.
- Do not send prompts or tool output by default.
- Use release and environment tags.
- Keep the DSN server-side.
