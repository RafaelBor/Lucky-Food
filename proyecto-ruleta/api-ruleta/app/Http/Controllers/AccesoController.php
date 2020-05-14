<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Acceso;
 

class AccesoController extends Controller
{

    public function store(Request $request){

        $json = $request->input('json', null);
        $param = json_decode($json);
       $param_array = json_decode($json, true);

       $acceso = new Acceso();
   
       if(!empty($param) && !empty($param_array)){

        
   
           $validate = \Validator::make($param_array, [
               'codigoAcceso' => 'required|unique:acceso',
               
           ]);

           $codigo = $acceso->codigoAcceso == $param_array['codigoAcceso'];
   
           if($validate -> fails()){
               $data = array(
                   'status' => 'success',
                   'code' => 200,
                   'message' => 'acceso permitido'
                  
           );
          
   
               return response()->json($data, $data[ 'code']);
           }
        }
    
    
    

     
     
     
        /*  $codigoAcceso = $request->codigoAcceso;
        
        $acceso = Acceso::Search($codigoAcceso)->first();

        if($acceso && isset($codigoAcceso)){
            $data = [ 
                'code' => 200,
                'status' => 'success',
                'category' => $acceso               
            ];
        }else{
            $data = [ 
                'code' => 400,
                'status' => 'error',
                'mesagge' => 'La categoria no existe'               
            ];
        }
        

        return response()->json($data, $data[ 'code']);

        */

        
    }

}