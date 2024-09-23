<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        $message = new Message();
        $message->user_id = $user->id;
        $message->community_id = $request->community_id;
        $message->content = $request->content;
        $message->posted_at = now();
        $message->save();
        return response()->json(['message' => 'Message posted'], 200);
    }

    public function index($community_id, Request $request)
    {
        $query = Message::where('community_id', $community_id);
        if ($request->has('after')) {
            $query->where('id', '>', $request->after);
        }
        $messages = $query->with('user')->get();
        return response()->json($messages, 200);
    }
    
}
