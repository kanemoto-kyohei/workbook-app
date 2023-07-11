<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThisPublic extends Model
{
    use HasFactory;

    protected $table = 'this_public';


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function public_result(){
        return $this->hasMany(PublicResult::class);
    }

}
