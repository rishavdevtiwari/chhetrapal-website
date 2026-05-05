# Chhetrapal Secondary School Website

Production-ready school website built with Next.js (App Router) and integrated with WordPress CMS content. The repo includes a local WordPress Playground setup for development, plus a production deployment path for cPanel or any other host that can run WordPress.

## What This Project Includes

- Public-facing school website (home, about, academics, admissions, gallery, notices, contact)
- CMS-managed content through WordPress admin
- Same-origin WordPress proxy routes through Next.js
- Responsive UI with reusable components
- Fallback content when CMS is temporarily unavailable

## Actual Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Lucide React icons
- shadcn-style component setup

### CMS and Content

- WordPress for development via @wp-playground/cli
- Custom WordPress plugin:
	- Custom post types (notices, staff, programs, facilities, downloads, gallery, contact)
	- Taxonomies and metadata fields
	- Custom REST endpoint for homepage payload
	- Alumni profiles for the homepage spotlight

###### Tooling

- ESLint 9 with eslint-config-next
- PostCSS with @tailwindcss/postcss
- concurrently for running frontend + CMS together

## Repository Structure

```text
.
|- src/
|  |- app/                 # Next.js routes and page sections
|  |- components/          # Shared UI components
|  |- lib/wordpress.ts     # WordPress fetch + fallback handling
|- wordpress/
|  |- setup.blueprint.json # Playground bootstrapping and admin seed
|- wordpress-plugin/
|  |- chhetrapal-school-cms.php # Custom CMS logic
|- next.config.ts          # Rewrite proxy for /wp-admin, /wp-json, and assets
|- package.json            # Scripts and dependencies
```

## Prerequisites

- Node.js 20+
- npm 10+

## Quick Start

1. Install dependencies.

```bash
npm install
```

2. Start frontend and CMS together.

```bash
npm run dev:full
```

3. Open the website.

```text
http://localhost:3000
```

4. Open WordPress admin (proxied through Next.js).

```text
http://localhost:3000/wp-admin/
```

5. Default local admin credentials.

```text
Username: schooladmin
Password: SchoolAdmin@12345!
```

## Available Scripts

- `npm run dev` - Start only Next.js frontend
- `npm run wp:start` - Start only WordPress Playground server on port 9400
- `npm run dev:full` - Start frontend + WordPress together
- `npm run build` - Production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## Frontend <-> WordPress Integration

The integration works through two layers:

1. Next.js rewrites in next.config.ts proxy WordPress paths to http://127.0.0.1:9400
2. Frontend requests content from proxied routes, primarily:
	 - `/wp-json/chhetrapal/v1/homepage`
	 - `/wp-json/wp/v2/...` fallback APIs

This keeps CMS and frontend on one browser origin (localhost:3000) while WordPress runs internally on port 9400 in local development. In production, set `WORDPRESS_INTERNAL_ORIGIN` and `NEXT_PUBLIC_WORDPRESS_ORIGIN` to your live WordPress URL.

## Environment Variables (Optional)

The frontend supports optional overrides for WordPress endpoints:

- `WORDPRESS_INTERNAL_ORIGIN`
- `NEXT_PUBLIC_WORDPRESS_ORIGIN`
- `NEXT_PUBLIC_WORDPRESS_API_BASE`
- `NEXT_PUBLIC_WORDPRESS_HOMEPAGE_API`
- `CHHETRAPAL_FRONTEND_URL` (used by the WordPress plugin to redirect the public WordPress front-end to your live Next.js site)
- `SHOW_CMS_STATUS_BADGE` (set `true` or `1` to show CMS connectivity status in the UI for admin-facing mode)

If not set, defaults in src/lib/wordpress.ts are used.

## Content Model (WordPress)

Custom content is managed in the plugin under the following sections:

- Notices
- Staff and Principal
- Programs
- Facilities
- Downloads
- Contacts
- Gallery Items
- Alumni

Contact entries now also support header social link fields:

- Facebook URL
- YouTube URL
- Twitter / X URL

These are aggregated into a homepage payload consumed by the Next.js frontend.

## Publishing Workflow for School Staff

1. Log in to WordPress admin.
2. Create or edit content in the relevant content type.
3. Add title, body, taxonomy terms, and featured image.
4. Preview and publish.
5. Refresh frontend pages to verify updates.

## Content Team Guide Page

For editors, open:

```text
http://localhost:3000/cms-guide
```

This page maps each WordPress content type to the exact website sections it controls, including the alumni spotlight.

## Production Hosting Guide

The current development setup is not the same as production. WordPress Playground is for local use only, so for live hosting you should move the CMS to a real WordPress install with a real database.

### Recommended production layout

1. Host WordPress on cPanel, managed WordPress, or a separate PHP host.
2. Host the Next.js frontend on a Node-capable platform such as Vercel, a VPS, or a cPanel plan that explicitly supports Node apps.
3. Point the frontend to the real WordPress URL with `WORDPRESS_INTERNAL_ORIGIN` and `NEXT_PUBLIC_WORDPRESS_ORIGIN`.
4. Set `CHHETRAPAL_FRONTEND_URL` on the WordPress side so `/wp-admin` and the CMS frontend redirect to the live site.
5. Upload the plugin from `wordpress-plugin/chhetrapal-school-cms.php` into `wp-content/plugins` and activate it.

### cPanel WordPress setup

1. Create a MySQL database and user in cPanel.
2. Install WordPress in the target domain or subdomain.
3. Import or recreate content and media in the new database.
4. Install the custom plugin and confirm the new content types appear in the admin menu.
5. Set permalinks to a pretty URL structure.
6. Add the live frontend URL as `CHHETRAPAL_FRONTEND_URL` so the WordPress frontend redirects correctly.

### What runs where

- WordPress admin and CMS data live on the WordPress host and database.
- Next.js renders the public site and fetches the CMS data from WordPress over HTTP.
- The Playground blueprint under `wordpress/setup.blueprint.json` is only for local development and demo resets.

### Operational notes

- If your cPanel plan does not support Node.js apps, do not try to deploy the Next.js app there as-is.
- If you must use one server only, use a VPS or a cPanel plan with Node support and confirm that SSR builds are supported.
- Keep the WordPress URL and frontend URL aligned in the env vars so links, admin redirects, and API requests stay synchronized.

## Build and Production Run

```bash
npm run build
npm run start
```

## Troubleshooting

- First CMS startup can take 1-2 minutes.
- If CMS is down, the frontend uses fallback content from `src/lib/wordpress.ts`.
- If `/wp-admin` or `/wp-json` does not load in local development, ensure `wp:start` is running and port 9400 is free.
- On Windows, transient file-lock warnings may appear during Playground startup; retry if needed.

## Contributing

1. Create a feature branch.
2. Keep changes scoped and tested locally.
3. Run lint and build before opening a PR.
4. Include screenshots for UI changes.

## Contributors

<a href="https://github.com/rishavdevtiwari/chhetrapal-website/graphs/contributors">
	<img src="https://contrib.rocks/image?repo=rishavdevtiwari/chhetrapal-website" alt="Contributors" />
</a>

## Team Members

- Kunjang
- Rishav
- Rijin
- Rubina
- Suchit
- Sharad
