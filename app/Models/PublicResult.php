<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicResult extends Model
{
    use CrudTrait;
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function workbook(){
        return $this->belongsTo(Workbook::class,'workbook_id','workbook_id');
    }

    public function this_public(){
        return $this->belongsTo(ThisPublic::class);
    }


}
