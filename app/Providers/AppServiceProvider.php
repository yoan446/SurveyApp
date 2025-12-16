<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL; // N'oubliez pas d'importer la façade URL

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Force le schéma HTTPS si l'application n'est pas en local
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }

    // ... reste de la classe ...
}
