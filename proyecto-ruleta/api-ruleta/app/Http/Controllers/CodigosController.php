<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Codigos;
use App\Cupones;
use App\Helpers\JwtAuth;

class CodigosController extends Controller
{
    public function store(Request $request){
        $json = $request->input('json', null);
        $param = json_decode($json);
        $param_array = json_decode($json, true);

        if(!empty($param) && !empty($param_array)){

            $user = $this->getIdentity($request);

            $param_array = array_map('trim', $param_array);

            $validate = \Validator::make($param_array, [
                'id_cupon' => 'required',
                'codigo'  => 'required'
            ]);
        

        if($validate -> fails()){
            $data = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'el codigo no se a creado',
                'errors' => $validate->errors()
        );
        }else{
            $codigo = new Codigos();
            $codigo->id_cupon = $param_array['id_cupon'];
            $codigo->id_cliente = $user->sub;
            $codigo->codigo = $param_array['codigo'];

            $codigo->save();

            $data = array(
                'status' => 'success',
                'code' => 200,
                'message' => 'el codigo se ha creado',
                'restaurant' => $codigo
            
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

public function destroy($codigo, Request $request){
    //conseguir usuario identificado
    
    
    //Conseguir el registro
    $codigo = Codigos::where('codigo', $codigo)->first();

    if(!empty($codigo)){
    //Borrarlo
    $codigo->delete();

    //devolver algo
    $data = [ 
        'code' => 200,
        'status' => 'success',
        'codigo' => $codigo               
    ];
}else{
    $data = [ 
        'code' => 400,
        'status' => 'error',
        'message' => 'el codigo no existe '               
    ];
}

    return response()->json($data, $data['code' ]);
}   

public function getCodeByUser($id){
    $codigos = Codigos::with('codigos.restaurant')->where('id_cliente', $id)->get();

        return response()->json([  
            'status' => 'success',
            'codigos' => $codigos
        ], 200);
}

public function agregarCodigo(Request $request){
    
    $length = 6;
    $DesdeNumero = 10;
    $HastaNumero = 13;
   
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }

    $numeroAleatorio = rand($DesdeNumero, $HastaNumero);

    if($randomString && $numeroAleatorio){
        $user = $this->getIdentity($request);

        $codigo = new Codigos;
        $codigo->codigo = $randomString;
        $codigo->id_cliente = $user->sub;
        $codigo->id_cupon = $numeroAleatorio;

        $codigo->save();

        $data = array(
            'status' => 'success',
            'code' => 200,
            'message' => 'el codigo se ha creado',
            'restaurant' => $codigo
        
    );
    }else{
        $data = array(
            'status' => 'success',
            'code' => 400,
            'message' => 'los datos no son correctos',
            
        );
    }

    return response()->json($data, $data['code']);
    


}

public function buscarCodigo($slug){
        
        $acceso = Codigos::where('codigo', $slug)->get();

        return response()->json([  
            'status' => 'success',
            'codigos' => $acceso
        ], 200);
}

public function show($slug, Request $request){

    
        
    $acceso = Codigos::with('codigos.restaurant')->where('codigo', $slug)->get();

    if(is_object($acceso)){
        $data = array(
            'code' => 200,
            'status' => 'success',
            'codigos' => $acceso
        );
    }else{
        $data = array(
            'code' => 404,
            'status' => 'error',
            'mesagge' => 'El codigo no existe'
        );
    }
    return response()->json($data, $data['code']);
}



public function index(Request $request){
    $user = $this->getIdentity($request);
    $codigos = Codigos::all()->where('id', $user->sub);

    return response()->json([ 
        'code' => 200,
        'status' => 'success',
        'codigos' => $codigos
        
    ], 200);
}

    private function getIdentity($request){
        //conseguir usuario identificado
        $jwtAuth = new JwtAuth();
        $token = $request->header('Authorization', null);
        $user = $jwtAuth->checkToken($token, true);

        return $user;
   }
}
