<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;

class UserController extends Controller
{
    
    public function register(Request $request){
        $json = $request -> input('json', null);
        $param = json_decode($json);
        $param_array = json_decode($json, true);

        if(!empty($param) && !empty($param_array)){

        $param_array = array_map('trim', $param_array);

        $validate = \Validator::make($param_array,[
            'usuario' => 'required|alpha',
            'email'  => 'required|email|unique:users',
            'password' => 'required'

        ]);
        
        if($validate -> fails()){
            $data = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'El usuario no se ha creado',
                'errors' => $validate->errors()
        );
        }else{
            //validacion pasada correctamente

                //Cifrar la contraseña
               // $pwd = password_hash($param->password, PASSWORD_BCRYPT, [ 'cost' => 4 ]);
               $pwd = hash('sha256', $param->password);  

               //Crear el usuario
               $user = new User();
               $user->usuario = $param_array['usuario'];
               $user->email = $param_array['email'];
               $user->password = $pwd;

               //Guardar el usuario
               $user->save();

               $data = array(
                   'status' => 'success',
                   'code' => 200,
                   'message' => 'El usuario se ha creado',
                   'user' => $user
               
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
    
    
    
    public function login(Request $request){
        $jwtAuth = new \JwtAuth();

       $json = $request -> input('json', null);
       $param = json_decode($json);
       $param_array = json_decode($json, true);
       
       
       $validate = \Validator::make($param_array, [
        'email'     => 'required|email',
        'password'  => 'required'
       ]);

       if($validate -> fails()){
        $signup = array(
            'status'    => 'error',
            'code'      => '404',
            'message'   => 'El usuario se ha podido identificar',
            'errors'    => $validate -> errors()
        );
       }else{
           $pwd = hash('sha256', $param -> password);

           $signup = $jwtAuth -> signup($param -> email, $pwd);

           if(!empty($param -> gettoken)){
               $signup = $jwtAuth -> signup($param -> email, $pwd, true);
           }
        }

        return response() -> json($signup, 200);

        
    }
}
