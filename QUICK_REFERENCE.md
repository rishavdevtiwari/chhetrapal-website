# Quick Reference Guide

## Getting Started (5 min)

```bash
# 1. Start development environment
docker-compose up --build

# 2. Open in browser
# Frontend:       http://localhost:3000
# WordPress Admin: http://localhost:8080/wp-admin
# Credentials:    admin / admin123
```

## Local Development Commands

```bash
# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Restart specific service
docker-compose restart nextjs

# Access container shell
docker exec -it chhetrapal-wordpress bash
docker exec -it chhetrapal-nextjs bash
docker exec -it chhetrapal-mysql bash
```

## Production Deployment

```bash
# 1. Update .env with production values
cp .env.production .env
nano .env

# 2. Ensure SSL certificates are in place
# ssl/cert.pem
# ssl/key.pem

# 3. Run deployment
chmod +x deploy.sh
./deploy.sh

# 4. Or manually
docker-compose -f docker-compose.prod.yml up -d --build
```

## Database Operations

```bash
# Backup database
./backup.sh

# Restore database
gunzip < backups/wordpress-db-*.sql.gz | \
  docker exec -i chhetrapal-mysql mysql -u wordpress -pwordpress wordpress

# Access MySQL
docker exec -it chhetrapal-mysql mysql -u wordpress -pwordpress wordpress
```

## Troubleshooting

```bash
# Check service status
docker-compose ps

# View resource usage
docker stats

# Force restart service
docker-compose restart wordpress

# Rebuild from scratch
docker-compose down -v
docker-compose up --build

# View detailed logs
docker-compose logs -f [service-name]
```

## WordPress CMS

```bash
# List plugins
docker exec chhetrapal-wordpress wp plugin list --allow-root

# Activate plugin
docker exec chhetrapal-wordpress wp plugin activate chhetrapal-school-cms --allow-root

# Check database
docker exec chhetrapal-wordpress wp db check --allow-root

# Export content (for backup)
docker exec chhetrapal-wordpress wp export --allow-root > export.xml
```

## Important Files

| File | Purpose |
|------|---------|
| docker-compose.yml | Development setup |
| docker-compose.prod.yml | Production setup |
| Dockerfile.frontend | Next.js container |
| Dockerfile.wordpress | WordPress container |
| nginx.conf | Reverse proxy config |
| .env | Environment variables |
| .env.production | Production template |

## Security Checklist

- [ ] Change MySQL passwords from defaults
- [ ] Update WordPress admin credentials
- [ ] Set CHHETRAPAL_INTERNAL_TOKEN to secure value
- [ ] Configure SSL certificates
- [ ] Update nginx.conf server_name
- [ ] Enable WordPress security plugins
- [ ] Configure WP backup plugin
- [ ] Set up SSH keys for server access
- [ ] Enable 2FA for WordPress admin

## Monitoring

```bash
# Real-time monitoring
watch docker-compose ps

# Check disk usage
docker system df

# View container events
docker events --filter type=container

# SSL certificate expiry
openssl x509 -in ssl/cert.pem -text -noout | grep -E "Not Before|Not After"
```

## Useful Links

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [SETUP.md](SETUP.md) - Local development setup
- [DOCKER_GUIDE.md](DOCKER_GUIDE.md) - Docker reference
- [Docker Docs](https://docs.docker.com)
- [Next.js Docs](https://nextjs.org/docs)
- [WordPress Docs](https://wordpress.org/support/)

---

**Quick Tip**: Save this file as a bookmark for quick reference!
