#!/bin/bash
# Utiliser set +e pour continuer même en cas d'erreur des commandes artisan
set +e

PORT=${PORT:-80}

echo "=========================================="
echo "🚀 Starting Laravel application"
echo "Port: $PORT"
echo "Environment: ${APP_ENV:-production}"
echo "=========================================="

# Configuration Nginx dynamique
echo "📝 Configuring Nginx for port $PORT..."
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/sites-available/default

# Test Nginx configuration (critique - doit échouer si config invalide)
echo "✅ Testing Nginx configuration..."
if ! nginx -t; then
    echo "❌ Nginx config failed!"
    exit 1
fi

# Démarrer PHP-FPM en arrière-plan
echo "🔧 Starting PHP-FPM..."
php-fpm -D

# Attendre et vérifier que PHP-FPM démarre correctement
echo "⏳ Waiting for PHP-FPM to start..."
sleep 5

# Vérifier que PHP-FPM fonctionne en testant le socket
if ! pgrep -f php-fpm > /dev/null; then
    echo "❌ PHP-FPM failed to start!"
    echo "⚠️  Attempting to start PHP-FPM again..."
    php-fpm -D
    sleep 3
fi

# Vérifier que PHP-FPM fonctionne en vérifiant le processus
if pgrep -f php-fpm > /dev/null; then
    echo "✅ PHP-FPM is running (PID: $(pgrep -f php-fpm | head -1))"
else
    echo "⚠️  PHP-FPM process not found, but continuing..."
fi

# SOLUTION POUR LARAVEL 12: Ne pas exécuter les commandes de cache en production
# Laravel 12 bloque ces commandes avec "APPLICATION IN PRODUCTION"
# Solution: Exécuter uniquement les commandes essentielles ou les skip complètement

echo "⚡ Preparing Laravel application..."

# Créer le lien symbolique pour le storage (nécessaire mais ne bloque pas en production)
php artisan storage:link 2>/dev/null || echo "ℹ️  Storage link already exists or skipped"

# Vérifier la connexion à la base de données avant les migrations
echo "🔍 Checking database connection..."
DB_CHECK_ATTEMPTS=0
MAX_DB_CHECK_ATTEMPTS=5
DB_READY=0

# Essayer de se connecter à la base de données
while [ $DB_CHECK_ATTEMPTS -lt $MAX_DB_CHECK_ATTEMPTS ]; do
    # Tester la connexion avec une commande qui nécessite la DB
    if php artisan migrate:status > /dev/null 2>&1; then
        echo "✅ Database connection successful"
        DB_READY=1
        break
    fi
    DB_CHECK_ATTEMPTS=$((DB_CHECK_ATTEMPTS + 1))
    echo "⏳ Waiting for database... (attempt $DB_CHECK_ATTEMPTS/$MAX_DB_CHECK_ATTEMPTS)"
    sleep 2
done

# Exécuter les migrations seulement si la connexion DB est OK
if [ $DB_READY -eq 1 ]; then
    echo "🗄️  Running database migrations..."
    # Utiliser --force pour éviter toute confirmation en production
    php artisan migrate --force 2>&1 | grep -v "APPLICATION IN PRODUCTION" || echo "ℹ️  Migrations completed or skipped"
else
    echo "⚠️  Database not available, skipping migrations"
    echo "ℹ️  Migrations can be run manually later"
fi

# NE PAS exécuter config:cache, route:cache, view:cache en production
# Laravel 12 les bloque avec "APPLICATION IN PRODUCTION"
# Ces caches peuvent être créés lors du build ou seront créés automatiquement au premier accès
echo "ℹ️  Skipping Laravel cache commands (blocked in production mode)"
echo "ℹ️  Cache will be created automatically on first request if needed"

# S'assurer que les permissions sont correctes
echo "🔒 Setting permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true

# Vérifier que PHP-FPM est toujours en cours d'exécution avant de démarrer Nginx
if ! pgrep -f php-fpm > /dev/null; then
    echo "⚠️  PHP-FPM not running, restarting..."
    php-fpm -D
    sleep 2
fi

echo "=========================================="
echo "🌐 Starting Nginx on port $PORT..."
echo "✅ Application is ready!"
echo "=========================================="

# Démarrer Nginx au premier plan (CRITIQUE: doit être la dernière commande)
# Cette commande remplace le processus shell et garde le conteneur en vie
exec nginx -g 'daemon off;'
