# Chhetrapal Secondary School Website

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Production-ready, full-stack school website built with **Next.js 16**, **React 19**, **TypeScript**, and **WordPress CMS**. Containerized with Docker for seamless local development and deployment.

## 🎯 Quick Links

- **👨‍💻 New to Development?** → Read [SETUP.md](SETUP.md)
- **🚀 Deploying to Production?** → Read [DEPLOYMENT.md](DEPLOYMENT.md)
- **🐳 Docker Guide** → Read [DOCKER_GUIDE.md](DOCKER_GUIDE.md)
- **⚡ Quick Commands** → See [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- **📋 Project Handover** → Read [HANDOVER.md](HANDOVER.md)

## ✨ Features

### Frontend
- ✅ Responsive modern design with Tailwind CSS
- ✅ Static pages (Home, About, Academics, Admissions, etc.)
- ✅ Gallery management
- ✅ Notice board / Updates
- ✅ Scholarship listings
- ✅ Contact form
- ✅ SEO optimized
- ✅ TypeScript for type safety

### CMS (WordPress)
- ✅ Content management through WordPress admin
- ✅ Custom plugin for school-specific features
- ✅ REST API endpoints
- ✅ Media library management
- ✅ Multiple post types & taxonomies
- ✅ Metadata fields for rich content

### DevOps
- ✅ Docker containerization
- ✅ Multi-container orchestration (Docker Compose)
- ✅ Production-ready Nginx reverse proxy
- ✅ SSL/HTTPS support
- ✅ Automated health checks
- ✅ Data persistence with volumes
- ✅ Easy backup & restore

## 🏗️ Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Next.js | 16.2.4 |
| **UI Framework** | React | 19.2.4 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **Backend CMS** | WordPress | 6.7 |
| **Server Language** | PHP | 8.2 |
| **Database** | MySQL | 8.0 |
| **Reverse Proxy** | Nginx | Alpine |
| **Container** | Docker | Latest |

## 📁 Project Structure

```
chhetrapal-website/
├── src/
│   ├── app/                      # Next.js pages and routes
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx        # About page
│   │   ├── academics/page.tsx    # Academics
│   │   ├── admissions/page.tsx   # Admissions
│   │   ├── gallery/page.tsx      # Gallery
│   │   ├── notices/page.tsx      # News/Updates
│   │   └── contact/page.tsx      # Contact form
│   ├── components/               # React components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── gallery-grid.tsx
│   │   ├── notice-board.tsx
│   │   └── ui/                   # UI components
│   └── lib/
│       └── wordpress.ts          # CMS API client
├── wordpress/                    # WordPress config
├── wordpress-plugin/             # Custom CMS plugin
├── Dockerfile.frontend           # Next.js container
├── Dockerfile.wordpress          # WordPress container
├── docker-compose.yml            # Dev environment
├── docker-compose.prod.yml       # Production environment
├── nginx.conf                    # Reverse proxy config
└── [Documentation files]
```

## 🚀 Getting Started

### For Local Development (5 minutes)

**Prerequisites**: Docker Desktop installed

```bash
# 1. Clone repository
git clone <repository-url>
cd chhetrapal-website

# 2. Start everything
docker-compose up --build

# 3. Visit in browser
# Frontend:       http://localhost:3000
# WordPress Admin: http://localhost:8080/wp-admin
# Credentials:    admin / admin123
```

[▶ Detailed setup guide in SETUP.md](SETUP.md)

### For Production Deployment

**Prerequisites**: Linux server with Docker & Docker Compose

```bash
# 1. Prepare environment
cp .env.production .env
nano .env  # Update with your values

# 2. Place SSL certificates
# ssl/cert.pem
# ssl/key.pem

# 3. Deploy
chmod +x deploy.sh
./deploy.sh
```

[▶ Detailed deployment guide in DEPLOYMENT.md](DEPLOYMENT.md)

## 📚 Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| [SETUP.md](SETUP.md) | Local development quickstart | Developers |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide (15k word) | DevOps/SysAdmin |
| [DOCKER_GUIDE.md](DOCKER_GUIDE.md) | Docker reference & best practices | DevOps/Developers |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Quick command reference | Everyone |
| [HANDOVER.md](HANDOVER.md) | Complete project handover docs | New maintainers |

## 📋 Common Commands

```bash
# Development
docker-compose up -d              # Start services
docker-compose logs -f            # View logs
docker-compose down               # Stop services

# Database
./backup.sh                        # Create backup
docker exec chhetrapal-mysql mysql -u wordpress -pwordpress wordpress

# WordPress
docker exec chhetrapal-wordpress wp plugin list --allow-root

# Production
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml logs -f
```

[✓ Full command reference in QUICK_REFERENCE.md](QUICK_REFERENCE.md)

## 🔧 Configuration

### Environment Variables

**Development** (auto-configured):
```env
WORDPRESS_INTERNAL_ORIGIN=http://wordpress:80
NEXT_PUBLIC_WORDPRESS_ORIGIN=http://localhost:8080
```

**Production** (customize):
```env
MYSQL_PASSWORD=your_secure_password
NEXT_PUBLIC_WORDPRESS_ORIGIN=https://yourdomain.com
CHHETRAPAL_INTERNAL_TOKEN=secure_token_here
CHHETRAPAL_FRONTEND_URL=https://yourdomain.com
```

See [.env.production](.env.production) for full template.

## 🐳 Docker Architecture

```
┌─────────────────┐
│   Domain        │
│  yourdomain.com │
└────────┬────────┘
         │
┌────────▼────────────────┐
│  Nginx Reverse Proxy    │
│  (SSL, Routing, Cache)  │
└────────┬────────────────┘
         │
    ┌────┴─────┐
    │           │
┌───▼──┐   ┌───▼──────┐
│Next │   │WordPress │
│3000 │   │  8080    │
└──┬──┘   └────┬─────┘
   │           │
   └─────┬─────┘
         │
    ┌────▼──────┐
    │   MySQL   │
    │   3306    │
    └───────────┘
```

## 🔒 Security Features

- ✅ Non-root container users
- ✅ SSL/HTTPS support
- ✅ SQL injection prevention
- ✅ XSS protection headers
- ✅ Rate limiting (Nginx)
- ✅ Network isolation
- ✅ Health checks
- ✅ Automated backups

[See DEPLOYMENT.md for security checklist](DEPLOYMENT.md#security-checklist)

## 📊 Performance Considerations

- **Image Size**: ~500MB (optimized multi-stage build)
- **Memory**: 2GB+ recommended for production
- **Build Time**: ~2-3 minutes
- **Startup Time**: ~30-60 seconds
- **Database**: Indexed queries, automated optimization

## 🐛 Troubleshooting

### Common Issues

```bash
# Port already in use?
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Service won't start?
docker-compose logs [service-name]

# Database connection failed?
docker-compose restart mysql
```

[▶ Full troubleshooting in DEPLOYMENT.md](DEPLOYMENT.md#troubleshooting)

## 📞 Support & Maintenance

### Regular Tasks

| Task | Frequency |
|------|-----------|
| Backup database | Daily |
| Check logs | Daily |
| Update WordPress | Weekly |
| Update plugins | Weekly |
| SSL renewal | Monthly |
| Security scan | Monthly |

### Emergency Procedures

```bash
# Database corrupted?
./backup.sh  # Restore from backup

# Service crashed?
docker-compose restart [service]

# Full reset (careful!)?
docker-compose down -v && docker-compose up --build
```

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally: `docker-compose up --build`
4. Test build: `npm run build`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Team

- **Developed by**: Development Team
- **Last Updated**: May 2026
- **Status**: ✅ Production Ready
- **Next Review**: June 2026

## 📞 Contact

For issues or questions:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md)
2. Check [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
3. Review Docker logs: `docker-compose logs`
4. Contact development team

---

## Next Steps

- [ ] Read [SETUP.md](SETUP.md) for local development
- [ ] Read [DEPLOYMENT.md](DEPLOYMENT.md) for production
- [ ] Review [DOCKER_GUIDE.md](DOCKER_GUIDE.md) for Docker knowledge
- [ ] Test application locally
- [ ] Deploy to your domain
- [ ] Configure monitoring & backups
- [ ] Set up SSL certificates

**Happy coding! 🚀**
|  |- chhetrapal-school-cms.php # Custom CMS logic
|- next.config.ts          # Rewrite proxy for /wp-admin, /wp-json, and assets
|- SETUP_AND_HANDOVER_GUIDE.md # Host, handover, and restart-safe setup guide
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

## Docker Handover

This repository now includes a Docker-based handover stack for local deployment and review.

For the full setup checklist, hosting requirements, and handover steps, read [SETUP_AND_HANDOVER_GUIDE.md](SETUP_AND_HANDOVER_GUIDE.md).

```bash
docker compose up --build
```

### Services

- Frontend: Next.js app on `http://localhost:3000`
- WordPress: CMS/admin on `http://localhost:8080`
- Database: MySQL container with persistent storage
- The WordPress CMS plugin is auto-loaded in Docker through a mu-plugin bootstrap file

### Required env values

- `CHHETRAPAL_INTERNAL_TOKEN` must match in both services
- `WORDPRESS_INTERNAL_ORIGIN` should point to the internal WordPress service
- `NEXT_PUBLIC_WORDPRESS_ORIGIN` should point to the browser-reachable WordPress URL
- `CHHETRAPAL_FRONTEND_URL` should point to the public frontend URL

### Public frontend behavior

- Public links stay on the Next.js frontend
- Notice images are read from the CMS featured image field
- Alumni content is shown on the homepage and on `/alumni`
- The public site does not expose WordPress navigation or admin links
- The WordPress starter content is only seeded once during first setup, so restarting the server does not re-import dummy data

## Build and Production Run

```bash
npm run build
npm run start
```

## Troubleshooting

- First CMS startup can take 1-2 minutes.
- If CMS is down, the frontend uses fallback content from `src/lib/wordpress.ts`.
- If `/wp-admin` or `/wp-json` does not load in local development, ensure `wp:start` is running and port 9400 is free.
- If using Docker, confirm `docker compose up --build` is using the same `CHHETRAPAL_INTERNAL_TOKEN` value for both containers.
- If you want to preserve real CMS edits, keep the database volume and do not delete the WordPress database after restart.
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

- Sharad Bhandari
- Kunjang Sherpa
- Suchit Ratna Bajracharya
- Rishav Dev Tiwari
- Rijin Maharjan
- Rubina Panta~
