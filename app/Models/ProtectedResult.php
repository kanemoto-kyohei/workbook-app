<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProtectedResult extends Model
{
    use HasFactory;

    public function workbook(){
        return $this->belongsTo(Workbook::class);
    }

}
