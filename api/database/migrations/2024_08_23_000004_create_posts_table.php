<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreatePostsTable
 *
 * This migration creates the 'posts' table, 
 * which stores posts made by users.
 * Each post contains a caption, an image path, 
 * and keeps track of the number of likes.
 * It also establishes a foreign key r
 * elationship with the 'users' table.
 *
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->text('caption');

            /** The code snippet (1. Storing Image) below has been sourced 
            * from https://chat.openai.com/ with the query 
            * "How to store image in mySQL". 
            * The code snippet appears in its original form
            */
            $table->string('image_path');
            // End of code snippet (1. Storing Image)
            
            $table->integer('likes_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
