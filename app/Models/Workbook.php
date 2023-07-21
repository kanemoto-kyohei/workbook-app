<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Workbook extends Model
{
    use CrudTrait;
    use HasFactory;

    protected $primaryKey = 'workbook_id';

    public $incrementing = false;

    protected $keyType = 'string';

    public function public_result(){
        return $this->hasMany(PublicResult::class,'workbook_id','workbook_id');
    }

    public function work(){
        return $this->hasMany(Work::class,'workbook_id','workbook_id');
    }

    public function result(){
        return $this->hasMany(Result::class,'workbook_id','workbook_id');
    }

    public function protected_result(){
        return $this->hasMany(ProtectedResult::class,'workbook_id','workbook_id');
    }


    public function user(){
        return $this->belongsTo(User::class);
    }

}
