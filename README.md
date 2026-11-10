# Morrow

[![Landing](https://github.com/sahil0x01/t1-morrow/actions/workflows/landing.yml/badge.svg)](https://github.com/sahil0x01/t1-morrow/actions/workflows/landing.yml)

The landing page and waitlist for Morrow.

**[Join the waitlist](https://morrow.transistorone.com)** · **[GitHub](https://github.com/sahil0x01/t1-morrow)**

## Development

Requirements:

- Node 24.11.0. `.node-version` pins it.
- pnpm 12.18.0. `packageManager` pins it.
- A Cloudflare account with Wrangler access for deployment.

Install and run:

```sh
pnpm install
pnpm dev
```

Typecheck:

```sh
pnpm typecheck
```

Deploy:

```sh
pnpm deploy
```

The D1 migration is in `apps/landing/migrations`. Apply it with:

```sh
pnpm db:migrate:local
pnpm db:migrate:remote
```

Built by [Transistor One](https://transistorone.com) with love.

AGPL-3.0 License
