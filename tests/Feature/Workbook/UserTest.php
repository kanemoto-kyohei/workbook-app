<?php

namespace Tests\Feature\Workbook;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Work;
use App\Models\Workbook;
use App\Models\Result;
use App\Models\Query;
use Illuminate\Support\Facades\Auth; 


class UserTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     * 
     */

     public function test_interacting_with_cookies(): void
    {
        $response = $this->withCookie('color', 'blue')->get('/top');
 
        $response = $this->withCookies([
            'color' => 'blue',
            'name' => 'Taylor',
        ])->get('/top');
    }

    public function test_delete_successed(): void
    {

        $user = User::factory()->create();
        $workbook = Workbook::factory()->create(['user_id'=>$user->id]);

        $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);

        $this->actingAs($user);

        $response = $this->get('/work/list/delete/' . $work->id);


        $response->assertStatus(200);   
     }

     public function test_title_create_successed(): void
{
    $user = User::factory()->create();
    $workbook = Workbook::factory()->create(['user_id'=>$user->id]);
    $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);

    $this->actingAs($user);

    $title = $workbook->title;
    $workbook_id = $workbook->workbook_id;
    
    $user_id = Auth::id();

    $response = $this->post('/create/title/save',[
        'user_id' => $user_id,
        'workbook_id' => $workbook_id,
        'title' => $title,
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('workbooks', [
        'title' => $title,
    ]);

 }



public function test_create_successed(): void
{
    $user = User::factory()->create();
    $workbook = Workbook::factory()->create(['user_id'=>$user->id]);
    $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);


    $workbook_id = $workbook->workbook_id;
    $question = $work->question;
    $answer = $work->answer;
    $description = $work->description;
    $time_to_solve = $work->time_to_solve;

    $response = $this->post('/create/work/save/'.$work->workbook_id, [
        'workbook_id' => $workbook_id,
        'question' => $question,
        'answer' => $answer,
        'time_to_solve' => $time_to_solve
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('works', [
        'workbook_id' => $workbook_id,
        'question' => $question,
        'answer' => $answer,
        'time_to_solve' => $time_to_solve        
    ]);

 }

 public function test_create_completed(): void
{
    $user = User::factory()->create();
    $workbook = Workbook::factory()->create(['user_id'=>$user->id]);
    $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);


    $workbook_id = $workbook->workbook_id;
    $question = $work->question;
    $answer = $work->answer;
    $description = $work->description;
    $time_to_solve = $work->time_to_solve;



    $response = $this->post('/create/work/save/complete/'.$work->workbook_id, [
        'workbook_id' => $workbook_id,
        'question' => $question,
        'answer' => $answer,
        'time_to_solve' => $time_to_solve
    ]);

    $response->assertStatus(200);

    $this->assertDatabaseHas('works', [
        'workbook_id' => $workbook_id,
        'question' => $question,
        'answer' => $answer,
        'time_to_solve' => $time_to_solve        
    ]);

 }


 public function test_edit_title_successed(): void
{
    $user = User::factory()->create();
    $workbook = Workbook::factory()->create(['user_id'=>$user->id]);
    $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);

    $title = $workbook->title;

    $response = $this->get('/workbook/list/edit/'.$work->workbook_id, [
        'title' => $title,
    ]
    );
    $response->assertStatus(200);

    $this->assertDatabaseHas('workbooks', [
        'title' => $title,
    ]);
}

public function test_edit_work_successed(): void
{
    $user = User::factory()->create();
    $workbook = Workbook::factory()->create(['user_id'=>$user->id]);
    $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);

    $workbook_id = $workbook->workbook_id;
    $question = $work->question;
    $answer = $work->answer;
    $description = $work->description;
    $time_to_solve = $work->time_to_solve;

    $response = $this->post('/work/list/update/'.$work->id, [
        'workbook_id' => $workbook_id,
        'question' => $question,
        'answer' => $answer,
        'time_to_solve' => $time_to_solve
    ]
    );
    $response->assertStatus(200);

    $this->assertDatabaseHas('works', [
        'workbook_id' => $workbook_id,
        'question' => $question,
        'answer' => $answer,
        'time_to_solve' => $time_to_solve
    ]);
}

public function test_add_work_successed(): void
{
    $user = User::factory()->create();
    $workbook = Workbook::factory()->create(['user_id'=>$user->id]);
    $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);

    $workbook_id = $workbook->workbook_id;
    $question = $work->question;
    $answer = $work->answer;
    $description = $work->description;
    $time_to_solve = $work->time_to_solve;

    $response = $this->post('/create/work/add/'.$work->workbook_id, [
        'workbook_id' => $workbook_id,
        'question' => $question,
        'answer' => $answer,
        'time_to_solve' => $time_to_solve
    ]
    );
    $response->assertStatus(200);

    $this->assertDatabaseHas('works', [
        'workbook_id' => $workbook_id,
        'question' => $question,
        'answer' => $answer,
        'time_to_solve' => $time_to_solve
    ]);
}

public function test_work_analysis_successed(): void
{

    $response = $this->get('/workbook/analyse/list');
    $response->assertStatus(200);

}

public function test_work_analyse_successed(): void
{
    $user = User::factory()->create();
    $workbook = Workbook::factory()->create(['user_id'=>$user->id]);
    $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);

    $response = $this->get('/workbook/analyse/'.$work->workbook_id);
    $response->assertStatus(200);

}

public function test_work_start_successed(): void
{
    $user = User::factory()->create();
    $workbook = Workbook::factory()->create(['user_id'=>$user->id]);
    $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);
    $result = Result::factory()->create(['workbook_id'=>$workbook->workbook_id]);

    $response = $this->get('/workbook/solve/select/');
    $response->assertStatus(200);

    $response = $this->get('/workbook/solve/start/'.$work->workbook_id);
    $response->assertStatus(200);

    $response = $this->post('/workbook/solve/result/'.$work->workbook_id,[
        'workbook_id'=>$work->workbook_id,
        'result'=>$result->result,
    ]);
    $response->assertStatus(200);

    $this->assertDatabaseHas('results', [
        'workbook_id'=>$work->workbook_id,
        'result'=>$result->result,
        'date'=>$result->date,
    ]);


}

public function test_queries_successed(): void
{

    $user = User::factory()->create();
    $query = Query::factory()->create(['user_id'=>$user->id]);


    $this->actingAs($user);

    $response = $this->post('/query/send',[
        'user_id'=>$user->id,
        'name'=>$query->name,
        'email'=>$query->email,
        'content'=>$query->content,
    ]);
    $response->assertStatus(200);

    $this->assertDatabaseHas('queries', [
        'user_id'=>$user->id,
        'name'=>$query->name,
        'email'=>$query->email,
        'content'=>$query->content,
    ]);


}


}
