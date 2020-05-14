<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VentasRes extends Model
{
    protected $table = 'ventas_restaurante';

    public function restaurant(){
        return $this->belongsTo('App\UserRestaurant', 'id_restaurante');
    }
}
