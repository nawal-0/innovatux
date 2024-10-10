<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateAlcoholInputTable
 *
 * This migration creates the 'alcohol_input' table, 
 * which records user inputs related to alcohol consumption.
 * Each record stores the user's ID, the price spent, 
 * the quantity consumed, and the date of the consumption.
 *
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('alcohol_input', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('user_id')->constrained('users');
            $table->decimal('price', 8, 2);
            $table->integer('quantity');
            $table->date('order_date')->default(now());
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
