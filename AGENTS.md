# AGENTS

Read this first when working on Chapters of Us.

## Project

A personal Next.js 15 site that renders a vertical love-story timeline from `public/config.json`. One page (`src/app/page.jsx`), Tailwind 4 + CSS variables for theming, Framer Motion for animation.

Full overview, scripts, and customization: [`README.md`](./README.md).

## Specialized agent guidance

Do not duplicate guidance here. Read the relevant file under [`docs/agents/`](./docs/agents/README.md):

| Task                                     | File                                                               |
| ---------------------------------------- | ------------------------------------------------------------------ |
| General (always read first)              | [`docs/agents/GENERAL.md`](./docs/agents/GENERAL.md)               |
| Reviewing a PR or diff                   | [`docs/agents/CODE_REVIEWER.md`](./docs/agents/CODE_REVIEWER.md)   |
| Adding or changing tests                 | [`docs/agents/TEST_WRITER.md`](./docs/agents/TEST_WRITER.md)       |
| Editing `config.json`, themes, or images | [`docs/agents/CONTENT_EDITOR.md`](./docs/agents/CONTENT_EDITOR.md) |

## Shared docs

[`docs/README.md`](./docs/README.md) is the index. Topics include styling, content schema, testing, deployment, and quality tooling.

## Before committing

```bash
bun run lint
bun run format:check
bun run test
bun run build
```

The pre-commit hook runs the first two on staged files. CI runs all four.
