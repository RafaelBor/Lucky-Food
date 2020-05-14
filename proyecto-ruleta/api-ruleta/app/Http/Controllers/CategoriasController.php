<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\categorias;
use App\Helpers\JwtAuth;

class CategoriasController extends Controller
{
    public function index(){
        $categorias = categorias::all();
        return response()->json([ 
            'code' => 200,
            'status' => 'success',
            'categorias' => $categorias
            
        ]);
    } 
}
