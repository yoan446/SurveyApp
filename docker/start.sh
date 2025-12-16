#!/bin/bash

# Démarrer PHP-FPM en arrière-plan
php-fpm -D

# Attendre que la base de données soit prête
echo "Attente de la base de données..."
until php artisan migrate --force 2>/dev/null; do
  echo "La base de données n'est pas encore prête - attente..."
  sleep 2
done

echo "Base de données prête, migrations effectuées"

# Optimisations Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Démarrer Nginx
nginx -g 'daemon off;'