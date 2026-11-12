---
name: testing
description: Use when adding a feature, fixing a bug, writing tests, reviewing CI, or proving a security boundary. Covers unit, component, integration, contract, end-to-end, security, and failure-injection tests.
---

# Testing

Every functionality has tests. A feature is not done because it works once in the browser.

## Layers

| Layer | What it proves | Tool |
|---|---|---|
| Unit | Pure logic, validation, state transitions | Vitest |
| Component | React states and interactions | Vitest and React Testing Library |
| Integration | API, database, migrations, repositories | Vitest with real Postgres |
| Contract | Providers, webhooks, connectors, MCP | Vitest with fixtures |
| End-to-end | A user flow in a real browser | Playwright |
| Security | Tenancy, CSRF, SSRF, approval replay | Vitest and Playwright |
| Failure injection | Crashes, retries, duplicates, timeouts | Vitest and Playwright |

## Rules

1. Every API route has a success test and a failure test.
2. Every migration has an up and down test. Run migrations twice.
3. Every webhook has signature, idempotency, and out-of-order tests.
4. Every connector and MCP tool has a fixture test.
5. Every approval action has a changed-action test.
6. Every bug fix gets a regression test.
7. Every screen has loading, empty, error, and success tests where practical.
8. Every critical flow has one Playwright test.
9. Tests are deterministic. No real model calls, no real network calls, no arbitrary sleeps.
10. Tests use fixtures and generated values. No production data.

## Database tests

- Production uses Neon Postgres.
- Local and CI tests use a local Postgres container.
- Each test uses a temporary database or a transaction rollback.
- Test the migration path, not only the final schema.
- Test cross-workspace denial for every repository.

## Webhook tests

- Verify the signature with the raw body.
- Reject a missing or invalid signature.
- Deliver the same event twice and prove idempotency.
- Deliver events out of order and prove the final state.
- Test trial, renewal, past due, on hold, cancellation, and expiry.

## What not to do

- Do not test implementation details.
- Do not mock the database when a real Postgres test is practical.
- Do not assert that a mock was called unless the call is the behavior.
- Do not chase 100 percent coverage. Cover behavior, failure paths, and security boundaries.

## Commands

```sh
pnpm typecheck
pnpm test
pnpm test:e2e
```

## CI

The verify workflow runs typecheck, unit and component tests, integration tests with Postgres, build, and the critical Playwright flows.
