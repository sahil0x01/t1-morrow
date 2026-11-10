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

## Repository layout

- `apps/landing`: Cloudflare Worker, static assets, D1 waitlist, and OG page.
- `.github/workflows/landing.yml`: landing typecheck and Wrangler dry run.
- `docs/`: private product plan, gitignored.
