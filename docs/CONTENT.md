# Content

Everything content-related lives in [`public/config.json`](../public/config.json). The site hot-reloads in dev on save; production requires a rebuild.

## Schema

| Field             | Type                             | Default                              | Notes                                                          |
| ----------------- | -------------------------------- | ------------------------------------ | -------------------------------------------------------------- |
| `siteTitle`       | string                           | `"Chapters of Us"`                   | `<title>`, OG, Twitter.                                        |
| `landingTitle`    | string                           | `"Our Story"`                        | Landing H1.                                                    |
| `landingSubtitle` | string                           | `"years"`                            | Suffix after the years counter.                                |
| `description`     | string                           | `"Our love story through the years"` | `<meta description>`.                                          |
| `anniversaryDate` | ISO date string                  | _(required for the years counter)_   | See [Years counter](#years-counter) below.                     |
| `theme`           | `"navy"` \| `"sage"` \| `"gray"` | `"navy"`                             | One of three CSS themes from [STYLEGUIDE.md](./STYLEGUIDE.md). |
| `timelineEvents`  | array of event objects           | `[]`                                 | See [Event object](#event-object) below.                       |

Years are computed in [`src/lib/config.js`](../src/lib/config.js). Override the date at runtime with `NEXT_PUBLIC_ANNIVERSARY_DATE` (see [`README.md`](../README.md)).

## Event object

```json
{
  "id": "event-1",
  "title": "First Met",
  "subtitle": "June 15, 2014",
  "location": "Coffee Shop, City",
  "description": "It all started with a simple cup of coffee.",
  "media": ["/images/first-date-1.jpg", "/images/first-date-2.jpg"]
}
```

| Field         | Required | Notes                                                         |
| ------------- | -------- | ------------------------------------------------------------- |
| `id`          | yes      | Unique, URL-safe (used in the `#id` deep links and nav dots). |
| `title`       | yes      | H2 on the chapter. Also shown in the browser tab.             |
| `subtitle`    | yes      | Date or tagline.                                              |
| `location`    | yes      | Where it happened.                                            |
| `description` | no       | 1–3 sentences of story text.                                  |
| `media`       | yes      | Array of 1–3 image URLs. Layout adapts; 3 looks best.         |

## Years counter

The landing screen displays `{years} {landingSubtitle}` (e.g. "12 years of love"). Logic:

- Compute `now.getFullYear() - anniversary.getFullYear()`.
- If this year's anniversary hasn't happened yet (compare month/day), subtract one.
- If the anniversary is in the future, return `0`.
- An invalid or missing date returns `0`.

Tested in [`src/lib/config.test.js`](../src/lib/config.test.js).

## Adding images

Three options:

1. **Local (recommended for personal photos).** Drop the file in `public/images/` and reference it as `/images/your-photo.jpg`.
2. **Hosted.** Use a URL (e.g. `https://images.unsplash.com/...`). Add the host to `next.config.js` `images.remotePatterns`.
3. **Placeholders.** Defaults use `doodleipsum.com` for development convenience. Replace before deploying.

Image domains currently allowed in `next.config.js`:

| Host                  | Purpose               |
| --------------------- | --------------------- |
| `images.unsplash.com` | Free stock photos.    |
| `doodleipsum.com`     | Default placeholders. |

## Adding an event

1. Append the event object to `timelineEvents` in `public/config.json`.
2. Use a unique `id` (e.g. `event-7`).
3. Save. Dev server hot-reloads.
4. Run `bun run test` and `bun run format:check` before committing.

## Changing the theme

1. Open `public/config.json`.
2. Set `"theme": "sage"` (or `"gray"`).
3. Save and reload. The active theme class is applied to `<html>` on mount.
