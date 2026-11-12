# AGENTS.md

**Status:** Active
**Last updated:** 2026-11-10
**Audience:** AI coding agents and maintainers.

This repository currently contains the Morrow landing page and waitlist only. The product code is being rebuilt from scratch. The private product plan lives in `docs/`, which is gitignored and must not be committed.

## Rules

1. No em dashes. Use a colon, comma, or period.
2. Agents never run `git add`, `git commit`, `git push`, `git tag`, or any command that writes to repository history. Leave changes in the working tree.
3. Do not add secrets, tokens, private keys, cookies, or production data.
4. Do not add a dependency or service without explicit approval.
5. Keep changes small and scoped. One change at a time.
6. Keep `docs/` private and out of git.
7. Use pnpm 12.18.0 and Node 24.11.0.
8. Use exact versions for runtime and build dependencies. No `latest` and no `^` ranges.
9. Run `pnpm typecheck` before handing off.
10. The landing app stays on Wrangler. Do not migrate it to Vite+ or another framework.
11. Create a file or folder only when a task needs it. No speculative structure, placeholder packages, or empty folders.
12. Keep the code simple and readable. Do not overengineer, and do not add abstraction before a second concrete use case.
13. Refactor only when there is a concrete trigger. The agent must stop, explain the trigger, propose the smallest refactor, and wait for approval.
14. Add a project-level skill when a new service, library, or workflow is introduced. Update the stack table below.
15. Keep this file current when the stack, commands, boundaries, or working rules change.
16. Security is a first-class requirement. Every feature task includes a security review and security tests.
17. Use the `security` and `llm-security` skills for any feature that touches auth, tenancy, credentials, external content, tools, or the sandbox.

## Skills

Project-level skills live in `.opencode/skills/<id>/SKILL.md`.

- Add a skill only when the related service, library, or workflow is actually introduced.
- Every skill needs frontmatter with `name` and a trigger-rich `description`.
- Keep skills public-safe. No secrets, internal pricing, private provider notes, or customer data.
- When a skill and this file disagree, this file wins. Fix the skill in the same change.
- Do not install a project dependency as a global-only skill.

### Stack and skills

| Area | Technology | Skill |
|---|---|---|
| Security | Threat model, auth, secrets, supply chain | `security` |
| LLM security | Prompt injection, tools, approvals, egress | `llm-security` |
| Frontend design | Layout, type, accessibility, motion | `frontend-design` |
| Testing | Unit, component, integration, end-to-end | `testing` |
| Observability | pino, OpenTelemetry, alerts | `observability` |
| Landing | Cloudflare Workers, Wrangler, D1 | Add when landing work starts |
| Web | Next.js, React | `nextjs-react` |
| API | Hono, Zod | `hono-api` |
| Database | Neon Postgres, Drizzle | `drizzle-neon` |
| Durable tasks | Inngest self-hosted | Add when task work starts |
| Auth | WorkOS | Add when auth work starts |
| Billing | Dodo Payments | Add when billing work starts |
| Sandbox | Docker | Add when sandbox work starts |
| Deployment | Docker Compose, Caddy | Add when deployment work starts |

### Cross-cutting skills

| Skill | Use |
|---|---|
| `security` | Threat modeling, auth, tenancy, secrets, CSRF, SSRF, path traversal, approvals, sandbox, supply chain |
| `llm-security` | Prompt injection, untrusted content, tool policy, approvals, egress, model output |
| `frontend-design` | Next.js UI, layout, typography, task-first shell, accessibility, motion |
| `testing` | Unit, component, integration, contract, end-to-end, security, failure injection |
| `observability` | pino, OpenTelemetry, redaction, metrics, health, alerts |
| `nextjs-react` | App Router, Server Components, data fetching, forms, UI performance |
| `hono-api` | Routes, middleware, Zod, Problem Details, SSE, API tests |
| `drizzle-neon` | Schema, Neon Postgres, migrations, indexes, tenant scoping, query performance |

## Security

- Every external input is untrusted: HTTP, web, email, files, tool output, model output, and MCP responses.
- Every query and mutation is workspace-scoped.
- Validate at every boundary with Zod.
- Secrets never enter prompts, logs, traces, error messages, or the sandbox.
- Use AES-256-GCM envelope encryption with AAD for provider and connector credentials.
- Approval grants bind to the exact canonical action and argument hash.
- Block SSRF and path traversal. Confine files and resolve symlinks.
- Sandboxes get no host mounts, no Docker socket, no database network, and no credentials.
- Pin dependencies and images. Run audit, secret scan, and image scan in CI.
- No feature is done without its security tests.
- Stop and ask before weakening a control, exposing a port, or adding a sensitive data category.

## Simplicity and refactoring

- Start with the smallest code that works.
- Prefer a clear function over a framework, a plain object over a class hierarchy, and a direct query over a repository abstraction.
- No generic `utils` folder, base class, factory, or plugin system until there are at least two real use cases.
- No file or folder until a task needs it.
- A feature change and a refactor are separate tasks unless the refactor is required for the feature.

Refactor triggers:

- The same logic appears in three or more places.
- A file grows beyond roughly 300 lines or a function beyond roughly 50 lines.
- A change requires editing several unrelated files.
- A test is hard to write because of coupling.
- Performance or security requires a different structure.

When a trigger appears, the agent must stop, explain the problem, propose the smallest refactor, and wait for approval.

## Testing

- Every functionality has tests. A task is not done without them.
- Use the smallest test that proves the behavior: unit, component, integration, or end-to-end.
- Every API route has a success test and a failure test.
- Every bug fix gets a regression test.
- Every webhook has signature, idempotency, and out-of-order tests.
- Every connector and MCP tool has a fixture test.
- Tests use fixtures and generated values. No production data.
- CI runs typecheck, unit, integration, build, and the relevant end-to-end tests.
- See `docs/08-testing-strategy.md` for the full strategy.

## Docs

- `docs/` is private, gitignored, and never committed.
- Product plans, architecture, decisions, learning notes, iteration plans, and progress live in `docs/`.
- Update the relevant doc after each task or iteration.
- The public README stays short and mirrors the landing page.

## Repository layout

- `apps/landing`: Cloudflare Worker, static assets, D1 waitlist, and OG page.
- `apps/api`: Hono API health skeleton.
- `apps/worker`: worker health skeleton.
- `tests/`: API and worker tests.
- `.opencode/skills/`: project-level security, design, testing, and stack skills.
- `.github/workflows/`: landing and product verification.
- `docs/`: private product plan, gitignored.
