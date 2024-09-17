<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopController;

Route::get('/', [ShopController::class, 'home']);
Route::post('/cart/{id}', [ShopController::class, 'addcart']);
Route::get('/cart', [ShopController::class, 'cart']);
Route::post('/order', [ShopController::class, 'order']);