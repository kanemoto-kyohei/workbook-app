<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('works', function (Blueprint $table) {
            $table->id();
            $table->string('workbook_id');
            $table->string('question')->nullable(false);
            $table->json('options')->nullable(false);
            $table->string('answer')->nullable(false);
            $table->string('description')->nullable(true);
            $table->integer('time_to_solve')->nullable(true);

            $table->timestamps();

            $table->foreign('workbook_id')->references('workbook_id')->on('workbooks');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('works');
    }
};
