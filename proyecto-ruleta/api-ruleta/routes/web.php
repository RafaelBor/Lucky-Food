<?php

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
    return view('welcome');
});


//admin

Route::post('/api/login', 'UserController@login');
route::post('/api/register', 'UserController@register');

//restaurante

route::resource('/api/restaurante', 'RestaurantController');



//cupones

route::resource('/api/cupones', 'CuponesController');


//cliente

route::resource('/api/cliente', 'ClienteController');
route::put('/api/puntaje', 'ClienteController@numeros');
route::put('/api/turnos', 'ClienteController@turnos');

//codigos

route::resource('/api/codigo', 'CodigosController');
route::get('/api/codigo/usuario/{id}', 'CodigosController@getCodeByUser');
route::post('/api/codigo/agregar-codigo', 'CodigosController@agregarCodigo');
route::get('api/codigo/buscar/{slug}', 'CodigosController@buscarCodigo');

//categorias

route::resource('/api/categorias', 'CategoriasController');


//acceso

route::resource('/api/acceso', 'AccesoController');


//Ventas
route::resource('/api/ventas', 'VentasController');
