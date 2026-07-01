# Chapters of Us

A beautiful, responsive vertical timeline of your love story. Built for anniversaries, featuring a vintage polaroid aesthetic with mobile-first design, an immersive landing page, and interactive navigation.

![Demo](./demo-image.png)

A [Next.js](https://nextjs.org) project using [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (Playfair Display, Dancing Script, Inter) and [Framer Motion](https://www.framer.com/motion/).

## Getting started

```bash
bun install
bun run dev
```

Open <http://localhost:3000> to see the site. The page is driven by [`public/config.json`](./public/config.json); edits hot-reload in dev.

## Documentation

| Doc                                        | Topic                                          |
| ------------------------------------------ | ---------------------------------------------- |
| [docs/README.md](./docs/README.md)         | Index                                          |
| [docs/STYLEGUIDE.md](./docs/STYLEGUIDE.md) | Themes, typography, polaroids                  |
| [docs/CONTENT.md](./docs/CONTENT.md)       | `config.json` schema, adding events and images |
| [docs/TESTING.md](./docs/TESTING.md)       | Vitest + Testing Library                       |
| [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Docker, Vercel, homelab                        |
| [docs/QUALITY.md](./docs/QUALITY.md)       | Lint, format, pre-commit, CI                   |

For AI coding agents: see [`AGENTS.md`](./AGENTS.md) and [`docs/agents/`](./docs/agents/README.md).

## Scripts

| Command                | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `bun run dev`          | Dev server with Turbopack hot reload            |
| `bun run build`        | Production build (standalone output for Docker) |
| `bun run start`        | Run the production build                        |
| `bun run lint`         | ESLint via `eslint-config-next`                 |
| `bun run lint:fix`     | Auto-fix lint issues                            |
| `bun run format`       | Format the whole repo with Prettier             |
| `bun run format:check` | Verify formatting (used in CI)                  |
| `bun run test`         | Run Vitest suite once                           |
| `bun run test:watch`   | Watch mode for tests                            |

CI runs lint, format check, tests, and build on every push and PR. See [docs/QUALITY.md](./docs/QUALITY.md).

## Attributions

- **Landing background**: [Unsplash – A lone vehicle drives across vast white sand dunes](https://unsplash.com/photos/a-lone-vehicle-drives-across-vast-white-sand-dunes-caTXL5CVRcQ)
- **Framer Motion**: Used for all transitions and scroll-driven animations.
