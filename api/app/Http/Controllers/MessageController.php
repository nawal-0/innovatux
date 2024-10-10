<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Message;
use Illuminate\Http\Request;

/**
 * Class MessageController
 *
 * This controller manages messages within communities,
 * allowing users to post new messages and retrieve messages
 * for a specific community, optionally filtering by recent messages.
 *
 */
class MessageController extends Controller
{
    /**
     * Store a new message in the database.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // Create a new Message instance
        $message = new Message();
        $message->user_id = $user->id;
        $message->community_id = $request->community_id;
        $message->content = $request->content;
        $message->posted_at = now();
        $message->save();

        return response()->json(['message' => 'Message posted'], 200);
    }

    /**
     * Retrieve messages for a specific community.
     *
     * @param int $community_id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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
