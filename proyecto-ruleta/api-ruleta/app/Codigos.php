<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Codigos extends Model
{
    protected $table = 'codigo';

    public function codigos(){
        return $this->belongsTo('App\Cupones', 'id_cupon');
    }

    public function restaurant(){
        return $this->belongsTo('App\UserRestaurant', 'id_restaurante');
    }
}
