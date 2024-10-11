<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Post;
use Illuminate\Http\Request;

/**
 * Class PostController
 *
 * This controller handles operations related to posts,
 * including creating new posts, retrieving posts for display,
 * and managing likes on posts.
 *
 */
class PostController extends Controller
{
    /**
     * Store a new post in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function feedstore(Request $request)
    {
        $user = $request->user();

        /**
         * The code snippet (1. Storing Image) below has been sourced 
         * from https://chat.openai.com/ with the query 
         * "How to store image in mySQL". 
         * The code snippet appears in its original form
         */
        $imagePath = $request->file('image')->store('posts', 'public');

        $post = new Post();
        $post->user_id = $user->id;

        // Store the full path of the image
        $post->image_path = asset('storage/' . $imagePath);
        // End of code snippet (1. Storing Image)
        
        $post->caption = $request->caption; 
        $post->save();
        $post->load('user');

        return response()->json($post, 201);
    }

    /**
     * Retrieve all posts.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPosts(Request $request)
    {
        $posts = Post::with('user')->latest()->get();
        return response()->json($posts, 200);
    }

    /**
     * Handles liking or unliking a post.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function likePost(Request $request)
    {
        $post = Post::where('id', $request->post_id)->first();
        $user = $request->user();
        $like = $post->likes()->where('user_id', $user->id)->first();

        if ($like) {
            // If a like exists, remove it (unlike the post)
            $like->delete();
            $post->likes_count = $post->likes()->count();
            $post->save();

            return response()->json($post, 200);
        } else {
            // If no like exists, create a new like (like the post)
            $post->likes()->create(['user_id' => $user->id]);
            $post->likes_count = $post->likes()->count();
            $post->save();

            return response()->json($post, 201);
        }
    }
}