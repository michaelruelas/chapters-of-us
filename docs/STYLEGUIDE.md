# Styleguide

Visual design reference for Chapters of Us. The single source of truth is [`src/app/globals.css`](../src/app/globals.css).

## Themes

Themes are CSS classes applied to `<html>` by `src/app/page.jsx` based on `config.json` → `theme`. Three presets ship today:

| Theme  | Primary   | Background | Accent    | Use case                         |
| ------ | --------- | ---------- | --------- | -------------------------------- |
| `navy` | `#1A293E` | `#F5F7F8`  | `#A88B4C` | Default. Modern, photo-friendly. |
| `sage` | `#9CAF97` | `#E6E1D8`  | `#A18A5F` | Garden or rustic-chic.           |
| `gray` | `#333333` | `#F2F2F2`  | `#C0C0C0` | Minimal, monochrome.             |

Add a new theme by defining a `.theme-<name>` class that overrides the CSS variables in `:root`.

## Typography

Loaded via `next/font` in [`src/app/layout.js`](../src/app/layout.js):

| Family           | CSS variable            | Used for                          |
| ---------------- | ----------------------- | --------------------------------- |
| Inter            | `--font-inter`          | Body text, navigation             |
| Playfair Display | `--font-playfair`       | Headings, event titles            |
| Dancing Script   | `--font-dancing-script` | Landing accent, polaroid captions |

Tailwind classes: `font-sans`, `font-playfair`, `font-dancing-script`.

## Event backgrounds

Each `<TimelineEvent>` sets a `--event-bg-pct` custom property (95% → 70% in 5% steps). The `.timeline-event` rule mixes that with `--primary`:

```css
background-color: color-mix(in srgb, var(--topcoat-white) var(--event-bg-pct, 90%), var(--primary));
```

This produces a subtle gradient down the timeline without a hardcoded list of six background classes.

## Polaroids

`PhotoDeck` (in [`src/components/PhotoDeck.jsx`](../src/components/PhotoDeck.jsx)) lays out 1–3 images as rotated polaroid cards. Use landscape photos (~600×400 or larger) for best results. Image domains are restricted in `next.config.js`; add a new domain there if you start using a new host.

## Adding a new visual element

1. Pick a CSS variable (`--primary`, `--secondary`, `--highlight`, `--text-gray`) rather than a hardcoded color so the new element inherits the active theme.
2. Use a Tailwind utility (`font-playfair`, `bg-[var(--primary)]`) rather than inline styles so Prettier + the Tailwind plugin can sort classes.
3. Test against all three themes before opening a PR.
