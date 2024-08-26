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
        Schema::create('alcohol_log', function (Blueprint $table) {
            $table->id('log_id');
            $table->decimal('price', 8, 2);
            $table->integer('quantity');
            $table->date('date');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('log_id')->references('log_id')->on('alcohol_log');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alcohol_log');
    }
};
