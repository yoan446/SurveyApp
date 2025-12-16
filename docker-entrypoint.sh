#!/bin/bash
set -e

PORT=${PORT:-80}

echo "=========================================="
echo "🚀 Starting Laravel application"
echo "Port: $PORT"
echo "Environment: ${APP_ENV:-production}"
echo "=========================================="

# Configuration Nginx dynamique
echo "📝 Configuring Nginx for port $PORT..."
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/sites-available/default

# Test Nginx configuration
echo "✅ Testing Nginx configuration..."
nginx -t || (echo "❌ Nginx config failed!" && exit 1)

# Démarrer PHP-FPM en arrière-plan
echo "🔧 Starting PHP-FPM..."
php-fpm -D

# Attendre que PHP-FPM démarre
sleep 3

# Vérifier la connexion à la base de données
echo "🔍 Checking database connection..."
DB_CHECK_ATTEMPTS=0
MAX_DB_CHECK_ATTEMPTS=10

while [ $DB_CHECK_ATTEMPTS -lt $MAX_DB_CHECK_ATTEMPTS ]; do
    if php artisan migrate:status --no-interaction > /dev/null 2>&1; then
        echo "✅ Database connection successful"
        break
    fi
    DB_CHECK_ATTEMPTS=$((DB_CHECK_ATTEMPTS + 1))
    echo "⏳ Waiting for database... (attempt $DB_CHECK_ATTEMPTS/$MAX_DB_CHECK_ATTEMPTS)"
    sleep 2
done

# Laravel optimizations - FORCER le mode non-interactif
echo "⚡ Optimizing Laravel (forced non-interactive mode)..."

# Vider les caches existants
php artisan config:clear --no-interaction 2>/dev/null || true
php artisan route:clear --no-interaction 2>/dev/null || true
php artisan view:clear --no-interaction 2>/dev/null || true
php artisan cache:clear --no-interaction 2>/dev/null || true

# Créer les caches avec --no-interaction et en forçant yes
echo "📦 Caching configuration..."
yes | php artisan config:cache 2>&1 || echo "⚠️  Config cache completed with warnings"

echo "📦 Caching routes..."
yes | php artisan route:cache 2>&1 || echo "⚠️  Route cache completed with warnings"

echo "📦 Caching views..."
yes | php artisan view:cache 2>&1 || echo "⚠️  View cache completed with warnings"

# Migrations avec force et non-interactive
echo "🗄️  Running database migrations..."
yes | php artisan migrate --force 2>&1 || echo "⚠️  Migrations completed or skipped"

# Créer le lien symbolique pour le storage
echo "🔗 Creating storage link..."
php artisan storage:link --no-interaction 2>/dev/null || echo "ℹ️  Storage link already exists"

# Permissions
echo "🔒 Setting permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true

echo "=========================================="
echo "🌐 Starting Nginx on port $PORT..."
echo "✅ Application is ready!"
echo "=========================================="

# Démarrer Nginx au premier plan
exec nginx -g 'daemon off;'