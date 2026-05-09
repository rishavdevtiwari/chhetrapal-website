# Docker Comprehensive Guide

Complete reference for working with Docker in this project.

## Table of Contents

1. [Docker Basics](#docker-basics)
2. [Docker Compose](#docker-compose)
3. [Services Overview](#services-overview)
4. [Image Building](#image-building)
5. [Container Management](#container-management)
6. [Networking](#networking)
7. [Volumes & Persistence](#volumes--persistence)
8. [Health Checks](#health-checks)
9. [Debugging](#debugging)
10. [Best Practices](#best-practices)

## Docker Basics

### What is Docker?

Docker is containerization technology that packages your application and dependencies into isolated, portable units.

### Key Concepts

- **Image**: Blueprint for a container (like a template)
- **Container**: Running instance of an image
- **Volume**: Persistent storage attached to containers
- **Network**: Communication between containers
- **Registry**: Repository for sharing images (Docker Hub)

### Essential Commands

```bash
# Image management
docker images                   # List images
docker pull image:tag          # Download image
docker rmi image:tag           # Remove image
docker tag source:tag dest:tag # Tag image

# Container management
docker ps                      # List running containers
docker ps -a                   # List all containers
docker run image:tag           # Create & run container
docker inspect container       # Show details
docker rm container            # Remove container

# Logs & debugging
docker logs container          # View logs
docker logs -f container       # Follow logs
docker exec container cmd      # Run command in container
docker shell container bash    # Interactive shell

# Cleanup
docker system prune            # Remove unused data
docker system prune -a         # Remove all unused
```

## Docker Compose

### What is Docker Compose?

Tool for defining and running multi-container applications using YAML files.

### Files in This Project

- **docker-compose.yml**: Development setup
- **docker-compose.prod.yml**: Production setup

### Basic Commands

```bash
# Start services
docker-compose up                  # Start in foreground
docker-compose up -d               # Start in background

# Build and start
docker-compose up --build          # Rebuild images then start
docker-compose up -d --build       # Background build & start

# Stop and remove
docker-compose down                # Stop containers
docker-compose down -v             # Also remove volumes

# Service management
docker-compose restart             # Restart all services
docker-compose restart nextjs      # Restart specific service
docker-compose stop                # Stop (don't remove)
docker-compose start               # Start stopped containers

# Logs
docker-compose logs                # View all logs
docker-compose logs -f             # Follow logs
docker-compose logs nextjs         # Specific service
docker-compose logs -f --tail 50   # Last 50 lines

# Status
docker-compose ps                  # Show status
docker-compose ps -a               # All containers
```

## Services Overview

### 1. MySQL (Database)

```yaml
Service: mysql
Port: 3306
Image: mysql:8.0
Volume: mysql_data:/var/lib/mysql
```

**Credentials** (Development):
- Root Username: `root`
- Root Password: `rootpassword`
- Database: `wordpress`
- DB User: `wordpress`
- DB Password: `wordpress`

**Useful Commands**:

```bash
# Connect to MySQL
docker exec -it chhetrapal-mysql mysql -u root -prootpassword

# Backup database
docker exec chhetrapal-mysql mysqldump -u wordpress -pwordpress wordpress > backup.sql

# Import backup
docker exec -i chhetrapal-mysql mysql -u wordpress -pwordpress wordpress < backup.sql

# View size
docker exec chhetrapal-mysql du -sh /var/lib/mysql
```

### 2. WordPress (CMS Backend)

```yaml
Service: wordpress
Port: 8080:80
Dockerfile: Dockerfile.wordpress
Volume: wordpress_data:/var/www/html
Plugin Mount: ./wordpress-plugin/
```

**Pre-installed**:
- WordPress 6.7
- PHP 8.2
- MySQL extensions
- WP-CLI
- Apache with rewrite module
- Custom CMS plugin

**Access**:
- Website: `http://localhost:8080`
- Admin: `http://localhost:8080/wp-admin`
- REST API: `http://localhost:8080/wp-json`

**Useful Commands**:

```bash
# Connect to container
docker exec -it chhetrapal-wordpress bash

# WordPress CLI commands
docker exec chhetrapal-wordpress wp theme list --allow-root
docker exec chhetrapal-wordpress wp plugin list --allow-root
docker exec chhetrapal-wordpress wp plugin activate chhetrapal-school-cms --allow-root

# View Apache logs
docker exec chhetrapal-wordpress tail -f /var/log/apache2/error.log

# PHP info
docker exec chhetrapal-wordpress php -i

# Test database connection
docker exec chhetrapal-wordpress wp db check --allow-root
```

### 3. Next.js (Frontend)

```yaml
Service: nextjs
Port: 3000:3000
Dockerfile: Dockerfile.frontend
Volume: ./:/app (mounted for development)
Build: Multi-stage, optimized for production
```

**Features**:
- Live reloading in development
- Production-optimized build
- Non-root user execution
- Health checks
- TypeScript support

**Useful Commands**:

```bash
# Build check
docker exec chhetrapal-nextjs npm run build

# Lint check
docker exec chhetrapal-nextjs npm run lint

# Dependencies
docker exec chhetrapal-nextjs npm list

# View logs
docker logs -f chhetrapal-nextjs
```

### 4. Nginx (Reverse Proxy - Production Only)

```yaml
Service: nginx
Port: 80:80, 443:443
Image: nginx:alpine
Config: ./nginx.conf
Volumes: ./ssl/ for certificates
```

**Responsibilities**:
- Route requests to correct service
- SSL/HTTPS termination
- Static file caching
- Rate limiting
- Security headers

## Image Building

### Understanding Dockerfiles

#### Dockerfile.frontend (Next.js)

```dockerfile
# Multi-stage build for optimization
FROM node:20-alpine AS builder
# ... build stage with full dependencies

FROM node:20-alpine
# ... output with only production dependencies
```

**Why multi-stage?**
- Reduces final image size
- Faster deployments
- Better security (no build tools in production)

#### Dockerfile.wordpress (WordPress + PHP)

```dockerfile
FROM wordpress:6.7-php8.2-apache
# ... install extensions and plugins
```

**Includes**:
- WordPress core
- PHP 8.2
- Database extensions
- Apache server
- Custom plugin directory

### Building Images

```bash
# Build specific image
docker build -f Dockerfile.frontend -t chhetrapal-frontend:latest .

# Build with build args
docker build -f Dockerfile.frontend \
  --build-arg NODE_ENV=production \
  -t chhetrapal-frontend:1.0 .

# Build via docker-compose
docker-compose build
docker-compose build --no-cache
docker-compose build --no-cache nextjs

# Inspect image
docker inspect chhetrapal-frontend:latest
docker history chhetrapal-frontend:latest
```

### Image Optimization Tips

1. **Use Alpine Linux** (smaller base images)
2. **Multi-stage builds** (reduce final size)
3. **Minimize layers** (combine RUN commands)
4. **Use .dockerignore** (exclude unnecessary files)
5. **Non-root user** (security)

```bash
# Check image sizes
docker images --format "table {{.Repository}}\t{{.Size}}"

# View layers
docker history chhetrapal-frontend:latest
```

## Container Management

### Running Containers

```bash
# Background mode
docker-compose up -d

# Foreground mode (see logs)
docker-compose up

# With specific service
docker-compose up -d wordpress

# Using production config
docker-compose -f docker-compose.prod.yml up -d
```

### Stopping Containers

```bash
# Graceful stop (SIGTERM then SIGKILL)
docker-compose stop
docker-compose stop wordpress

# Force stop
docker-compose kill

# Remove after stopping
docker-compose down
docker-compose down -v  # Also remove volumes
```

### Restarting Services

```bash
# Restart all
docker-compose restart

# Restart specific
docker-compose restart wordpress

# Restart with rebuild
docker-compose up -d --build wordpress
```

### Resource Limits

```bash
# View resource usage
docker stats

# View specific container
docker stats chhetrapal-mysql

# Set memory limit in docker-compose.yml
nano docker-compose.yml
```

Example with limits:

```yaml
services:
  nextjs:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 1G
        reservations:
          cpus: '1'
          memory: 512M
```

## Networking

### Container Communication

All containers are in the same network (`chhetrapal-network`), so they can communicate via service name:

```yaml
wordpress:
  environment:
    WORDPRESS_DB_HOST: mysql  # Uses service name
    WORDPRESS_DB_PORT: 3306
```

### Host-to-Container Communication

Access from your machine:
- Frontend: `localhost:3000`
- WordPress: `localhost:8080`
- MySQL: `localhost:3306`

### Container-to-Host Communication

If containers need to reach services on your machine:

```bash
# Use special hostname
host.docker.internal
```

### Network Commands

```bash
# List networks
docker network ls

# Inspect network
docker network inspect chhetrapal-network

# Connect container to network
docker network connect network container

# Disconnect
docker network disconnect network container

# Create custom network
docker network create --driver bridge custom-network
```

## Volumes & Persistence

### Volume Types

**1. Named Volumes** (Recommended for data)

```yaml
volumes:
  mysql_data:
    driver: local
```

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect chhetrapal-mysql_mysql_data

# Backup volume
docker run -v mysql_data:/data -v $(pwd):/backup busybox tar czf /backup/backup.tar.gz /data

# Restore volume
docker run -v mysql_data:/data -v $(pwd):/backup busybox tar xzf /backup/backup.tar.gz -C /
```

**2. Bind Mounts** (For development code)

```yaml
volumes:
  - ./src:/app/src        # Source code
  - ./wordpress-plugin/:/var/www/html/wp-content/plugins/
```

**3. Tmpfs Mounts** (Temporary, in-memory)

```yaml
volumes:
  - type: tmpfs
    target: /tmp
```

### Common Volume Operations

```bash
# Create volume
docker volume create mysql_backup

# Remove volume
docker volume rm mysql_backup

# Remove unused volumes
docker volume prune

# Copy files from container to host
docker cp container:/path/file ./local/path

# Copy files from host to container
docker cp ./local/file container:/path/file

# Backup from volume
docker run -v mysql_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/backup.tar.gz /data
```

## Health Checks

All services have health checks configured:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Checking Health

```bash
# View health status
docker ps --format "table {{.Names}}\t{{.Status}}"

# Check specific container
docker inspect --format='{{.State.Health.Status}}' chhetrapal-nextjs

# View health logs
docker inspect chhetrapal-nextjs | grep -A 10 Health
```

### Manual Health Testing

```bash
# Test Next.js
curl http://localhost:3000

# Test WordPress
curl http://localhost:8080/wp-admin/admin-ajax.php?action=heartbeat

# Test MySQL
docker exec chhetrapal-mysql mysqladmin ping
```

## Debugging

### Viewing Logs

```bash
# All services
docker-compose logs

# Follow in real-time
docker-compose logs -f

# Specific service
docker-compose logs wordpress

# Last N lines
docker-compose logs --tail 100

# Timestamps
docker-compose logs -t

# Single container
docker logs container_name
docker logs -f container_name
```

### Interactive Shell Access

```bash
# Next.js container
docker exec -it chhetrapal-nextjs bash

# WordPress container
docker exec -it chhetrapal-wordpress bash

# MySQL container
docker exec -it chhetrapal-mysql bash

# Exit shell
exit
```

### Executing Commands

```bash
# Run command in running container
docker exec container_id command

# Run as specific user
docker exec -u www-data container_id whoami

# Example: Check file permissions
docker exec chhetrapal-wordpress ls -la /var/www/html

# Example: Install package
docker exec chhetrapal-nextjs npm install package-name
```

### Inspecting Containers

```bash
# Full container details
docker inspect container_name

# Specific fields
docker inspect -f '{{.State.Status}}' container_name
docker inspect -f '{{.HostConfig.Memory}}' container_name
docker inspect -f '{{json .Config.Env}}' container_name

# Formatted output
docker inspect --format='
  Name: {{.Name}}
  State: {{.State.Status}}
  IP: {{.NetworkSettings.IPAddress}}
' container_name
```

### Debugging Performance

```bash
# Real-time resource usage
docker stats

# Watch specific container
docker stats chhetrapal-nextjs

# View historical logs
docker logs --timestamps container_name

# Check swap usage
docker stats --no-stream | grep SWAP
```

## Best Practices

### 1. Development vs Production

**Development**:
- Use docker-compose.yml
- Mount source code for hot-reload
- Debug mode enabled
- Verbose logging

**Production**:
- Use docker-compose.prod.yml
- Copy files (no mounts)
- Minimized logging
- Resource limits set
- Health checks in place

### 2. Image Optimization

```dockerfile
# ❌ Bad: Large image
FROM ubuntu:20.04
RUN apt-get install nodejs

# ✅ Good: Optimized
FROM node:20-alpine
```

### 3. Security

```dockerfile
# ✅ Good: Non-root user
USER appuser

# ✅ Good: Minimal privileges
docker-compose exec -u www-data wordpress wp ...

# ❌ Bad: Root access
docker-compose exec wordpress wp ...
```

### 4. Data Management

```bash
# ✅ Good: Named volumes for data
volumes:
  - mysql_data:/var/lib/mysql

# ✅ Good: Regular backups
docker exec mysql mysqldump -u root -ppassword db > backup.sql

# ❌ Bad: No persistence
# Containers without volumes lose data on restart
```

### 5. Logging

```bash
# ✅ Good: Structured logs
docker-compose logs --format "json"

# ✅ Good: Log aggregation
# Point logs to centralized service (ELK, Splunk, etc.)

# ❌ Bad: Logging to files in container
# Logs are lost when container restarts
```

### 6. Monitoring

```bash
# ✅ Good: Health checks
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]

# ✅ Good: Resource limits
deploy:
  resources:
    limits:
      cpus: '2'
      memory: 1G

# ✅ Good: Regular monitoring
docker stats
docker-compose ps
```

---

**Last Updated**: May 2026
**For Latest Docker Docs**: [Docker Official Documentation](https://docs.docker.com)
