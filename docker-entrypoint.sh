#!/bin/bash

# Récupérer le port de Railway ou utiliser 80 par défaut
PORT=${PORT:-80}

echo "🚀 Starting application on port $PORT"

# Remplacer le port dans la configuration Nginx
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/sites-available/default

# Vérifier la configuration Nginx
nginx -t

if [ $? -ne 0 ]; then
    echo "❌ Nginx configuration test failed"
    exit 1
fi

# Démarrer PHP-FPM en arrière-plan
php-fpm -D

# Attendre que PHP-FPM démarre
sleep 2

# Optimisations Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Migrations (décommentez si nécessaire)
# php artisan migrate --force

echo "✅ PHP-FPM started, launching Nginx..."

# Démarrer Nginx au premier plan
nginx -g 'daemon off;'