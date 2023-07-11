<?php

namespace App\Services;

use App\Models\Work;
use App\Models\Workbook;

class WorkService{

    public function getTitle($user_id){
        $workbooks = Workbook::where('user_id',$user_id)->get();

        return $workbooks;
    }

    public function getWorkbook($workbook_id){
        $workbook = Workbook::where('workbook_id',$workbook_id)->firstOrFail();

        return $workbook;
    }


    public function getWorks($workbook_id){
        $works = Work::where('workbook_id',$workbook_id)->get();

        return $works;
    }

    public function getWork($id){
        $work = Work::where('id',$id)->firstOrFail();

        return $work;
    }


}