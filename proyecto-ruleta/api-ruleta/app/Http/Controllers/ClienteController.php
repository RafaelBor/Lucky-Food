<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\UserCliente;
use App\Helpers\JwtAuth;

class ClienteController extends Controller
{
    public function store(Request $request){
        $json = $request ->input('json', null);
        $param = json_decode($json);
        $param_array = json_decode($json, true);

        if(!empty($json) && !empty($param_array)){

            $param_array = array_map('trim', $param_array);

            $validate = \Validator::make($param_array, [
                'nombre' => 'required',
                'apellido' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required'
            ]);

            if($validate -> fails()){
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'el usuario no se a creado',
                    'errors' => $validate->errors()
                );
            }else{
                $pwd = hash('sha256', $param->password);

                $cliente = new UserCliente();
                $cliente->nombre = $param_array['nombre'];
                $cliente->apellido = $param_array['apellido'];
                $cliente->email = $param_array['email'];
                $cliente->password = $pwd;


                $cliente->save();

                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'El usuario se ha creado',
                    'cliente' => $cliente
                );
            }
            return response()->json($data, $data['code']);
        }
    }

    public function numeros(Request $request){

      
            //buscar el registro a actualizar

            $user = $this->getIdentity($request);
            $puntaje = UserCliente::where('id', $user->sub)->increment('puntaje', 20);
            $puntaje = UserCliente::where('id', $user->sub)->decrement('turnos', 1);
            $changes = UserCliente::where('id', $user->sub)->first();

            if(is_object($changes)){
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'puntos' => $puntaje,
                    'changes' => $changes
                );
            }else{
                $data = array(
                    'code' => 404,
                    'status' => 'error',
                    'mesagge' => 'El usuario no existe'
                );
            }
            return response()->json($data, $data['code']);
           
           
        }

        public function turnos(Request $request){
            $user = $this->getIdentity($request);
            $puntaje = UserCliente::where('id', $user->sub)->increment('turnos', 1);
            $changes = UserCliente::where('id', $user->sub)->first();

            if(is_object($changes)){
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'puntos' => $puntaje,
                    'changes' => $changes
                );
            }else{
                $data = array(
                    'code' => 404,
                    'status' => 'error',
                    'mesagge' => 'El usuario no existe'
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
