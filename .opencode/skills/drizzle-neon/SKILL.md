---
name: drizzle-neon
description: Use for Drizzle schema, Neon Postgres, SQL migrations, indexes, transactions, tenant scoping, query performance, and database tests.
---

# Drizzle and Neon

## Schema

- Postgres is the source of truth.
- Use UUIDs or UUIDv7 for primary keys.
- Every tenant-owned table has `workspace_id`.
- Add foreign keys and indexes for every common filter.
- Use `timestamptz`, not naive timestamps.
- Use `jsonb` only for flexible payloads, not for data you need to query.
- Keep migrations SQL-first and reviewed.

## Migrations

- Every migration has an up and a down file.
- Migrations are idempotent and tested twice.
- Use a lock or a single migrate job so two deploys do not race.
- Never run a destructive migration without a backup and explicit approval.
- Test the migration path from an empty database, not only the final schema.

## Queries

- Every query is workspace-scoped.
- Select only the columns you need.
- Avoid N+1 queries. Use joins or batch queries.
- Use transactions for multi-row writes and state transitions.
- Use `EXPLAIN` for slow queries.
- Add indexes for foreign keys, status, `created_at`, and search columns.
- Use cursor pagination, not large offsets.

## Neon

- Use the pooled connection string for the API and worker.
- Keep the direct connection for migrations.
- Use Neon branches for preview or isolated testing when useful.
- Use point-in-time restore plus a nightly dump.
- Do not expose the database publicly.
- pgvector is a Postgres extension, not a separate vector database.

## Tests

- Use a real Postgres for integration tests.
- Each test uses a temporary database or a transaction rollback.
- Test cross-workspace denial for every repository.
- Test indexes and constraints with realistic data.
- Test the down migration.
