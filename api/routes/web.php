<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShopController;


/**
 * Shop Routes
 *
 * These routes handle the shop functionality,
 * including displaying products, managing the cart,
 * and processing orders.
 */
Route::get('/', [ShopController::class, 'home']);
Route::post('/cart/{id}', [ShopController::class, 'addcart']);
Route::get('/cart', [ShopController::class, 'cart']);
Route::post('/order', [ShopController::class, 'order']);