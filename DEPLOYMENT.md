# Chhetrapal School Website - Complete Setup & Deployment Guide

This document provides comprehensive instructions for setting up and deploying the Chhetrapal School website on any domain.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Local Development Setup](#local-development-setup)
5. [Docker Setup](#docker-setup)
6. [Production Deployment](#production-deployment)
7. [Domain Configuration](#domain-configuration)
8. [SSL/HTTPS Setup](#ssl-https-setup)
9. [Database Management](#database-management)
10. [Troubleshooting](#troubleshooting)
11. [Maintenance](#maintenance)

## Project Overview

**Chhetrapal School Website** is a modern, full-stack web application consisting of:

- **Frontend**: Next.js 16 (React 19, TypeScript, Tailwind CSS)
- **Backend**: WordPress 6.7 with PHP 8.2 and custom CMS plugin
- **Database**: MySQL 8.0
- **Reverse Proxy**: Nginx (for production)
- **Deployment**: Docker & Docker Compose

### Key Features

- Static content pages (About, Academics, Admissions, etc.)
- Gallery management via WordPress CMS
- Notice board with CMS-driven content
- Scholarship listings (managed via WordPress)
- Contact forms
- Responsive design with modern UI/UX

## Architecture

```
┌─────────────────┐
│   Domain        │
│  yourdomain.com │
└────────┬────────┘
         │
┌────────▼─────────────────────┐
│    Nginx Reverse Proxy       │
│  (SSL Termination, Routing)  │
└────────┬─────────────────────┘
         │
    ┌────┴────┐
    │          │
┌───▼────┐ ┌──▼────────┐
│ Next.js│ │ WordPress │
│  3000  │ │    8080   │
└────┬───┘ └──┬────────┘
     │        │
     └────┬───┘
          │
     ┌────▼─────┐
     │  MySQL   │
     │   3306   │
     └──────────┘
```

## Prerequisites

### For Local Development

- Docker Desktop (or Docker + Docker Compose)
- Git
- Code Editor (VS Code recommended)
- Terminal/Command Line

### For Production Deployment

- Linux Server (Ubuntu 20.04 LTS or newer recommended)
- Docker & Docker Compose installed
- Domain name
- SSL Certificate (Let's Encrypt, Cloudflare, or paid)
- Minimum 2GB RAM, 10GB disk space

### Required Knowledge

- Basic Docker/Docker Compose understanding
- Linux command line basics
- DNS configuration
- SSL certificate management

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chhetrapal-website
```

### 2. Install Node Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Start Docker Services

```bash
# Start all services (MySQL, WordPress, Next.js)
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f
```

### 4. Initial Setup

Once all services are running:

1. **WordPress Setup**:
   - Visit: `http://localhost:8080`
   - Complete the WordPress installation wizard
   - Create admin account
   - Activate the custom plugin "Chhetrapal School CMS"

2. **Create CMS Content**:
   - Go to WordPress Admin: `http://localhost:8080/wp-admin`
   - Add required pages and posts
   - Upload gallery images
   - Create scholarship entries

3. **Access Frontend**:
   - Visit: `http://localhost:3000`
   - The frontend will load and fetch data from WordPress

### 5. Development Workflow

```bash
# Start development with file watching
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Run linting
npm run lint

# Run full stack with WordPress
npm run dev:full
```

### 6. Stop Services

```bash
# Stop all containers
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v
```

## Docker Setup

### Understanding the Services

#### MySQL Service
- **Image**: `mysql:8.0`
- **Port**: 3306 (internal, exposed to localhost)
- **Data**: Persisted in `mysql_data` volume
- **Credentials**: Check `docker-compose.yml`

#### WordPress Service
- **Build**: Custom Dockerfile.wordpress
- **Port**: 8080
- **Data**: Persisted in `wordpress_data` volume
- **Plugin Mount**: Mounts `./wordpress-plugin/` for live editing

#### Next.js Service
- **Build**: Custom Dockerfile.frontend
- **Port**: 3000
- **Features**: Multi-stage build, production optimized
- **Health Check**: Automatic recovery

### Custom Dockerfiles

#### Dockerfile.frontend (Next.js)

```
- Multi-stage build for optimized size
- Node 20 Alpine base image
- Production dependencies only
- Runs as non-root user
- Health checks enabled
```

**Key features**:
- Optimized for production (small image size)
- Security hardening (non-root user)
- Automatic recovery via health checks

#### Dockerfile.wordpress (WordPress + PHP)

```
- WordPress 6.7 with PHP 8.2
- Apache web server with rewrite module
- MySQL extensions
- WP-CLI installed
- Custom plugin pre-loaded
```

**Key features**:
- Full WordPress environment
- PHP extensions for database and media
- Easy WordPress management

### Building Custom Images

```bash
# Build frontend image
docker build -f Dockerfile.frontend -t chhetrapal-frontend:latest .

# Build WordPress image
docker build -f Dockerfile.wordpress -t chhetrapal-wordpress:latest .

# Use docker-compose to build all
docker-compose build
```

## Production Deployment

### Step 1: Prepare Linux Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Step 2: Clone Repository

```bash
cd /opt
sudo git clone <repository-url> chhetrapal-website
cd chhetrapal-website
sudo chown -R $USER:$USER .
```

### Step 3: Configure Environment

```bash
# Copy production environment file
cp .env.production .env

# Edit with your values
nano .env
```

**Required environment variables**:

```env
# Database
MYSQL_ROOT_PASSWORD=strong_root_password_here
MYSQL_PASSWORD=strong_wordpress_password_here

# URLs
NEXT_PUBLIC_WORDPRESS_ORIGIN=https://yourdomain.com
CHHETRAPAL_FRONTEND_URL=https://yourdomain.com

# Security
CHHETRAPAL_INTERNAL_TOKEN=generate_secure_token_here
```

### Step 4: Setup SSL Certificate

#### Option A: Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate certificate (point domain to server first)
sudo certbot certonly --standalone -d yourdomain.com

# Certificates will be at:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

#### Option B: Cloudflare SSL

1. Point domain to Cloudflare
2. Enable SSL/TLS in Cloudflare dashboard
3. Use Cloudflare's certificate

#### Option C: Paid SSL Provider

Purchase and download certificate from provider.

### Step 5: Copy SSL Certificates

```bash
# Create ssl directory
mkdir -p /opt/chhetrapal-website/ssl

# Copy certificates (for Let's Encrypt)
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./ssl/key.pem

# Fix permissions
sudo chown $USER:$USER ./ssl/*
chmod 644 ./ssl/cert.pem
chmod 600 ./ssl/key.pem
```

### Step 6: Update Nginx Configuration

Edit `nginx.conf` and update:

```nginx
server_name yourdomain.com www.yourdomain.com;
ssl_certificate /etc/nginx/ssl/cert.pem;
ssl_certificate_key /etc/nginx/ssl/key.pem;
```

### Step 7: Start Production Services

```bash
# Build and start with production compose file
docker-compose -f docker-compose.prod.yml up -d --build

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Check status
docker-compose -f docker-compose.prod.yml ps
```

### Step 8: Initialize WordPress

```bash
# Get WordPress container ID
docker ps | grep wordpress

# Run WordPress setup (first time only)
docker exec chhetrapal-wordpress-prod wp core install \
  --url=https://yourdomain.com \
  --title="Chhetrapal School" \
  --admin_user=admin \
  --admin_password=strong_password \
  --admin_email=admin@yourdomain.com \
  --allow-root

# Activate the custom plugin
docker exec chhetrapal-wordpress-prod wp plugin activate chhetrapal-school-cms --allow-root
```

## Domain Configuration

### DNS Setup

Point your domain to your server's IP address:

1. **A Record**:
   ```
   yourdomain.com          A       YOUR_SERVER_IP
   www.yourdomain.com      A       YOUR_SERVER_IP
   ```

2. **MX Record** (if not using managed email):
   ```
   yourdomain.com          MX      mail.yourdomain.com
   ```

3. **Wait for propagation**: 24-48 hours typically

### Verify DNS

```bash
dig yourdomain.com
nslookup yourdomain.com
```

## SSL/HTTPS Setup

### Auto-Renewal (Let's Encrypt)

```bash
# Create renewal script
sudo nano /opt/chhetrapal-website/scripts/renew-ssl.sh
```

```bash
#!/bin/bash
cd /opt/chhetrapal-website

# Renew certificates
sudo certbot renew --quiet

# Copy new certificates to ssl folder
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./ssl/cert.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./ssl/key.pem

# Fix permissions
sudo chown $USER:$USER ./ssl/*
chmod 644 ./ssl/cert.pem
chmod 600 ./ssl/key.pem

# Restart Nginx
docker-compose -f docker-compose.prod.yml restart nginx
```

```bash
# Make executable
sudo chmod +x /opt/chhetrapal-website/scripts/renew-ssl.sh

# Add to crontab (runs monthly)
sudo crontab -e
# Add line: 0 0 1 * * /opt/chhetrapal-website/scripts/renew-ssl.sh
```

## Database Management

### Backup WordPress Database

```bash
# Create backups directory
mkdir -p ./backups

# Backup database
docker exec chhetrapal-mysql-prod mysqldump \
  -u wordpress \
  -pYOUR_PASSWORD \
  wordpress > ./backups/wordpress-$(date +%Y%m%d-%H%M%S).sql

# Backup WordPress files
docker exec chhetrapal-wordpress-prod tar -czf /backups/wordpress-files-$(date +%Y%m%d-%H%M%S).tar.gz /var/www/html

# List backups
ls -la ./backups/
```

### Restore from Backup

```bash
# Restore database
docker exec -i chhetrapal-mysql-prod mysql \
  -u wordpress \
  -pYOUR_PASSWORD \
  wordpress < ./backups/wordpress-YYYYMMDD-HHMMSS.sql

# Restart services
docker-compose -f docker-compose.prod.yml restart wordpress nextjs
```

### Database Maintenance

```bash
# Connect to MySQL
docker exec -it chhetrapal-mysql-prod mysql \
  -u wordpress \
  -pYOUR_PASSWORD \
  wordpress

# Optimize tables (in MySQL shell)
OPTIMIZE TABLE wp_posts, wp_postmeta, wp_users, wp_comments;
```

## Troubleshooting

### Service Won't Start

```bash
# Check logs
docker-compose logs wordpress
docker-compose logs nextjs
docker-compose logs mysql

# Restart service
docker-compose restart wordpress

# Rebuild service
docker-compose up -d --build wordpress
```

### Database Connection Error

```bash
# Check MySQL is running
docker ps | grep mysql

# Verify credentials in .env
cat .env | grep MYSQL

# Restart MySQL
docker-compose restart mysql
```

### Next.js Not Loading

```bash
# Check Node logs
docker logs chhetrapal-nextjs

# Check Next.js build
docker-compose logs nextjs

# Rebuild frontend
docker-compose up -d --build nextjs
```

### Nginx 502 Bad Gateway

```bash
# Check upstream services
docker ps

# Verify nginx.conf syntax
docker exec chhetrapal-nginx-prod nginx -t

# Restart nginx
docker-compose -f docker-compose.prod.yml restart nginx
```

### SSL Certificate Issues

```bash
# Check certificate expiry
openssl x509 -in ./ssl/cert.pem -text -noout | grep -E "Not Before|Not After"

# Verify certificate chain
openssl verify -CAfile ./ssl/cert.pem ./ssl/cert.pem

# Renew manually
sudo certbot renew --force-renewal
```

### High Memory Usage

```bash
# Check container stats
docker stats

# Optimize WordPress
docker exec chhetrapal-wordpress-prod wp transient delete-all --allow-root

# Clean up Docker
docker system prune -a
```

## Maintenance

### Regular Tasks

#### Daily
- Monitor error logs
- Check uptime status
- Monitor disk space

#### Weekly
- Update WordPress plugins
- Check for security vulnerabilities
- Review error logs

#### Monthly
- SSL certificate auto-renewal (automated)
- Database optimization
- Create manual backups
- Update Docker images

### Update Procedures

#### Update Next.js Application

```bash
cd /opt/chhetrapal-website

# Pull latest code
git pull origin main

# Rebuild Next.js service
docker-compose -f docker-compose.prod.yml up -d --build nextjs

# Verify
docker-compose -f docker-compose.prod.yml logs nextjs
```

#### Update WordPress Core/Plugins

```bash
# Via WordPress Admin Dashboard:
# 1. Visit https://yourdomain.com/wp-admin
# 2. Go to Updates
# 3. Update WordPress core and plugins

# Or via CLI:
docker exec chhetrapal-wordpress-prod wp core update --allow-root
docker exec chhetrapal-wordpress-prod wp plugin update --all --allow-root
```

#### Update Docker Images

```bash
# Pull latest base images
docker pull mysql:8.0
docker pull node:20-alpine
docker pull nginx:alpine

# Rebuild all services
docker-compose -f docker-compose.prod.yml build --no-cache

# Restart services
docker-compose -f docker-compose.prod.yml up -d
```

### Monitoring & Logs

```bash
# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Specific service logs
docker-compose -f docker-compose.prod.yml logs -f wordpress
docker-compose -f docker-compose.prod.yml logs -f nextjs
docker-compose -f docker-compose.prod.yml logs -f mysql

# Check system resources
docker stats

# Service status
docker-compose -f docker-compose.prod.yml ps
```

### Performance Optimization

```bash
# Enable caching
docker exec chhetrapal-wordpress-prod wp plugin install wp-super-cache --activate --allow-root

# Optimize images
docker exec chhetrapal-wordpress-prod wp plugin install imagify --activate --allow-root

# Enable CDN (if using Cloudflare)
# Configure in WordPress admin dashboard
```

## Common Issues & Solutions

### Issue: Container keeps restarting

**Solution**:
```bash
# Check logs
docker logs <container_name>

# Check exit code
docker inspect <container_name> | grep -A 5 State

# Restart manually
docker restart <container_name>
```

### Issue: Database won't connect on first launch

**Solution**:
```bash
# Wait for MySQL to be ready
docker-compose logs mysql | grep "ready for connections"

# Then start other services
docker-compose restart wordpress
```

### Issue: File permissions denied

**Solution**:
```bash
# Fix permissions
sudo chown -R 33:33 /path/to/wordpress
chmod -R 755 /path/to/wordpress

# Or via Docker
docker exec chhetrapal-wordpress-prod chown -R www-data:www-data /var/www/html
```

### Issue: Out of disk space

**Solution**:
```bash
# Check disk usage
du -sh /var/lib/docker/volumes/*

# Clean up unused Docker data
docker system prune -a

# Backup and remove old database backups
mv ./backups/old-* /archive/
```

## Support & Contact

For issues or questions:
- Review this documentation
- Check Docker logs
- Contact development team
- Check WordPress support documentation

---

## Quick Reference Commands

```bash
# Full Stack Start
docker-compose up -d --build

# View Logs
docker-compose logs -f

# Stop Everything
docker-compose down

# WordPress Admin
http://localhost:8080/wp-admin

# Frontend
http://localhost:3000

# Backup Database
docker exec chhetrapal-mysql mysqldump -u wordpress -p wordpress > backup.sql

# Restore Database
docker exec -i chhetrapal-mysql mysql -u wordpress -p wordpress < backup.sql

# Production Start
docker-compose -f docker-compose.prod.yml up -d

# Production Restart
docker-compose -f docker-compose.prod.yml restart

# Production Logs
docker-compose -f docker-compose.prod.yml logs -f
```

---

**Last Updated**: May 2026
**Version**: 1.0
**Maintained By**: Development Team
