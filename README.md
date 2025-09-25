# chapters-of-us

Create a beautiful, responsive vertical timeline of your love story. Perfect for anniversaries, featuring a vintage polaroid aesthetic with mobile-first design, immersive landing page, and interactive navigation.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts (Playfair Display, Dancing Script, Inter).

## Customization

The site is fully customizable via the `public/config.json` file. Edit this file to personalize your anniversary timeline.

### Configuration Structure

```json
{
  "anniversaryDate": "2016-10-10",
  "timelineEvents": [
    {
      "id": "event-1",
      "title": "Our First Date",
      "subtitle": "September 21, 2013",
      "location": "The Little Cafe, Downtown",
      "description": "It all started with a cup of coffee. We talked for hours and it felt like minutes. I knew something special was beginning.",
      "media": [
        "https://placehold.co/600x400/d1d4c9/5b6058?text=First+Date",
        "https://placehold.co/600x400/e0dace/5b6058?text=Coffee"
      ]
    }
    // Add more events...
  ]
}
```

- **anniversaryDate**: Date in YYYY-MM-DD format (e.g., "2016-10-10"). Used to calculate the number of years for the title screen.
- **timelineEvents**: Array of events. Each event includes:
  - **id**: Unique identifier (e.g., "event-1") for navigation anchors.
  - **title**: Main event title (e.g., "Our First Date").
  - **subtitle**: Date or subheading (e.g., "September 21, 2013").
  - **location**: Event location (e.g., "The Little Cafe, Downtown").
  - **description**: Detailed story text.
  - **media**: Array of 2-3 image URLs (e.g., from Unsplash or placeholders). Images display as vintage polaroids.

After editing `config.json`, restart the dev server (`npm run dev`) to see changes. Replace placeholder images with your own (upload to a host like ImgBB or use local files in `/public`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

For homelab deployment, build with `npm run build` and serve the `/out` directory with a static server (e.g., nginx) or use `npm run start` after building.
