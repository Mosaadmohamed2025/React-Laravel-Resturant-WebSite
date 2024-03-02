<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\SectionController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\ResturantController;
use App\Http\Controllers\Dashboard\EmployeeController;
use App\Http\Controllers\Dashboard\OrderController;
use App\Http\Controllers\Dashboard\AdminController;
use App\Http\Controllers\Dashboard\RoleController;





Route::get('/dashboard/admin', [DashboardController::class, 'index'])->middleware(['auth:admin'])->name('dashboard.admin');



Route::middleware(['auth:admin'])->group(function () {

    Route::resource('Sections', SectionController::class);

    Route::resource('Products', ProductController::class);

    Route::resource('Resturants', ResturantController::class);
    
    Route::resource('Employees', EmployeeController::class);
    
    Route::resource('Orders', OrderController::class);
    Route::post('Update_Status', [OrderController::class, 'Update_Status'])->name('Update_Status');
    Route::get('Paid_Order', [OrderController::class, 'Paid_Order'])->name('Paid_Order');
    Route::get('UnPaid_Order', [OrderController::class, 'UnPaid_Order'])->name('UnPaid_Order');

    Route::get('/OrderDetails/{id}', [OrderController::class , 'edit']);
    
    Route::get('MarkAsRead_all', [OrderController::class , 'MarkAsRead_all'])->name('MarkAsRead_all');

});




Route::group(['middleware' => ['auth:admin']], function() {
    Route::resource('roles',RoleController::class);
    Route::resource('users',AdminController::class);
});








// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
