<?php

use App\Http\Controllers\Frontend\AttendanceController;
use App\Http\Controllers\Frontend\AuthController;
use App\Http\Controllers\Frontend\DashboardController;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/backoffice/web.php';

Route::middleware(['guest'])->group(function () {
  Route::get('/login', [AuthController::class, 'login'])->name('login');
  Route::post('/login', [AuthController::class, 'store'])->name('login.store');
});

Route::middleware(['auth'])->group(function () {
  Route::post('/logout', [AuthController::class, 'logout'])->name('logout.store');
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
  Route::get('/attendance/clockin', [AttendanceController::class, 'clock_in'])->name('attendance.in');
  Route::post('/attendance/clockin', [AttendanceController::class, 'clock_in_store'])->name('attendance.in.store');
  Route::get('/attendance/clockout', [AttendanceController::class, 'clock_out'])->name('attendance.out');
  Route::post('/attendance/clockout', [AttendanceController::class, 'clock_out_store'])->name('attendance.out.store');
});
