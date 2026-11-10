<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TemplateController;

// ==========================================
// RUTE PUBLIK (Tidak butuh login)
// ==========================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rute untuk User melihat template & kategori
Route::get('/templates', [TemplateController::class, 'index']);
Route::get('/templates/categories', [TemplateController::class, 'categories']);


// ==========================================
// RUTE TERPROTEKSI (Butuh Token Sanctum)
// ==========================================
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth & User
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Creator (Upload Template)
    Route::post('/creator/templates', [TemplateController::class, 'store']);

    // Admin (Verifikasi Template)
    Route::get('/admin/templates/pending', [TemplateController::class, 'pendingTemplates']);
    Route::post('/admin/templates/{id}/approve', [TemplateController::class, 'approve']);
});