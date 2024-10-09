<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\CommunityController;

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

Route::post('/input', [HomeController::class, 'input'])->middleware('auth:sanctum');
Route::get('/input', [HomeController::class, 'retrieval'])->middleware('auth:sanctum');
Route::get('/limit', [HomeController::class, 'checkLimit'])->middleware('auth:sanctum');
Route::get('/lastweek', [HomeController::class, 'getLastWeek'])->middleware('auth:sanctum');

Route::post('/follow', [UserController::class, 'follow'])->middleware('auth:sanctum');
Route::post('/unfollow', [UserController::class, 'unfollow'])->middleware('auth:sanctum');
Route::get('/followers', [UserController::class, 'getFollowers'])->middleware('auth:sanctum');
Route::get('/following', [UserController::class, 'getFollowing'])->middleware('auth:sanctum');
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::get('/facts', [UserController::class, 'getFacts'])->middleware('auth:sanctum');

Route::post('/like', [PostController::class, 'likePost'])->middleware('auth:sanctum');
