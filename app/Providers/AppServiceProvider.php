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
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
    }

    // ... reste de la classe ...
}
