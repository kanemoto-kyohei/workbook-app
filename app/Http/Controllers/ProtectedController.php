<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Services\WorkService;
use Inertia\Inertia;
use App\Models\Workbook;
use App\Models\Work;
use App\Models\Result;
use App\Models\ThisPublic;
use App\Models\PublicResult;
use App\Models\ProtectedResult;

use App\Models\User;


class ProtectedController extends Controller
{
    //
    public function protected_pre_start(Request $request,WorkService $workService,$workbook_id){

        $workbook = Workbook::with('user')->where('workbook_id',$workbook_id)->firstOrFail();
        return Inertia::render('Protected/ProtectedWorkbookPreStart',[
            'workbook'=>$workbook,
        ]);
    }

    public function protected_start(Request $request,WorkService $workService,$workbook_id){

        $works = $workService->getWorks($workbook_id);
        return Inertia::render('Protected/ProtectedWorkbookStart',[
            'works'=>$works,
        ]);
    }

    public function protected_result(Request $request,WorkService $workService,$workbook_id){
        $works = $workService->getWorks($workbook_id);
        $workbook = Workbook::where('workbook_id',$workbook_id)->firstOrFail();

        $result = new ProtectedResult();
        $result->workbook_id = $workbook_id;
        $result->result = $request->input('result');;
        $result->save();
        return Inertia::render('Protected/ProtectedResultDisplay',[
            'result'=>$request->input('result'),
            'workbook_id'=>$workbook_id,
            'works'=>$works,

        ]);



    }

    public function protected_ranking(Request $request,WorkService $workService,$workbook_id){
        $workbook = Workbook::where('workbook_id',$workbook_id)->firstOrFail();


        if($request->input('nickname') != null){
            $nickname=$request->input('nickname');
            $workbook_id = $request->input('workbook_id');
            $protected_result = ProtectedResult::where('workbook_id',$workbook_id)
                                        ->orderBy('created_at','desc')->firstOrFail();
            $protected_result->nickname = $nickname;
            $protected_result->save();
        }
        $works = $workService->getWorks($workbook_id);
        $protected_results = ProtectedResult::where('workbook_id',$workbook_id)
                                        ->orderBy('result','DESC')
                                        ->get();
        return Inertia::render('Protected/DisplayProtectedRanking',[
            'protected_results'=>$protected_results,
            'works'=>$works,
        ]);
    }



}
