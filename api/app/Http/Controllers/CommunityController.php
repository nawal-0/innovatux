<?php

namespace App\Http\Controllers;

use Log;
use Exception;
use App\Models\Community;
use Illuminate\Http\Request;
use IIluminate\Support\Facades\Auth;

class CommunityController extends Controller
{
    public function index(Request $request) {
        $communities = Community::all();
        return response()->json($communities, 200);
    }

    public function join(Request $request) {

        try {
        $user = $request->user();
        $community = Community::find($request->community_id);
        if ($community) {
            $user->communities()->attach($community->id);
            return response()->json(['message' => 'Successfully joined community'], 200);
        } else {
            return response()->json(['message' => 'Community not found'], 404);
        }
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }



}

