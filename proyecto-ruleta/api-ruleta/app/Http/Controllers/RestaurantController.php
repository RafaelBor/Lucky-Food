<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\UserRestaurant;
use App\Helpers\JwtAuth;


class RestaurantController extends Controller
{
   // public function __construct(){
     //   $this->middleware('api.auth');
    //}

    public function index(){
        $restaurant = UserRestaurant::all();
        return response()->json([ 
            'code' => 200,
            'status' => 'success',
            'restaurante' => $restaurant
            
        ]);
    } 

    public function show($id){
        $restaurant = UserRestaurant::find($id);

        if(is_object($restaurant)){
            $data = [ 
                'code' => 200,
                'status' => 'success',
                'restaurant' => $restaurant               
            ];
        }else{
            $data = [ 
                'code' => 400,
                'status' => 'error',
                'mesagge' => 'La categoria no existe'               
            ];
        }

        return response()->json($data, $data[ 'code']);
    }

    public function store(Request $request){
        $json = $request -> input('json', null);
        $param = json_decode($json);
        $param_array = json_decode($json, true);

        if(!empty($param) && !empty($param_array)){
        
        $user = $this->getIdentity($request);

        $param_array = array_map('trim', $param_array);

        $validate = \Validator::make($param_array,[
            'nombre' => 'required',
            'email'  => 'required|email|unique:users',
            'password' => 'required',
            'descripcion' => 'required',
            'direccion' => 'required',
            'numero_tel' => 'required'
            

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
               $restaurant = new UserRestaurant();
               $restaurant->id_admin = $user->sub;
               $restaurant->nombre = $param_array['nombre'];
               $restaurant->email = $param_array['email'];
               $restaurant->password = $pwd;
               $restaurant->descripcion = $param_array['descripcion'];
               $restaurant->direccion = $param_array['direccion'];
               $restaurant->numero_tel = $param_array['numero_tel'];

               //Guardar el usuario
               $restaurant->save();

               $data = array(
                   'status' => 'success',
                   'code' => 200,
                   'message' => 'El usuario se ha creado',
                   'restaurant' => $restaurant
               
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

    public function update(Request $request){
        
      
    }

  

    

    private function getIdentity($request){
        //conseguir usuario identificado
        $jwtAuth = new JwtAuth();
        $token = $request->header('Authorization', null);
        $user = $jwtAuth->checkToken($token, true);

        return $user;
   }
}


