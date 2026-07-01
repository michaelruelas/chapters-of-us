# Quality

Tooling overview. Source of truth: [`package.json`](../package.json), [`eslint.config.mjs`](../eslint.config.mjs), [`.prettierrc.json`](../.prettierrc.json), [`.github/workflows/ci.yml`](../.github/workflows/ci.yml).

## Toolchain

| Tool           | Purpose                          | Config                                     |
| -------------- | -------------------------------- | ------------------------------------------ |
| ESLint         | Linting                          | `eslint.config.mjs` (next/core-web-vitals) |
| Prettier       | Formatting + Tailwind class sort | `.prettierrc.json` + `.prettierignore`     |
| Husky          | Pre-commit hook                  | `.husky/pre-commit`                        |
| lint-staged    | Run tools on staged files        | `lint-staged` field in `package.json`      |
| Vitest         | Unit + component tests           | `vitest.config.js` + `vitest.setup.js`     |
| GitHub Actions | CI on push and PR                | `.github/workflows/ci.yml`                 |

## Scripts

| Command                | Purpose                        |
| ---------------------- | ------------------------------ |
| `bun run lint`         | ESLint over the whole repo     |
| `bun run lint:fix`     | ESLint with `--fix`            |
| `bun run format`       | Prettier write across the repo |
| `bun run format:check` | Prettier check (no writes)     |
| `bun run test`         | Vitest run once                |
| `bun run test:watch`   | Vitest in watch mode           |

## Pre-commit hook

Husky runs `lint-staged` on staged files. Defined in [`package.json`](../package.json):

| Staged pattern      | Command                             |
| ------------------- | ----------------------------------- |
| `*.{js,jsx,ts,tsx}` | `prettier --write` + `eslint --fix` |
| `*.{json,md,css}`   | `prettier --write`                  |

Skip for a single commit with `git commit --no-verify`. Don't make it a habit — CI will catch what you skipped.

## CI

GitHub Actions runs on push and PR to `main`:

1. `bun install --frozen-lockfile`
2. `bun run lint`
3. `bun run format:check`
4. `bun run test`
5. `bun run build`
6. Uploads `.next/standalone` and `.next/static` as a 7-day artifact.

Concurrency cancels in-progress runs on the same ref.

## When something is wrong

| Symptom                          | First check                                |
| -------------------------------- | ------------------------------------------ |
| Commit refused locally           | Read the lint-staged output                |
| CI red on format                 | Run `bun run format` then recommit         |
| CI red on lint                   | Run `bun run lint:fix` then recommit       |
| CI red on tests                  | Run `bun run test` locally to see output   |
| CI red on build                  | Check `NEXT_PUBLIC_*` vars and image hosts |
| Prettier reordered your Tailwind | Expected — the plugin sorts class names    |
