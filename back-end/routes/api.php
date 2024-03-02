<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CheckoutController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('register' , [AuthController::class, 'register']);

Route::post('login' , [AuthController::class, 'login']);

Route::get('getProducts' , [FrontendController::class , 'getProducts']);


Route::get('ProductDetails/{id}' , [FrontendController::class , 'getProductDetails']);

Route::get('resturantsLocations' , [FrontendController::class , 'getResturantLocations']);






Route::middleware('auth:sanctum')->group(function(){
    Route::get('orders' , [FrontendController::class , 'getOrders']);
    Route::post('place-order', [CheckoutController::class, 'placeorder']);
    Route::post('makePayment', [CheckoutController::class, 'makePayment']);
    Route::post('logout' , [AuthController::class, 'logout']);
    Route::post('profile' , [FrontendController::class, 'updateProfile']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
