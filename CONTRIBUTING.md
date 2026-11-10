# Contributing to Morrow

Morrow is licensed under AGPL-3.0-only. Contributions use the Developer Certificate of Origin (DCO) 1.1. No contributor license agreement is required.

## Before you start

- Read `README.md` and `AGENTS.md`.
- Open an issue for a bug or a proposal before a large change.
- Keep pull requests small and focused. One change per pull request.
- Do not include secrets, tokens, private keys, customer data, or generated `.env` files.
- Do not add a dependency or service without agreement in an issue first.

## Development

Requirements:

- Node 24.11.0. `.node-version` pins it.
- pnpm 12.18.0. `packageManager` pins it.

Install and verify:

```sh
pnpm install
pnpm typecheck
```

Run the landing page locally:

```sh
pnpm dev
```

Deploy from `apps/landing` with Wrangler:

```sh
pnpm deploy
```

## DCO

Sign off every commit:

```sh
git commit -s -m "type(scope): summary"
```

The sign-off certifies the DCO 1.1. See https://developercertificate.org.

## Scope

This repository currently contains the landing page and waitlist. Product code is being rebuilt from scratch. Do not add product packages here until the new plan is approved.
