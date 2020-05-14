<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class categorias extends Model
{
    protected $table = 'categoria_cupones';

    public function user(){
        return $this->belongsTo('App\User', 'id_admin');
    }


    
}
