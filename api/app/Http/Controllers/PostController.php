<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function feedstore(Request $request)
    {
        try {
        $user = $request->user();
        $imagePath = $request->file('image')->store('posts', 'public');

        $post = new Post();
        $post->user_id = $user->id;
        $post->image_path = $imagePath; // Store the path of the image
        $post->caption = $request->caption; // Store the caption (optional)
        $post->likes_count = 0;
        $post->save();
        return response()->json($post, 201);
        } 
        catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
       
    }

    public function index()
    {
        $posts = Post::with('user')->get();;
        return response()->json($posts);
    }
}
