<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function feedstore(Request $request)
    {
        $user = $request->user();
        $imagePath = $request->file('image')->store('posts', 'public');

        $post = new Post();
        $post->user_id = $user->id;
        $post->image_path = asset('storage/' . $imagePath); // Store the full path of the image
        $post->caption = $request->caption; 
        $post->save();
        $post->load('user');
        return response()->json($post, 201);
        
    }

    public function index()
    {
        $posts = Post::with('user')->latest()->get();
        return response()->json($posts, 200);
    }
}
