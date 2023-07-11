<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Workbook\CreateRequest;
use App\Http\Controllers\Controller;
use App\Services\WorkService;
use Inertia\Inertia;
use App\Models\Workbook;
use App\Models\Work;
use App\Models\Result;
use App\Models\PublicResult;
use App\Models\Query;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth; 
use Ramsey\Uuid\Uuid;

class UserController extends Controller
{
    //create
    public function title_save(Request $request){
        $workbook = new Workbook;
        $user_id = Auth::id();
        $workbook->title = $request->input('title');
        $workbook->user_id = $user_id;
        $workbook->workbook_id = Uuid::uuid4()->toString();
        //同じユーザが同じタイトルの問題をつけようとしたらエラーが出るように
        $is_workbook = Workbook::where('user_id',$user_id)
        ->where('title',$workbook->title)
        ->exists();
        if(!$is_workbook){
        $workbook->save();
        return Inertia::render('Create/WorkMake',[
            'workbook_id'=> $workbook->workbook_id,
        ]);
        }else{
            $request->session()->flash('error','そのタイトルはすでに存在します。別のタイトルを入力してください');
            return Inertia::render('Create/Title');
        }
    }


    public function work_save(Request $request,$workbook_id)
    {

        $work = new Work;
        $work->workbook_id = $workbook_id;
        $work->question = $request->input('question');
        $work->options = json_encode($request->input('options',[]));
        $work->answer = $request->input('answer');
        $work->description = $request->input('description');
        $work->time_to_solve = intval($request->input('time_to_solve'));
        $is_work = Work::where('workbook_id',$workbook_id)
        ->where('question',$work->question)
        ->exists();
        if(!$is_work){
        $work->save();
        $request->session()->flash('success','問題を登録しました');
        return Inertia::render('Create/WorkMake',[
            'workbook_id'=> $workbook_id,
        ]);
        }elseif($is_work){
            $request->session()->flash('error','その問題はすでに存在します。別の問題を作成してください');
            $error = $request->session()->get('error');
            return Inertia::render('Create/WorkMake',[
                'workbook_id'=> $workbook_id,]
            );
        }
    }

    public function work_complete(Request $request,WorkService $workService,$workbook_id){

        $work = new Work;
        $work->workbook_id = $workbook_id;
        $work->question = $request->input('question');
        $work->options = json_encode($request->input('options',[]));
        $work->answer = $request->input('answer');
        $work->description = $request->input('description');
        $work->time_to_solve = intval($request->input('time_to_solve'));
        $is_work = Work::where('workbook_id',$workbook_id)
        ->where('question',$work->question)
        ->exists();
        
        if(!$is_work){
        $work->save();
        $workbook = $workService->getWorkbook($workbook_id);
        $request->session()->flash('success','問題集を作成しました');
        return Inertia::render('Create/Complete',[
            'workbook'=> $workbook,
        ]);
        }elseif($is_work){
            $request->session()->flash('error','その問題はすでに存在します。別の問題を作成してください');
            $error = $request->session()->get('error');
            return Inertia::render('Create/WorkMake',[
                'workbook_id'=> $workbook_id,]
            );
        }
    }


    public function workbook_display(Request $request,WorkService $workService){

        $user_id = Auth::id();
        $workbooks = $workService->getTitle($user_id);
        return Inertia::render('Create/WorkbookDisplay',[
            'workbooks'=>$workbooks,
        ]);
    }

    public function work_display(Request $request,WorkService $workService,$workbook_id){

        $works = $workService->getWorks($workbook_id);
        return Inertia::render('Create/WorkDisplay',[
            'works'=>$works,
            'workbook_id'=>$workbook_id,
        ]);
    }

    public function work_edit(Request $request,WorkService $workService,$id){

        $work = $workService->getWork($id);

        $workbook_id = $work['workbook_id'];
        $question = $work['question'];
        $options = json_decode($work['options'],true);
        $answer = $work['answer'];
        $description = $work['description'];
        $time_to_solve = $work['time_to_solve'];

        return Inertia::render('Create/Update/WorkUpdate',[
            'id' => $id,
            'workbook_id'=> $workbook_id,
            'question' => $question,
            'options' => $options,
            'answer' => $answer,
            'description'=> $description,
            'time_to_solve'=> $time_to_solve,       
         ]);
    }

    public function work_update(CreateRequest $request,$id){

        $work = Work::where('id',$id)->firstOrFail();
        $work->question = $request->input('question');
        $work->options = json_encode($request->input('options',[]));
        $work->answer = $request->input('answer');
        $work->description = $request->input('description');
        $work->time_to_solve = intval($request->input('time_to_solve'));
        $work->save();

        $results = Result::where('workbook_id',$work->workbook_id)->get();
        $public_results = PublicResult::where('workbook_id',$work->workbook_id)->get();
        if($results != null){
            foreach($results as $result){
                $result->delete();
            }
        }
        if($public_results != null){
            foreach($public_results as $public_result){
                $public_result->delete();
            }
        }

        $works = Work::where('workbook_id',$work->workbook_id)->get();
        $request->session()->flash('success','問題を更新しました');
        $message = $request->session()->get('message');
        return Inertia::render('Create/WorkDisplay',[
            'works'=> $works,
            'workbook_id'=>$work->workbook_id,
        ]);
        
    }

