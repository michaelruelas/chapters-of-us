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

The site is fully customizable via the `public/config.json` file and environment variables (`.env.local`). Edit these to personalize your anniversary timeline without code changes.

### 1. config.json (Content & Events)

Edit `public/config.json` for your story details. This loads dynamically and drives metadata, titles, and content.

#### Structure

```json
{
  "siteTitle": "Chapters of Us",
  "anniversaryDate": "2013-09-21T12:00:00",
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

- **siteTitle** (optional): Base site title (e.g., "Chapters of Us"). Used for HTML `<title>`, meta tags, and dynamic browser tab titles. Defaults to "Chapters of Us" if omitted. Great for SEO and branding.
- **anniversaryDate**: Date in ISO format (e.g., "2013-09-21T12:00:00"). Used to calculate years for the landing title (can be overridden via env).
- **timelineEvents**: Array of events (5-10 recommended). Each includes:
  - **id** (required): Unique ID (e.g., "event-1") for navigation.
  - **title** (required): Main heading (e.g., "Our First Date"). Also used in dynamic browser tab titles (e.g., "Our First Date - Chapters of Us").
  - **subtitle** (required): Date/tagline (e.g., "September 21, 2013").
  - **location** (required): Where it happened (e.g., "The Little Cafe, Downtown").
  - **description** (optional): Story text (1-3 sentences).
  - **media** (required): 2-3 image URLs (e.g., Unsplash, ImgBB, or `/public/images/my-photo.jpg` for local). Render as polaroids. Supports JPG, PNG, SVG.

After editing, restart `npm run dev` to see changes (including metadata updates). Replace placeholders with real photos (high-res, 600x400+ recommended).

#### Metadata and Dynamic Titles
- **Static Metadata**: The base `<title>` and `<meta description>` in the HTML head are generated from `siteTitle` and a fixed description ("Our love story through the years"). This improves SEO and social sharing previews.
- **Dynamic Browser Tab Titles**: As you navigate:
  - Landing: "Our Anniversary: 12 years! - Chapters of Us"
  - Chapter/Event: "Our First Date - Chapters of Us" (updates on scroll/arrows/sidebar clicks).
- View source (Ctrl+U) to see static metadata. Tab title changes in real-time for better UX.

### 2. Environment Variables (.env.local)

For server/port and overrides, use `.env.local` (gitignored template: `.env.example`).

#### Setup
1. Copy: `cp .env.example .env.local`
2. Edit `.env.local` (never commit it).
3. Restart server for changes.

#### Example .env.local
```
# Development server port (default: 3000)
PORT=3000

# Base URL for production (e.g., absolute links/images)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: Override anniversary date (YYYY-MM-DD)
NEXT_PUBLIC_ANIVERSARY_DATE=2013-09-21

# Optional: Custom image domains (update next.config.js if needed)
```

#### Key Variables
- **PORT** (number): Dev/production server port (e.g., `PORT=51253` for http://localhost:51253). Next.js auto-detects.
- **NEXT_PUBLIC_BASE_URL** (string): Public base URL (e.g., `https://your-homelab.com`). For future links/images.
- **NEXT_PUBLIC_ANIVERSARY_DATE** (string, YYYY-MM-DD): Overrides `config.json` anniversaryDate for year calc (e.g., forces "12 years!").
- **Notes**:
  - `NEXT_PUBLIC_` vars are client-side (browser-safe).
  - For CORS/iframes: Add `--hostname 0.0.0.0` to `package.json` dev script.
  - Testing: Change PORT, restart `npm run dev`, visit new URL. Year updates via env override.
  - Production: Set vars in deploy platform (Vercel dashboard) or server env (nginx/Docker).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

For homelab deployment, build with `npm run build` and serve the `/out` directory with a static server (e.g., nginx) or use `npm run start` after building.
