<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']);

Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/settings', [UserController::class, 'getSettings'])->middleware('auth:sanctum');
Route::post('/add/preferences', [UserController::class, 'createPreference'])->middleware('auth:sanctum');
Route::get('/user', [UserController::class, 'getUser'])->middleware('auth:sanctum');
Route::post('/change/password', [UserController::class, 'changePassword'])->middleware('auth:sanctum');
