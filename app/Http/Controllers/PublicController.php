<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\WorkService;
use Inertia\Inertia;
use App\Models\Workbook;
use App\Models\Work;
use App\Models\Result;
use App\Models\ThisPublic;
use App\Models\PublicResult;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth; 
use Ramsey\Uuid\Uuid;


class PublicController extends Controller
{
    //
    public function workbook_public(Request $request,WorkService $workService){

        $user_id = Auth::id();
        $workbooks = $workService->getTitle($user_id);
        return Inertia::render('Public/isPublicWorkbook',[
            'workbooks'=>$workbooks,
        ]);
    }

    public function workbook_publicate(Request $request,WorkService $workService,$workbook_id){

        $workbook = $workService->getWorkbook($workbook_id);
        $is_works = Work::where('workbook_id',$workbook_id)->exists();
        $user_id = Auth::id();
        $is_public = $workbook->is_public;
        if(!$is_public && $is_works){
        $workbook->is_public = true;
        $workbook->save();
        $workbooks = $workService->getTitle($user_id);
        $request->session()->flash('success','問題集を公開しました');
        return Inertia::render('Public/isPublicWorkbook',[
            'workbooks'=>$workbooks,
        ]);}else{
        $workbooks = $workService->getTitle($user_id);
        $request->session()->flash('error','その問題集は公開できません');
        return Inertia::render('Public/isPublicWorkbook',[
            'workbooks'=>$workbooks,
        ]);
        }    
    }

    public function workbook_private(Request $request,WorkService $workService,$workbook_id){

        $user_id = Auth::id();
        $workbook = $workService->getWorkbook($workbook_id);
        $workbook->is_public = false;
        $workbook->save();
        $workbooks = $workService->getTitle($user_id);
        $request->session()->flash('success','問題集を非公開にしました');
        return Inertia::render('Public/isPublicWorkbook',[
            'workbooks'=>$workbooks,
        ]);
            
    }


    public function display_public(Request $request,WorkService $workService){
        $workbooks = Workbook::where('is_public',true)
                                ->with('user')
                                ->with('public_result')
                                ->get();
        
        return Inertia::render('Public/DisplayPublic',[
            'workbooks'=>$workbooks,
        ]);
    }

    public function display_public_with_difficulty(Request $request,WorkService $workService){
        $workbooks = Workbook::where('is_public',true)
                                ->with('public_result')
                                ->with('user')->get();
        $workbook_id = $request->input('workbook_id');
        $workbook = Workbook::where('workbook_id',$workbook_id)->firstOrFail();
        $user_id = Auth::id();
                        
        if($request->input('difficulty') != null && $user_id != $workbook->user_id){
            $difficulty=$request->input('difficulty');
            $public_result = PublicResult::where('workbook_id',$workbook_id)
                                        ->where('user_id',$user_id)->firstOrFail();
            $public_result->difficulty = $difficulty;
            $public_result->save();
        }
        return Inertia::render('Public/DisplayPublic',[
            'workbooks'=>$workbooks,
        ]);
    }


    public function public_start(Request $request,WorkService $workService,$workbook_id){

        $works = $workService->getWorks($workbook_id);
        return Inertia::render('Public/PublicStart',[
            'works'=>$works,
        ]);
    }

    public function public_result(Request $request,WorkService $workService,$workbook_id){
        $works = $workService->getWorks($workbook_id);
        $workbook = Workbook::where('workbook_id',$workbook_id)->firstOrFail();
        $user_id = Auth::id();
        $is_public_result = PublicResult::where('user_id',$user_id)
                                         ->where('workbook_id',$workbook_id)
                                         ->exists();
        if(!$is_public_result && $user_id != $workbook->user_id ){
        $result = new PublicResult();
        $result->workbook_id = $workbook_id;
        $result->result = $request->input('result');;
        $result->user_id = $user_id;
        $result->save();
        }
        return Inertia::render('Public/PublicResultDisplay',[
            'result'=>$request->input('result'),
            'workbook_id'=>$workbook_id,
            'works'=>$works,

        ]);



    }

    public function public_ranking(Request $request,WorkService $workService,$workbook_id){
        $difficulty = $request->input('difficulty');
        $workbook = Workbook::where('workbook_id',$workbook_id)->firstOrFail();
        $user_id = Auth::id();

        if($request->input('difficulty') != null && $user_id != $workbook->user_id){
            $difficulty=$request->input('difficulty');
            $workbook_id = $request->input('workbook_id');
            $public_result = PublicResult::where('workbook_id',$workbook_id)
                                        ->where('user_id',$user_id)->firstOrFail();
            $public_result->difficulty = $difficulty;
            $public_result->save();
        }
        $works = $workService->getWorks($workbook_id);
        $public_results = PublicResult::with('user')
                                        ->where('workbook_id',$workbook_id)
                                        ->orderBy('result','DESC')
                                        ->get();
        return Inertia::render('Public/DisplayRanking',[
            'public_results'=>$public_results,
            'works'=>$works,
        ]);
    }






}
