# Deployment

Next.js 15 standalone build, served by Bun. Three supported targets.

## Docker

```bash
docker compose up --build
```

- [`Dockerfile`](../Dockerfile) — two-stage build (`oven/bun:1`).
- [`docker-compose.yml`](../docker-compose.yml) — exposes port 3003 locally, runs on 3000 in the container.
- Sets `NEXT_PUBLIC_ANIVERSARY_DATE` so the years counter is correct regardless of the build host's clock.

The standalone build outputs `.next/standalone` which contains the minimal `node_modules` to run `bun server.js`.

## Vercel

The repo is a vanilla Next.js app — push to a Vercel project, accept defaults. The `output: 'standalone'` setting in `next.config.js` is ignored on Vercel (it deploys the lambda-based build), so no extra config is needed.

## Homelab / static server

Two options:

### Node-style (recommended)

```bash
bun run build
bun run start
```

Runs the standalone server on `PORT` (default `3000`).

### Pure static

For nginx-style hosting without a Node process:

1. Change `next.config.js` to `output: 'export'`.
2. `bun run build` — outputs `out/` with static HTML, JS, and assets.
3. Serve `out/` with nginx or any static server. Note: `next/image` remote optimization won't work; pre-resize images instead.

## Environment variables

Set in your deploy platform, not committed:

| Variable                       | Required   | Notes                                              |
| ------------------------------ | ---------- | -------------------------------------------------- |
| `PORT`                         | no         | Default `3000`. Docker compose maps to `3003`.     |
| `NEXT_PUBLIC_BASE_URL`         | yes (prod) | Absolute URL for OG/Twitter metadata.              |
| `NEXT_PUBLIC_ANNIVERSARY_DATE` | no         | Override `config.json` anniversary date for build. |

`NEXT_PUBLIC_*` vars are inlined at build time. Changing them after build has no effect — rebuild.

## Pre-deploy checklist

- [ ] `bun run test` passes
- [ ] `bun run format:check` passes
- [ ] `bun run lint` passes
- [ ] `bun run build` succeeds
- [ ] `NEXT_PUBLIC_BASE_URL` set to the production URL
- [ ] `public/config.json` checked for placeholder URLs (e.g. `doodleipsum.com`)
- [ ] Photos replaced with real, optimized assets
