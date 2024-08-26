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
        Schema::create('friendlist', function (Blueprint $table) {
            $table->id('list_id');
            $table->foreignId('friends_id')->constrained('users');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('friendlist_id')->references('list_id')->on('friendlist');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friendlist');
    }
};
