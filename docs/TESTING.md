# Testing

Vitest 4 + Testing Library. Tests live next to the code they cover as `*.test.{js,jsx}` files.

## Commands

| Command              | Purpose                                 |
| -------------------- | --------------------------------------- |
| `bun run test`       | Run the whole suite once                |
| `bun run test:watch` | Watch mode for the file you are editing |

## Layout

| Path                                  | What it covers                             |
| ------------------------------------- | ------------------------------------------ |
| `src/lib/config.test.js`              | `normalizeConfig` + `getAnniversaryYears`  |
| `src/components/Landing.test.jsx`     | Landing renders + button fires `onEnter`   |
| `src/components/NavArrows.test.jsx`   | Up/down buttons fire callbacks             |
| `src/components/TimelineNav.test.jsx` | Dot rendering, `aria-current`, click index |

Configuration: [`vitest.config.js`](../vitest.config.js). Setup (jest-dom matchers, RTL cleanup): [`vitest.setup.js`](../vitest.setup.js).

## Conventions

- Test files live next to the source file (`Foo.test.jsx` next to `Foo.jsx`).
- Pure functions in `src/lib/` get unit tests.
- Components get a smoke test that asserts accessibility roles (`getByRole('button', { name: /.../ })`) and one user interaction. Don't over-mock; render with realistic props.
- Accessibility queries (`getByRole`, `getByLabelText`) are preferred over `getByTestId`.
- User interactions go through `@testing-library/user-event`, not `fireEvent`.

## Adding a test

1. Create `<file>.test.jsx` next to the component (or `lib/<file>.test.js`).
2. Import from the source file using a relative path (`./Foo`, not `@/components/Foo` — keeps the test bundle small).
3. Use `vi.fn()` for callback mocks.
4. Verify the test fails before you fix the bug; verify it passes after.

## Common gotchas

- **JSON imports.** `config.json` is statically imported at build time, so tests run against the real config. If you need to isolate config logic, use `normalizeConfig` (the pure export) rather than the live `siteConfig` object.
- **Animations.** Components use framer-motion. Tests render the initial state; `whileInView` and `animate` props don't fire in jsdom. Don't assert animation outcomes — assert the rendered content.
- **`document.title` side effect.** `page.jsx` mutates `document.title`. Don't import `page.jsx` from a test; test the underlying pieces (`Landing`, `NavArrows`, etc.) instead.
