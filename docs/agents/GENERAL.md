# General agent guidance

Read this first. Task-specific notes live in [CODE_REVIEWER.md](./CODE_REVIEWER.md), [TEST_WRITER.md](./TEST_WRITER.md), or [CONTENT_EDITOR.md](./CONTENT_EDITOR.md).

## What this project is

A personal Next.js 15 site that renders a vertical love-story timeline. Single page (`src/app/page.jsx`) with snap-scroll chapters. Content is data-driven from [`public/config.json`](../CONTENT.md).

## Tech stack

- Next.js 15 (App Router, Turbopack)
- React 19
- Framer Motion for animations
- Tailwind CSS 4 with CSS variables for theming
- Bun (package manager + runtime)
- Vitest + Testing Library

Full overview: [`README.md`](../../README.md).

## Where things live

| Concern              | File                                                    |
| -------------------- | ------------------------------------------------------- |
| Page entry           | `src/app/page.jsx`                                      |
| Server-side metadata | `src/app/layout.js`                                     |
| Styles + theme vars  | `src/app/globals.css`                                   |
| Config loader        | `src/lib/config.js`                                     |
| Components           | `src/components/`                                       |
| Config data          | `public/config.json`                                    |
| Theme palettes       | `src/app/globals.css` (`.theme-*` classes)              |
| Tests                | `src/**/*.{test,spec}.{js,jsx}`                         |
| Quality tool config  | `package.json`, `eslint.config.mjs`, `.prettierrc.json` |
| CI                   | `.github/workflows/ci.yml`                              |

## Conventions

- **UPPERCASE doc names.** `README.md`, `STYLEGUIDE.md`, etc. Don't rename to lowercase.
- **Components return JSX** — use `.jsx` extension. Pure JS helpers stay `.js`.
- **Config is data, not code.** `public/config.json` drives the site. Don't hardcode copy or dates in components.
- **CSS variables for colors.** Reference `var(--primary)`, `var(--text-gray)`, etc. Don't hardcode hex.
- **Tailwind utilities over inline styles.** Prettier + the Tailwind plugin will sort them.

## Workflow

1. Read [`docs/QUALITY.md`](../QUALITY.md) once to know what's enforced.
2. Make changes.
3. Run `bun run lint`, `bun run format:check`, `bun run test`, `bun run build` before committing.
4. Commit. Husky will re-run format and lint on the staged subset.

## Don't

- Don't edit `bun.lock` by hand.
- Don't add image hosts to `next.config.js` without checking that the user actually intends to use them.
- Don't bypass the pre-commit hook (`--no-verify`) on shared branches.
- Don't introduce a new dependency without checking if Bun already supports it natively or if a smaller alternative exists.
