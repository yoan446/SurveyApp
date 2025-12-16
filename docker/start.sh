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
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear

# Démarrer Nginx
nginx -g 'daemon off;'