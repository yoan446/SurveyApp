#!/bin/bash

# Démarrer PHP-FPM en arrière-plan
php-fpm -D

# Optimisations Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Migrations (optionnel - à activer avec précaution)
# php artisan migrate --force

# Démarrer Nginx au premier plan
nginx -g 'daemon off;'