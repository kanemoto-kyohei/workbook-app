<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Work>
 */
class WorkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'workbook_id'=>Str::random(32),
            'question'=>Str::random(32),
            'options' => json_encode([
                Str::random(32),
                Str::random(32),
                Str::random(32),
            ]),            
            'answer'=>1,
            'description'=>Str::random(32),
            'time_to_solve'=>fake()->randomNumber(1),
        ];
    }
}
