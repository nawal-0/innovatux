<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateSettingsTable
 *
 * This migration creates the 'settings' table, 
 * which stores user-specific settings.
 * The table includes foreign key references to 
 * the 'users' table and contains fields for the user's goal, 
 * consumption and savings thresholds, notification preference,
 *  and visibility setting.
 *
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('goal');
            $table->integer('consumption_threshold');
            $table->integer('savings_threshold');
            $table->boolean('notification')->default(true);
            $table->boolean('public')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
