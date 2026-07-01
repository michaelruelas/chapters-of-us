# Content editor

Notes for editing [`public/config.json`](../../public/config.json), themes, and images. Schema reference: [`docs/CONTENT.md`](../CONTENT.md). Style reference: [`docs/STYLEGUIDE.md`](../STYLEGUIDE.md).

## Safe to edit without code review

- Values inside `public/config.json` that match the documented schema.
- Theme palette hex values inside `src/app/globals.css` `.theme-*` blocks.
- Image files in `public/images/` (just add or replace).
- The text content of a polaroid caption or a button label.

## Requires code review

- New top-level config keys.
- New image hosts in `next.config.js`.
- New Tailwind classes that need a corresponding CSS variable.
- Renaming or removing existing config keys (downstream breakage).

## Schema at a glance

```json
{
  "siteTitle": "Chapters of Us",
  "landingTitle": "Chapters of Us",
  "landingSubtitle": "years of love, growth, and adventure",
  "description": "Our love story through the years",
  "anniversaryDate": "2015-06-15T12:00:00",
  "theme": "navy",
  "timelineEvents": [
    {
      "id": "event-1",
      "title": "First Met",
      "subtitle": "June 15, 2014",
      "location": "Coffee Shop, City",
      "description": "It all started with a simple cup of coffee.",
      "media": ["/images/first-date-1.jpg"]
    }
  ]
}
```

Required fields per event: `id`, `title`, `subtitle`, `location`, `media`. `description` is optional. `id` must be unique and URL-safe.

## Adding an event

1. Append to `timelineEvents`. Pick the next available `id` (`event-N`).
2. Use local image paths when possible (`/images/your-photo.jpg`).
3. Save. Dev server hot-reloads.
4. Run `bun run test` — schema-related tests in `src/lib/config.test.js` should still pass.

## Switching themes

1. Edit `public/config.json` → `"theme": "sage"` (or `"gray"`).
2. Save. The theme class is applied to `<html>` on mount.
3. Open the site. If a custom element looks broken, the new theme is missing a CSS variable — add it under the `.theme-*` block in `src/app/globals.css`.

## Replacing placeholders

Default `media` URLs point at `doodleipsum.com`. Before deploying:

1. Replace with real URLs or local paths.
2. Re-run `bun run build` — image domain mismatches fail the build.
3. Update `next.config.js` `images.remotePatterns` if you introduce a new host.

## Don't

- Don't delete events without checking that `id` is unused elsewhere (timeline nav, deep links).
- Don't rename `theme` values — they're matched against the whitelist in `src/lib/config.js`.
- Don't add HTML in copy fields — they're rendered as text.
