<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\VentasRes;
use App\Helpers\JwtAuth;

class VentasController extends Controller
{
    public function store(Request $request){
        $json = $request->input('json', null);
        $param = json_decode($json);
        $param_array = json_decode($json, true);

        if(!empty($param) && !empty($param_array)){

            $param_array = array_map('trim', $param_array);
            $user = $this->getIdentity($request);

            $validate = \Validator::make($param_array, [
                'ventas_total' => 'required',
                'ventas_ahorro'   => 'required'
            ]);

            if($validate -> fails()){
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'El cupon no se a creado correctamente',
                    'errors' => $validate->errors()
            );
            }else{
                $ventas = new VentasRes();
                $ventas->id_restaurante = $user->sub;
                $ventas->ventas_total = $param_array['ventas_total'];
                $ventas->ventas_ahorro = $param_array['ventas_ahorro'];
                
               

                $ventas->save();

                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'la venta se ha creado',
                    'venta' => $ventas
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

    private function getIdentity($request){
        //conseguir usuario identificado
        $jwtAuth = new JwtAuth();
        $token = $request->header('Authorization', null);
        $user = $jwtAuth->checkToken($token, true);

        return $user;
   }

 
}
