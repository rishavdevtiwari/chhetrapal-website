#!/bin/bash

# Quick development setup script

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Starting Chhetrapal School Website Development Setup${NC}\n"

# Check Docker
echo -e "${YELLOW}Checking Docker installation...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker not found. Please install Docker Desktop.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker is installed${NC}\n"

# Start services
echo -e "${YELLOW}Starting Docker services...${NC}"
docker-compose up --build -d

# Wait for services
echo -e "${YELLOW}Waiting for services to be ready...${NC}"
sleep 15

# Check if WordPress is installed
if ! docker exec chhetrapal-wordpress wp core is-installed --allow-root 2>/dev/null; then
    echo -e "${YELLOW}Installing WordPress...${NC}"
    docker exec chhetrapal-wordpress wp core install \
        --url=http://localhost:8080 \
        --title="Chhetrapal School" \
        --admin_user=admin \
        --admin_password=admin123 \
        --admin_email=admin@example.com \
        --allow-root
    
    docker exec chhetrapal-wordpress wp plugin activate chhetrapal-school-cms --allow-root 2>/dev/null || true
fi

echo -e "${GREEN}✓ WordPress setup complete${NC}\n"

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Development Environment Ready!${NC}"
echo -e "${GREEN}=====================================${NC}\n"

echo "Access your dev environment:"
echo "  Frontend:       http://localhost:3000"
echo "  WordPress Admin: http://localhost:8080/wp-admin"
echo "  Database:       localhost:3306"
echo ""
echo "Credentials (development):"
echo "  WordPress User: admin"
echo "  WordPress Pass: admin123"
echo "  DB User:        wordpress"
echo "  DB Pass:        wordpress"
echo ""
echo "View logs:"
echo "  docker-compose logs -f"
echo ""
echo "Stop services:"
echo "  docker-compose down"
echo ""
