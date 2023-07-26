<?php

namespace Tests\Feature\Workbook;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Work;
use App\Models\Workbook;
use App\Models\PublicResult;
use Illuminate\Support\Facades\Auth; 


class PublicTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_publicate_private_success(): void
    {
        $user = User::factory()->create();
        $workbook = Workbook::factory()->create(['user_id'=>$user->id]);
        $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);

        $is_public = $workbook->is_public;

        $this->actingAs($user)->get('/workbook/public/'. $workbook->workbook_id);

        $response = $this->get('/workbook/public/'. $workbook->workbook_id);
        $response->assertStatus(200);
        $this->assertDatabaseHas('workbooks', [
            'is_public'=>true
        ]);

        $response = $this->get('/workbook/private/'. $workbook->workbook_id);
        $this->assertDatabaseHas('workbooks', [
            'is_public'=>false
        ]);



    
        }

        public function test_public_start_successed(): void
{
    $user = User::factory()->create();
    $workbook = Workbook::factory()->create(['user_id'=>$user->id]);
    $work = Work::factory()->create(['workbook_id'=>$workbook->workbook_id]);
    $result = PublicResult::factory()->create(['workbook_id'=>$workbook->workbook_id]);

    $this->actingAs($user);
    $user_id = Auth::id();

    $response = $this->get('/workbook/public/display/all');
    $response->assertStatus(200);

    $response = $this->get('/workbook/public/solve/start/'.$work->workbook_id);
    $response->assertStatus(200);

    $response = $this->post('/workbook/public/solve/result/'.$work->workbook_id,[
        'user_id'=>$user_id,
        'workbook_id'=>$work->workbook_id,
        'result'=>$result->result,
        'difficulty'=>$result->difficulty,
    ]);
    $response->assertStatus(200);

    $this->assertDatabaseHas('public_results', [
        'workbook_id'=>$work->workbook_id,
        'result'=>$result->result,
        'difficulty'=>$result->difficulty,
    ]);

    $response = $this->post('/workbook/public/solve/result/ranking/'.$work->workbook_id);
    $response->assertStatus(200);


}
}