<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Acceso extends Model
{
    protected $table = 'acceso';

    public function user(){
       
    }

    public function scopeSearch($query, $codigoAcceso){
        return $query->where('codigoAcceso', 'LIKE', "%$codigoAcceso%");
    }

    
}