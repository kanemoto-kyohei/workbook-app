<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PublicResult>
 */
class PublicResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::factory()->create();

        return [
            //
            'user_id'=>$user->id,
            'workbook_id'=>Str::random(32),
            'result'=>fake()->randomNumber(1),
            'difficulty'=>fake()->randomNumber(1),
        ];
    }
}
