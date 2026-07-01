# Test writer

Notes for adding or changing tests. General context: [GENERAL.md](./GENERAL.md). Full test reference: [`docs/TESTING.md`](../TESTING.md).

## Decide what to test

| Change                          | Add this kind of test                              |
| ------------------------------- | -------------------------------------------------- |
| New pure function in `src/lib/` | Unit test against `normalizeConfig`, edge cases.   |
| New component prop or behavior  | Smoke render + one user interaction.               |
| Bug fix in existing logic       | A test that fails before the fix and passes after. |
| Styling or copy change          | Skip — not behavior.                               |
| Config schema change            | Update existing tests in `src/lib/config.test.js`. |

## Patterns

- Co-locate tests: `Foo.test.jsx` next to `Foo.jsx`.
- Import the source directly (`./Foo`), not via path aliases.
- Use `getByRole` / `getByLabelText` over `getByTestId`.
- Use `userEvent` from `@testing-library/user-event`, not `fireEvent`.
- Mock callbacks with `vi.fn()`, not raw functions.

## TDD workflow for bug fixes

1. Write the failing test first.
2. Run `bun run test` — confirm it fails for the right reason.
3. Fix the code.
4. Run `bun run test` — confirm it passes.
5. Open the PR with both the test and the fix in the same commit.

## Anti-patterns

- **Snapshot tests.** Brittle, low signal. The existing suite has none — don't add the first.
- **Mocking framer-motion.** Don't. Tests render the initial state; animation outcomes are not asserted.
- **Testing implementation details.** If you find yourself asserting on internal state or ref order, refactor the component to expose the behavior you actually care about.
- **Async waits without `findBy*`.** Prefer `await screen.findByRole(...)` over `setTimeout`.

## Verifying your test

Before committing:

```bash
bun run test                    # full suite
bun run test src/path/to/foo    # just your file
bun run test:watch              # while iterating
```

Then:

- [ ] Test fails when you revert the fix
- [ ] Test name describes the behavior, not the implementation
- [ ] No flake — run it 5× in a row, all pass
