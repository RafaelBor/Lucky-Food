<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRestaurant extends Model
{
    protected $table = 'user_restaurant';

    protected $guard = 'restaurants';

    public function users(){
        return $this->belongsTo('App\User', 'id_admin');
    }

  

}
