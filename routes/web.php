<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('TopLayout', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('top.layout');

//terms
Route::get('/policy/terms', function () {
    return Inertia::render('Policies/Terms');
})->name('terms');

Route::get('/policy/privacy', function () {
    return Inertia::render('Policies/PrivacyPolicy');
})->name('privacy.policy');


//create
Route::get('/top', function () {
    return Inertia::render('Top');
})->middleware(['auth', 'verified'])->name('top');

Route::get('/create/title', function () {
    return Inertia::render('Create/Title');
})->middleware(['auth', 'verified'])->name('title');

Route::middleware('auth')->group(function(){
Route::post('/create/title/save', [App\Http\Controllers\UserController::class, 'title_save'])
->name('create.title');

Route::post('/create/work/save/{workbook_id}', [App\Http\Controllers\UserController::class, 'work_save'])
->name('create.work');

Route::post('/create/work/save/complete/{workbook_id}', [App\Http\Controllers\UserController::class, 'work_complete'])
->name('complete');


Route::get('/workbook/list', [App\Http\Controllers\UserController::class, 'workbook_display'])
->name('workbook.display');

Route::get('/workbook/list/{workbook_id}', [App\Http\Controllers\UserController::class, 'work_display'])
->name('work.display');

Route::get('/work/list/edit/{id}', [App\Http\Controllers\UserController::class, 'work_edit'])
->name('work.edit');

Route::post('/work/list/update/{id}', [App\Http\Controllers\UserController::class, 'work_update'])
->name('work.update');
});

Route::get('/work/list/update/add/{workbook_id}', function ($workbook_id) {
    return Inertia::render('Create/WorkAdd', [
        'workbook_id'=> $workbook_id,
        ]
    );
})->middleware(['auth', 'verified'])->name('work.addmake');

Route::middleware('auth')->group(function(){
Route::post('/create/work/add/{workbook_id}', [App\Http\Controllers\UserController::class, 'work_add'])
->name('work.add');

Route::get('/work/list/delete/{id}', [App\Http\Controllers\UserController::class, 'work_delete'])
->name('work.delete');

Route::get('/workbook/list/edit/{workbook_id}', [App\Http\Controllers\UserController::class, 'workbook_edit'])
->name('workbook.edit');

Route::post('/workbook/list/update/{workbook_id}', [App\Http\Controllers\UserController::class, 'workbook_update'])
->name('workbook.update');

Route::get('/workbook/list/delete/{workbook_id}', [App\Http\Controllers\UserController::class, 'workbook_delete'])
->name('workbook.delete');

//analyse
Route::get('/workbook/analyse/list', [App\Http\Controllers\UserController::class, 'workbook_analyse_display'])
->name('workbook.analyse_display');

Route::get('/workbook/analyse/{workbook_id}', [App\Http\Controllers\UserController::class, 'workbook_analysis'])
->name('workbook.analysis');

//solve
Route::get('/workbook/solve/select', [App\Http\Controllers\UserController::class, 'workbook_select'])
->name('workbook.select');

Route::get('/workbook/solve/start/{workbook_id}', [App\Http\Controllers\UserController::class, 'workbook_start'])
->name('workbook.start');

Route::post('/workbook/solve/result/{workbook_id}', [App\Http\Controllers\UserController::class, 'workbook_result'])
->name('workbook.result');


//public
Route::get('/workbook/public', [App\Http\Controllers\PublicController::class, 'workbook_public'])
->name('workbook.public');

Route::get('/workbook/public/{workbook_id}', [App\Http\Controllers\PublicController::class, 'workbook_publicate'])
->name('workbook.publicate');

Route::get('/workbook/private/{workbook_id}', [App\Http\Controllers\PublicController::class, 'workbook_private'])
->name('workbook.private');

Route::get('/workbook/public/display/all', [App\Http\Controllers\PublicController::class, 'display_public'])
->name('display.public');

Route::post('/workbook/public/display/all', [App\Http\Controllers\PublicController::class, 'display_public_with_difficulty'])
->name('display.public_with_difficulty');

Route::get('/workbook/public/solve/start/{workbook_id}', [App\Http\Controllers\PublicController::class, 'public_start'])
->name('public.start');

Route::post('/workbook/public/solve/result/{workbook_id}', [App\Http\Controllers\PublicController::class, 'public_result'])
->name('public.result');

Route::post('/workbook/public/solve/result/ranking/{workbook_id}', [App\Http\Controllers\PublicController::class, 'public_ranking'])
->name('public.ranking');

//query
Route::get('/query', function () {
    return Inertia::render('Query');
})->name('query');

Route::post('/query/send', [App\Http\Controllers\UserController::class, 'query_send'])
->name('query.send');

//howtouse
Route::get('/how/to/use', function () {
    return Inertia::render('Policies/HowToUse');
})->name('howtouse');
});

//protected
Route::get('/protected/solve/pre/start/{workbook_id}', [App\Http\Controllers\ProtectedController::class, 'protected_pre_start']);

Route::get('/protected/solve/start/{workbook_id}', [App\Http\Controllers\ProtectedController::class, 'protected_start'])
->name('protected.start');

Route::post('/protected/solve/result/{workbook_id}', [App\Http\Controllers\ProtectedController::class, 'protected_result'])
->name('protected.result');

Route::post('/protected/solve/result/ranking/{workbook_id}', [App\Http\Controllers\ProtectedController::class, 'protected_ranking'])
->name('protected.ranking');

//default
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
