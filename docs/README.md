# Docs

Documentation for Chapters of Us. The root `README.md` is the project landing page; everything else lives here.

## Topics

| Doc                              | What's in it                                           |
| -------------------------------- | ------------------------------------------------------ |
| [STYLEGUIDE.md](./STYLEGUIDE.md) | Themes, typography, event backgrounds, polaroids       |
| [CONTENT.md](./CONTENT.md)       | Editing `public/config.json`, adding events and images |
| [TESTING.md](./TESTING.md)       | Running and adding tests with Vitest                   |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Docker, Vercel, homelab, static hosting                |
| [QUALITY.md](./QUALITY.md)       | Lint, format, pre-commit hooks, CI                     |

## For AI coding agents

See [`docs/agents/`](./agents/README.md) for agent-specific notes. Specialized guides live in:

| Agent                                           | When to read it                          |
| ----------------------------------------------- | ---------------------------------------- |
| [GENERAL.md](./agents/GENERAL.md)               | Always — start here                      |
| [CODE_REVIEWER.md](./agents/CODE_REVIEWER.md)   | Reviewing a PR or diff                   |
| [TEST_WRITER.md](./agents/TEST_WRITER.md)       | Adding or changing tests                 |
| [CONTENT_EDITOR.md](./agents/CONTENT_EDITOR.md) | Editing `config.json`, themes, or images |

Keep agent files lean. Shared knowledge lives in this `docs/` tree and is referenced, never duplicated.

## Conventions

- File names are UPPERCASE (e.g., `DEPLOYMENT.md`, not `deployment.md`).
- Every doc links to the file it summarizes rather than copying content.
- The source of truth for code is the code itself. Docs that describe code link to the file and stay current; don't paste large code blocks.
