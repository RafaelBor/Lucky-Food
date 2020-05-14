<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Cupones;
use App\Helpers\JwtAuth;

class CuponesController extends Controller
{
    public function store(Request $request){
        $json = $request->input('json', null);
        $param = json_decode($json);
        $param_array = json_decode($json, true);

        if(!empty($param) && !empty($param_array)){

            

            $param_array = array_map('trim', $param_array);

            $validate = \Validator::make($param_array, [
                'id_restaurante' => 'required',
                'id_categoria'   => 'required',
                'nombre' => 'required',
                'precio' => 'required',
                'descuento' => 'required',
                'descripcion' => 'required'
            ]);

            if($validate -> fails()){
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'El cupon no se a creado correctamente',
                    'errors' => $validate->errors()
            );
            }else{
                $cupon = new Cupones();
                $cupon->id_restaurante = $param_array['id_restaurante'];
                $cupon->id_categoria = $param_array['id_categoria'];
                $cupon->nombre = $param_array['nombre'];
                $cupon->precio = $param_array['precio'];
                $cupon->descuento = $param_array['descuento'];
                $cupon->ahorro = $param_array['precio'] - $param_array['descuento'];
                $cupon->descripcion = $param_array['descripcion'];

                $cupon->save();

                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El cupon se ha creado',
                    'restaurant' => $cupon
                );
            }
        }else{
            $data = array(
                'status' => 'success',
                'code' => 400,
                'message' => 'los datos no son correctos',
                
            );
        }
        return response()->json($data, $data['code']);
    }

    public function index(){
        $cupones = Cupones::all()->load('restaurant');

        return response()->json([ 
            'code' => 200,
            'status' => 'success',
            'cupones' => $cupones
            
        ], 200);
    }

   

    
}
