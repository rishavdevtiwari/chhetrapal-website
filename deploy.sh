#!/bin/bash

# Chhetrapal School Website - Production Deployment Script
# This script automates Docker setup and deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Chhetrapal School Website Deployment${NC}"
echo -e "${GREEN}=====================================${NC}\n"

# Check prerequisites
echo -e "${YELLOW}[1/6] Checking prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}\n"

# Validate environment
echo -e "${YELLOW}[2/6] Checking environment configuration...${NC}"

if [ ! -f ".env" ]; then
    if [ ! -f ".env.production" ]; then
        echo -e "${RED}Error: .env or .env.production not found!${NC}"
        echo "Please copy .env.example to .env or .env.production and configure it."
        exit 1
    fi
    cp .env.production .env
    echo -e "${YELLOW}Created .env from .env.production${NC}"
fi

# Check critical environment variables
source .env
if [ -z "$MYSQL_PASSWORD" ] || [ -z "$WORDPRESS_DB_NAME" ]; then
    echo -e "${RED}Error: Critical environment variables not set in .env${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Environment configuration is valid${NC}\n"

# Create necessary directories
echo -e "${YELLOW}[3/6] Creating necessary directories...${NC}"

mkdir -p "ssl"
mkdir -p "backups"

echo -e "${GREEN}✓ Directories created${NC}\n"

# Check SSL certificates
echo -e "${YELLOW}[4/6] Checking SSL certificates...${NC}"

if [ ! -f "ssl/cert.pem" ] || [ ! -f "ssl/key.pem" ]; then
    echo -e "${YELLOW}SSL certificates not found!${NC}"
    echo "Please place your SSL certificates at:"
    echo "  - ssl/cert.pem"
    echo "  - ssl/key.pem"
    echo ""
    echo "For Let's Encrypt:"
    echo "  sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./ssl/cert.pem"
    echo "  sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./ssl/key.pem"
    read -p "Press Enter once certificates are in place..."
fi

if [ -f "ssl/cert.pem" ] && [ -f "ssl/key.pem" ]; then
    echo -e "${GREEN}✓ SSL certificates found${NC}\n"
else
    echo -e "${RED}Error: SSL certificates still not found${NC}"
    exit 1
fi

# Build and start services
echo -e "${YELLOW}[5/6] Building and starting Docker containers...${NC}"

docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

echo -e "${GREEN}✓ Docker containers are running${NC}\n"

# Initialize WordPress (first time only)
echo -e "${YELLOW}[6/6] Checking WordPress installation...${NC}"

sleep 10  # Wait for services to be ready

# Check if WordPress is already set up
if docker exec chhetrapal-wordpress-prod wp core is-installed --allow-root 2>/dev/null; then
    echo -e "${GREEN}✓ WordPress is already installed${NC}\n"
else
    echo -e "${YELLOW}Installing WordPress...${NC}"
    
    read -p "Enter WordPress admin username [admin]: " WP_ADMIN_USER
    WP_ADMIN_USER=${WP_ADMIN_USER:-admin}
    
    read -sp "Enter WordPress admin password: " WP_ADMIN_PASSWORD
    echo ""
    
    read -p "Enter WordPress admin email: " WP_ADMIN_EMAIL
    
    WORDPRESS_URL=${NEXT_PUBLIC_WORDPRESS_ORIGIN:-https://yourdomain.com}
    read -p "Enter WordPress URL [$WORDPRESS_URL]: " INPUT_URL
    WORDPRESS_URL=${INPUT_URL:-$WORDPRESS_URL}
    
    docker exec chhetrapal-wordpress-prod wp core install \
        --url="$WORDPRESS_URL" \
        --title="Chhetrapal School" \
        --admin_user="$WP_ADMIN_USER" \
        --admin_password="$WP_ADMIN_PASSWORD" \
        --admin_email="$WP_ADMIN_EMAIL" \
        --allow-root
    
    # Activate the custom plugin
    docker exec chhetrapal-wordpress-prod wp plugin activate chhetrapal-school-cms --allow-root 2>/dev/null || true
    
    echo -e "${GREEN}✓ WordPress installation complete${NC}\n"
fi

# Final status
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}=====================================${NC}\n"

echo "Services are running:"
echo "  Frontend:  $NEXT_PUBLIC_WORDPRESS_ORIGIN"
echo "  WordPress: $NEXT_PUBLIC_WORDPRESS_ORIGIN/wp-admin"
echo "  API:       $NEXT_PUBLIC_WORDPRESS_ORIGIN/wp-json"
echo ""
echo "View logs:"
echo "  docker-compose -f docker-compose.prod.yml logs -f"
echo ""
echo "Stop services:"
echo "  docker-compose -f docker-compose.prod.yml down"
echo ""