    public function work_delete(Request $request,$id){

        $work = Work::where('id',$id)->firstOrFail();
        $results = Result::where('workbook_id',$work->workbook_id)->get();
        $public_results = PublicResult::where('workbook_id',$work->workbook_id)->get();
        if($results != null){
            foreach($results as $result){
                $result->delete();
            }
        }
        if($public_results != null){
            foreach($public_results as $public_result){
                $public_result->delete();
            }
        }

        $work->delete();
        $works = Work::where('workbook_id',$work->workbook_id)->get();
        $request->session()->flash('success','問題を削除しました');
        return Inertia::render('Create/WorkDisplay',[
            'works'=> $works,
            'workbook_id'=>$work->workbook_id,

        ]);
        
    }

    public function work_add(Request $request,WorkService $workService,$workbook_id)
    {
        $work = new Work;
        $work->workbook_id = $workbook_id;
        $work->question = $request->input('question');
        $work->options = json_encode($request->input('options',[]));
        $work->answer = $request->input('answer');
        $work->description = $request->input('description');
        $work->time_to_solve = intval($request->input('time_to_solve'));
        $is_work = Work::where('workbook_id',$workbook_id)
        ->where('question',$work->question)
        ->exists();
        if(!$is_work){
        $work->save();
        $request->session()->flash('success','問題を追加しました');
        $works = $workService->getWorks($workbook_id);
        return Inertia::render('Create/WorkDisplay',[
            'works'=> $works,
            'workbook_id'=> $workbook_id,
        ]);
        }elseif($is_work){
            $request->session()->flash('error','その問題はすでに存在します。別の問題を作成してください');
            return Inertia::render('Create/WorkAdd',[
                'workbook_id'=> $workbook_id,
                ]);
        }
    }


    public function workbook_edit(Request $request,WorkService $workService,$workbook_id){
        $workbook = $workService->getWorkbook($workbook_id);
        $title = $workbook->title;
        return Inertia::render('Create/Update/WorkbookUpdate',[
            'title'=>$title,
            'workbook_id'=>$workbook->workbook_id,
        ]);

    }

    public function workbook_update(Request $request,WorkService $workService,$workbook_id){
        $workbook = $workService->getWorkbook($workbook_id);
        $workbook->title = $request->input('title');
        $user_id = Auth::id();
        //同じユーザが同じタイトルの問題をつけようとしたらエラーが出るようにする
        $is_workbook = Workbook::where('user_id',$user_id)
        ->where('title',$workbook->title)
        ->exists();
        if(!$is_workbook){
        $workbook->save();
        $workbooks = $workService->getTitle($user_id);
        $request->session()->flash('success','タイトルを更新しました');
        return Inertia::render('Create/WorkbookDisplay',[
            'workbooks'=> $workbooks,
        ]);
        }else{
            $request->session()->flash('error','そのタイトルはすでに存在します。別のタイトルを入力してください');
            return Inertia::render('Create/Update/WorkbookUpdate');
        }
    }

    public function workbook_delete(Request $request,WorkService $workService,$workbook_id){

        $workbook = Workbook::where('workbook_id',$workbook_id)->firstOrFail();

        $workbook->delete();

        $user_id = Auth::id();
        $workbooks = $workService->getTitle($user_id);

        $request->session()->flash('success','問題を削除しました');
        return Inertia::render('Create/WorkbookDisplay',[
            'workbooks'=> $workbooks,
        ]);
        
    }

    //analyse
    public function workbook_analyse_display(Request $request,WorkService $workService){

        $user_id = Auth::id();
        $workbooks = $workService->getTitle($user_id);
        return Inertia::render('Analyse/AnalyseWorkbookDisplay',[
            'workbooks'=>$workbooks,
        ]);
    }

    public function workbook_analysis(Request $request,WorkService $workService,$workbook_id){
        $workbook = Workbook::orderBy('created_at','ASC')
                                ->where('workbook_id',$workbook_id)
                                ->with('work')
                                ->with('result')->firstOrFail();
        return Inertia::render('Analyse/Analysis',[
            'workbook'=>$workbook,
        ]);
    }





    //solve
    public function workbook_select(Request $request,WorkService $workService){

        $user_id = Auth::id();
        $workbooks = $workService->getTitle($user_id);
        return Inertia::render('Solve/WorkbookSelect',[
            'workbooks'=>$workbooks,
        ]);
    }

    public function workbook_start(Request $request,WorkService $workService,$workbook_id){

        $works = $workService->getWorks($workbook_id);
        
        return Inertia::render('Solve/WorkbookStart',[
            'works'=>$works,
        ]);
    }

    public function workbook_result(Request $request,WorkService $workService,$workbook_id){
        $works = $workService->getWorks($workbook_id);
        $result = new Result();
        $user_result = $request->input('result');
        $result->workbook_id = $workbook_id;
        $result->result = $user_result;
        $result->date = Carbon::now();
        $result->save();

        return Inertia::render('Solve/ResultDisplay',[
            'result'=>$user_result,
            'workbook_id'=>$workbook_id,
            'works'=>$works,

        ]);



    }

    public function query_send(Request $request){

        $request->validate([
            'email' => 'required|string|email|max:255',
        ]);
        $query = new Query();
        $query->user_id = Auth::id();
        $query->name = $request->input('name');
        $query->email = $request->input('email');
        $query->content = $request->input('content');
        $query->save();

        $request->session()->flash('success','送信が完了しました');

        return Inertia::render('Top');



    }









}
