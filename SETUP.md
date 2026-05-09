# Local Development Setup Guide

Quick start guide for local development with Docker.

## Prerequisites

- Docker Desktop installed ([download](https://www.docker.com/products/docker-desktop))
- Git installed
- VS Code or preferred editor
- 4GB+ available RAM

## Quick Start (5 minutes)

### 1. Clone & Navigate

```bash
git clone <repository-url>
cd chhetrapal-website
```

### 2. Start Services

```bash
docker-compose up --build
```

### 3. Access Applications

| Service | URL | Note |
|---------|-----|------|
| Frontend | http://localhost:3000 | Next.js website |
| WordPress Admin | http://localhost:8080/wp-admin | CMS admin |
| WordPress API | http://localhost:8080/wp-json | REST API |
| Database | localhost:3306 | MySQL connection |

### 4. WordPress Initial Setup

First time only:

```bash
# In another terminal
docker exec chhetrapal-wordpress wp core install \
  --url=http://localhost:8080 \
  --title="Chhetrapal School" \
  --admin_user=admin \
  --admin_password=admin123 \
  --admin_email=admin@example.com \
  --allow-root
```

WordPress will be ready at `http://localhost:8080/wp-admin` (User: `admin`, Password: `admin123`)

## Development Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild services
docker-compose up --build

# Restart specific service
docker-compose restart nextjs

# Access WordPress container
docker exec -it chhetrapal-wordpress bash

# Run WordPress CLI commands
docker exec chhetrapal-wordpress wp <command> --allow-root
```

## Editing Code

### Frontend Code

Files in `src/` are live-reloaded:

```
src/
├── app/         - Pages and layouts
├── components/  - React components
├── lib/         - Utilities
└── public/      - Static assets
```

### WordPress Plugin

Files in `wordpress-plugin/` are mounted live:

Edit and changes reflect immediately in WordPress.

### Create New Page

```bash
# Add new page route
src/app/mynewpage/page.tsx

# Access at http://localhost:3000/mynewpage
```

## Database Access

### From Host Machine

```bash
mysql -h 127.0.0.1 -u wordpress -pwordpress wordpress
```

### From Container

```bash
docker exec -it chhetrapal-mysql mysql -u wordpress -pwordpress wordpress
```

### Common Commands

```sql
-- List tables
SHOW TABLES;

-- View posts
SELECT ID, post_title, post_status FROM wp_posts;

-- View theme options
SELECT option_name, option_value FROM wp_options;
```

## Troubleshooting

### "Port already in use"

```bash
# Find process using port
lsof -i :3000
lsof -i :8080
lsof -i :3306

# Kill process
kill -9 <PID>
```

### "Can't connect to WordPress"

```bash
# Check if WordPress is running
docker ps | grep wordpress

# View logs
docker logs chhetrapal-wordpress

# Restart
docker-compose restart wordpress
```

### "Database connection failed"

```bash
# Check MySQL is running
docker ps | grep mysql

# Restart MySQL
docker-compose restart mysql

# Wait 10 seconds before accessing
```

### "Out of memory"

```bash
# View resource usage
docker stats

# Remove unused containers/images
docker system prune -a

# Increase Docker resources in Settings
```

## Useful Tips

### VSCode Docker Extension

Install "Dev Containers" extension by Microsoft for better Docker integration.

### Live Database Inspection

```bash
# Terminal 1
docker-compose up

# Terminal 2
docker exec -it chhetrapal-mysql mysql -u wordpress -pwordpress wordpress
```

### Test WordPress API

```bash
# Get posts
curl http://localhost:8080/wp-json/wp/v2/posts

# Get pages
curl http://localhost:8080/wp-json/wp/v2/pages

# Custom endpoint
curl http://localhost:8080/wp-json/chhetrapal/v1/homepage
```

### Reset Everything

```bash
# Stop and remove all containers and volumes
docker-compose down -v

# Rebuild from scratch
docker-compose up --build

# Reinstall WordPress
docker exec chhetrapal-wordpress wp core install \
  --url=http://localhost:8080 \
  --title="Chhetrapal School" \
  --admin_user=admin \
  --admin_password=admin123 \
  --admin_email=admin@example.com \
  --allow-root
```

## File Structure

```
chhetrapal-website/
├── src/
│   ├── app/             - Next.js pages
│   ├── components/      - React components
│   └── lib/             - Utilities
├── public/              - Static files
├── wordpress/           - WordPress setup
├── wordpress-plugin/    - Custom CMS plugin
├── Dockerfile.frontend  - Next.js container
├── Dockerfile.wordpress - WordPress container
├── docker-compose.yml   - Local dev setup
├── next.config.ts       - Next.js config
├── package.json         - dependencies
└── tsconfig.json        - TypeScript config
```

## Next Steps

1. Read [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
2. Review [wordpress-plugin/README](wordpress-plugin/README.md) for CMS documentation
3. Check [SECURITY.md](SECURITY.md) for security best practices

---

**Happy Coding!** 🚀
