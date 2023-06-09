<?php

use App\Http\Controllers\PlannerMissionController;
use App\Http\Controllers\SwarmController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

Route::resource('users', UserController::class)->middleware('auth:sanctum');
Route::resource('swarms', SwarmController::class)->middleware('auth:sanctum');
Route::resource('planner-missions', PlannerMissionController::class)->middleware('auth:sanctum');

require_once __DIR__ . '/auth.php';
