<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\PostController;

Route::get('/users', [UserController::class, 'index']);

Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/settings', [UserController::class, 'getSettings'])->middleware('auth:sanctum');
Route::post('/add/preferences', [UserController::class, 'createPreference'])->middleware('auth:sanctum');
Route::get('/user', [UserController::class, 'getUser'])->middleware('auth:sanctum');
Route::post('/change/password', [UserController::class, 'changePassword'])->middleware('auth:sanctum');

Route::get('/communities', [CommunityController::class, 'index'])->middleware('auth:sanctum');
Route::post('/join', [CommunityController::class, 'join'])->middleware('auth:sanctum');

Route::get('/is-user-in-group', [CommunityController::class, 'isUserInGroup'])->middleware('auth:sanctum');

Route::post('/message', [MessageController::class, 'store'])->middleware('auth:sanctum');
Route::get('/messages/{community_id}', [MessageController::class, 'index'])->middleware('auth:sanctum');

Route::post('/posts', [PostController::class, 'feedstore'])->middleware('auth:sanctum');
Route::get('/posts', [PostController::class, 'index'])->middleware('auth:sanctum');

