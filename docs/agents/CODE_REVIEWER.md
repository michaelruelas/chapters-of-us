# Code reviewer

What to focus on when reviewing a PR or diff. General context: [GENERAL.md](./GENERAL.md).

## Read first

- [`docs/QUALITY.md`](../QUALITY.md) — what CI already enforces. Don't repeat those checks manually.
- The diff itself. Open `git diff main...HEAD -- <files>` for a focused view.

## High-signal checks

In rough priority order:

1. **Correctness.** Does the new code do what the PR description claims? Trace the data flow.
2. **Regressions.** Did the change touch shared state, layout, or config parsing? Check related tests in [`src/`](../TESTING.md).
3. **Config safety.** If `public/config.json` changed, confirm the schema in [`docs/CONTENT.md`](../CONTENT.md) still matches.
4. **Theme safety.** New colors? Use `var(--*)`, not hex. New layout? Check all three themes render correctly.
5. **Bundle size.** Any new dependency? Justify it. Could it be a few lines inline instead?
6. **Accessibility.** Interactive elements get `aria-label`. Headings are real `<h1>`/`<h2>`/`<h3>`, not styled `<div>`s.
7. **Tests.** Behavior change without a test = flag it. Pure-function changes should add a unit test (see [TEST_WRITER.md](./TEST_WRITER.md)).

## Low-signal checks (skip)

- Naming bikeshedding.
- Style nits (Prettier already enforces).
- "Could you also…" suggestions outside the PR's scope. Open a follow-up issue instead.

## Common smells

| Smell                                      | What's wrong                              |
| ------------------------------------------ | ----------------------------------------- |
| New hex color in a component               | Use a CSS variable instead.               |
| `useEffect` that synchronizes prop → state | Derive the value, don't sync.             |
| Manual `IntersectionObserver`              | Use framer-motion `whileInView`.          |
| Hardcoded copy or date                     | Move to `config.json`.                    |
| New dep without rationale                  | Probably not needed.                      |
| Long `useEffect` cleanup                   | Extract into a custom hook in `src/lib/`. |

## Approve when

- Tests pass, lint passes, format passes.
- The diff is small enough to read end-to-end in one pass.
- You've identified the author and a CODEOWNER review path (see `.github/CODEOWNERS`).
