#!/bin/bash
set -e

PORT=${PORT:-80}

echo "=========================================="
echo "🚀 Starting Laravel application"
echo "Port: $PORT"
echo "Environment: $APP_ENV"
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

# Laravel optimizations - MODE NON-INTERACTIF
echo "⚡ Optimizing Laravel (non-interactive mode)..."

# Option 1 : Utiliser --force et --no-interaction
php artisan config:cache --no-interaction
php artisan route:cache --no-interaction
php artisan view:cache --no-interaction

# Migrations avec --force (skip confirmation en production)
echo "🗄️  Running database migrations..."
php artisan migrate --force --no-interaction

# Alternative : Désactiver la détection de production temporairement
# APP_ENV=local php artisan config:cache
# APP_ENV=local php artisan route:cache
# APP_ENV=local php artisan view:cache

echo "=========================================="
echo "🌐 Starting Nginx on port $PORT..."
echo "✅ Application is ready!"
echo "=========================================="

# Démarrer Nginx au premier plan
exec nginx -g 'daemon off;'