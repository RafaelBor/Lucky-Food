<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cupones extends Model
{
    protected $table = 'cupones';

    public function user(){
        return $this->belongsTo('App\User', 'id_admin');
    }

    public function restaurant(){
        return $this->belongsTo('App\UserRestaurant', 'id_restaurante');
    }

    

    
}
