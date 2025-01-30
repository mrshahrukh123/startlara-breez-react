<?php

use App\Http\Controllers\Admin\AccountTypeController;
use App\Http\Controllers\Admin\RolePermissionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProfileController;
use App\Models\AccountType;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::middleware(['can:list-account-type'])->group(function () {
        Route::get('/account-types/list', [AccountTypeController::class, 'list'])->name('account-types.list');
        Route::resource('/account-types', AccountTypeController::class);
    });

    Route::middleware(['can:list-role'])->group(function () {
        Route::get('/role-permissions/list', [RolePermissionController::class, 'list'])->name('role-permissions.list');
        Route::resource('/role-permissions', RolePermissionController::class);
    });

    Route::middleware(['can:list-user'])->group(function () {
        Route::get('/users/list', [UserController::class, 'list'])->name('users.list');
        Route::resource('/users', UserController::class);
    });
});

require __DIR__ . '/auth.php';
