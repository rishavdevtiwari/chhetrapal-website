#!/bin/bash

# Backup WordPress database and files

set -e

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="${1:-.}/backups"

mkdir -p "$BACKUP_DIR"

echo "Creating backup: $TIMESTAMP"

# Backup database
echo "Backing up database..."
docker exec chhetrapal-mysql mysqldump \
    -u wordpress \
    -pwordpress \
    wordpress | gzip > "$BACKUP_DIR/wordpress-db-$TIMESTAMP.sql.gz"

# Backup WordPress files
echo "Backing up WordPress files..."
docker exec chhetrapal-wordpress tar -czf /tmp/wordpress-files.tar.gz /var/www/html
docker cp chhetrapal-wordpress:/tmp/wordpress-files.tar.gz "$BACKUP_DIR/wordpress-files-$TIMESTAMP.tar.gz"

echo "Backup complete!"
echo "  Database:  $BACKUP_DIR/wordpress-db-$TIMESTAMP.sql.gz"
echo "  Files:     $BACKUP_DIR/wordpress-files-$TIMESTAMP.tar.gz"
echo ""
echo "To restore:"
echo "  gunzip < $BACKUP_DIR/wordpress-db-$TIMESTAMP.sql.gz | docker exec -i chhetrapal-mysql mysql -u wordpress -pwordpress wordpress"
