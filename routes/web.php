<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SurveyController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Routes pour l'enquête
Route::get('/', [SurveyController::class, 'create'])->name('survey.create');
Route::post('/enquete', [SurveyController::class, 'store'])->name('survey.store');

// Routes pour consulter les enquêtes (protégées par auth si nécessaire)
Route::get('/enquetes', [SurveyController::class, 'index'])->name('surveys.index');
Route::get('/enquetes/{id}', [SurveyController::class, 'show'])->name('surveys.show');

// Export CSV
Route::get('/enquetes/export/csv', [SurveyController::class, 'export'])->name('surveys.export');