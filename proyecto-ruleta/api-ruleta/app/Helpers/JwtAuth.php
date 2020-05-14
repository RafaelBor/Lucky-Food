<?php

namespace App\Helpers;

use Auth;
use Firebase\JWT\JWT;
use Iluminate\Support\Facades\BD;
use App\User;
use App\UserRestaurant;
use App\UserCliente;

class JwtAuth{
    public $key;

    public function __construct(){
        $this->key = 'esto_es_una_clave';
    }

    public function signup($email, $password, $getToken = null){

        if(Auth::guard('users')){
            $user = User::where([
                'email' => $email,
                'password' => $password
            ])->first();
        
                $signup = false;
            if(is_object($user)){
                $signup = true;
                $data = array(
                    'status' => 'success',
                    'usuario' => $user
                );
            }   

            if($signup){
                $token = array(
                    'sub' => $user->id,
                    'usuario' => $user->usuario,
                    'email' => $user->email,
                    'role' =>$user->role,
                    'image' => $user->image,
                    'iat'   => time(),
                    'exp'   => time() + (7 * 24 * 60 * 60)
                ); 
                
                $jwt = JWT::encode($token, $this->key, 'HS256'); 
                $decoded = JWT::decode($jwt, $this->key, ['HS256']);
                
                if(is_null($getToken)){
                    $data = $jwt;
                }else{
                    $data = $decoded;
                }

             }else{
                 $data = array(
                     'status' => 'error',
                     'message' => 'Login de admin incorrecto'
                 );

             }
            
 
        } //Final guard users

           if(Auth::guard('restaurants')){
                $user = UserRestaurant::where([
                    'email' => $email,
                    'password' => $password
                ])->first();
            
                $signup = false;
            if(is_object($user)){
                $signup = true;
                $data = array(
                    'status' => 'success',
                    'usuario' => $user
                );
                if($signup){
                    $token = array(
                        'sub' => $user->id,
                        'usuario' => $user->nombre,
                        'email' => $user->email,
                        'role' => $user->role,
                        'nombre' => $user->nombre,
                        'iat'   => time(),
                        'exp'   => time() + (7 * 24 * 60 * 60)
                    ); 
                    
                    $jwt = JWT::encode($token, $this->key, 'HS256'); 
                    $decoded = JWT::decode($jwt, $this->key, ['HS256']);
                    
                    if(is_null($getToken)){
                        $data = $jwt;
                    }else{
                        $data = $decoded;
                    }
    
                 }else{
                     $data = array(
                         'status' => 'error',
                         'message' => 'Login de restaurante incorrecto'
                     );
    
                 }
            }

        }//Final guard restaurante
        
        if(Auth::guard('cliente')){
            $user = UserCliente::where([
                'email' => $email,
                'password' => $password
            ])->first();
        
            $signup = false;
        if(is_object($user)){
            $signup = true;
            $data = array(
                'status' => 'success',
                'usuario' => $user
            );
        
            if($signup){
                $token = array(
                    'sub' => $user->id,
                    'nombre' => $user->nombre,
                    'apellido' => $user->apellido,
                    'email' => $user->email,
                    'role' =>$user->role,
                    'puntaje' => $user->puntaje,
                    'turnos' => $user->turnos,
                    'iat'   => time(),
                    'exp'   => time() + (7 * 24 * 60 * 60)
                ); 
                
                $jwt = JWT::encode($token, $this->key, 'HS256'); 
                $decoded = JWT::decode($jwt, $this->key, ['HS256']);
                
                if(is_null($getToken)){
                    $data = $jwt;
                }else{
                    $data = $decoded;
                }

             }else{
                 $data = array(
                     'status' => 'error',
                     'message' => 'Login incorrecto'
                 );

             }
            }

    }
 
        
    

        return $data;
    }

    
    public function checkToken($jwt, $getIdentity = false){
        $auth = false;

        try{
            $jwt = str_replace('"', '', $jwt);
            $decoded = JWT::decode($jwt, $this->key, [ 'HS256']);
        }catch(\UnexpectedValueException $e){
            $auth = false;
        }catch(\DomainException $e){
            $auth = false;
        }

        if(!empty($decoded) && is_object($decoded) && isset($decoded->sub)){
            $auth = true;
        } else{
            $auth = false;
        }

        if($getIdentity){
            return $decoded;
        }

        return $auth;

    }
}
