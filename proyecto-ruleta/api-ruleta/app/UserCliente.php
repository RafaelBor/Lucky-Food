<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserCliente extends Model
{
    protected $table = 'user_cliente';

    protected $fillable = [
        'puntaje'
    ];

    protected $guard = 'cliente';

    public function codigos(){
        return $this->belongsTo('App\Codigos', 'id_cliente');
    }
}
