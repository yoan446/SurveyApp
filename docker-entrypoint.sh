#!/bin/bash
# Ne pas utiliser set -e pour permettre la gestion d'erreurs personnalisée
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

# Test Nginx configuration
echo "✅ Testing Nginx configuration..."
if ! nginx -t; then
    echo "❌ Nginx config failed!"
    exit 1
fi

# Démarrer PHP-FPM en arrière-plan
echo "🔧 Starting PHP-FPM..."
php-fpm -D

# Attendre que PHP-FPM démarre
echo "⏳ Waiting for PHP-FPM to start..."
sleep 3

# Vérifier que PHP-FPM fonctionne
if ! pgrep -f php-fpm > /dev/null; then
    echo "⚠️  PHP-FPM might not be running, but continuing..."
fi

# Vérifier la connexion à la base de données avant les migrations
echo "🔍 Checking database connection..."
DB_CHECK_ATTEMPTS=0
MAX_DB_CHECK_ATTEMPTS=10
DB_READY=0

# Tester la connexion en essayant d'exécuter une commande simple qui nécessite la DB
while [ $DB_CHECK_ATTEMPTS -lt $MAX_DB_CHECK_ATTEMPTS ]; do
    # Utiliser une commande qui teste vraiment la connexion DB
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
    php artisan migrate --force 2>&1 || echo "⚠️  Migration failed or already up to date"
else
    echo "⚠️  Database not available after $MAX_DB_CHECK_ATTEMPTS attempts, skipping migrations"
    echo "ℹ️  Migrations can be run manually later when database is available"
fi

# Laravel optimizations - Gestion d'erreur robuste
echo "⚡ Optimizing Laravel..."

# Vider les caches existants d'abord pour éviter les conflits
php artisan config:clear 2>/dev/null || true
php artisan route:clear 2>/dev/null || true
php artisan view:clear 2>/dev/null || true

# Créer les caches (continue même si ça échoue)
echo "📦 Caching configuration..."
php artisan config:cache 2>&1 || echo "⚠️  Config cache failed, continuing..."

echo "📦 Caching routes..."
php artisan route:cache 2>&1 || echo "⚠️  Route cache failed, continuing..."

echo "📦 Caching views..."
php artisan view:cache 2>&1 || echo "⚠️  View cache failed, continuing..."

# Créer le lien symbolique pour le storage
echo "🔗 Creating storage link..."
php artisan storage:link 2>/dev/null || echo "ℹ️  Storage link already exists or failed"

# S'assurer que les permissions sont correctes
echo "🔒 Setting permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true

echo "=========================================="
echo "🌐 Starting Nginx on port $PORT..."
echo "✅ Application is ready!"
echo "=========================================="

# Démarrer Nginx au premier plan (c'est le processus principal qui doit tourner)
# Cette commande ne doit JAMAIS échouer pour que le conteneur reste en vie
exec nginx -g 'daemon off;'