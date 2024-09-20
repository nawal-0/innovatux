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

    public function index($community_id)
    {
        $messages = Message::where('community_id', $community_id)->get();
        return response()->json($messages, 200);
    }

    public function streamMessages($community_id)
    {
        $response = response()->stream(function () use ($community_id) {
            while (true) {
                $messages = Message::where('community_id', $community_id)->where('posted_at', '>', now()->subSeconds(10))->get();

                if ($messages->count() > 0) {
                    echo "data: " . json_encode($messages) . "\n\n";
                    ob_flush();
                    flush();
                }

                sleep(3);

            }

           
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive',
        ]);
    }
}
