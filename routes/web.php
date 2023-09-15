<?php

use App\Http\Controllers\Front\LandingController;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/backoffice/web.php';

/**
 * LANDING PAGE
 * route: /
 * name: landing
 */
Route::get('/', [LandingController::class, 'index'])->name('landing');
