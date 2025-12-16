#!/bin/bash
set -e

PORT=${PORT:-80}

echo "🚀 Starting application on port $PORT"

# Configuration Nginx
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/sites-available/default
nginx -t

# Démarrer PHP-FPM
php-fpm -D
sleep 3

# FORCER Laravel à accepter les commandes sans prompt
export APP_ENV=production
export APP_DEBUG=false

# Désactiver complètement l'interactivité
stty -echo 2>/dev/null || true

echo "⚡ Optimizing Laravel..."

# Méthode 1 : Pipe "yes" dans toutes les commandes
(echo "yes" | php artisan config:cache) 2>&1 || true
(echo "yes" | php artisan route:cache) 2>&1 || true
(echo "yes" | php artisan view:cache) 2>&1 || true

echo "🗄️  Running migrations..."
(echo "yes" | php artisan migrate --force) 2>&1 || true

echo "🌐 Starting Nginx..."
exec nginx -g 'daemon off;'