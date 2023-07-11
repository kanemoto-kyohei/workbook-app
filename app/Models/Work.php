<?php

namespace App\Models;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    use CrudTrait;
    use HasFactory;

    public function workbook(){
        return $this->belongsTo(Workbook::class,'workbook_id','workbook_id');
    }

}
