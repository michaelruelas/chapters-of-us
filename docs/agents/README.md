# Agents

Specialized notes for AI coding agents working on this repo. Each file here is short and points at the shared docs in [`../`](../README.md) rather than duplicating them.

## Subsections

| File                                     | Audience                                              |
| ---------------------------------------- | ----------------------------------------------------- |
| [GENERAL.md](./GENERAL.md)               | Any agent — read first, every time                    |
| [CODE_REVIEWER.md](./CODE_REVIEWER.md)   | Agents reviewing a PR or diff                         |
| [TEST_WRITER.md](./TEST_WRITER.md)       | Agents adding or fixing tests                         |
| [CONTENT_EDITOR.md](./CONTENT_EDITOR.md) | Agents editing `public/config.json` or theme settings |

## Why this structure

- **Shared knowledge** (what the project is, how to build it, how to test it) lives in [`docs/`](../README.md).
- **Specialized guidance** lives here, one file per common task.
- **This file is an index**, not a copy of the docs. If you find yourself writing the same paragraph twice across agent files, move it to `docs/` and link it.

## If you add a new agent subsection

1. Pick a verb-shaped name (`<TASK>_AGENT.md` or `<ROLE>.md`).
2. Cap it at ~50 lines.
3. Link to the relevant shared doc instead of restating it.
4. Add a row to the table above.
