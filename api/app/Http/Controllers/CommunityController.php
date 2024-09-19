<?php

namespace App\Http\Controllers;

use Log;
use Exception;
use App\Models\Community;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommunityController extends Controller
{
    public function index(Request $request) {
        $communities = Community::all();
        return response()->json($communities, 200);
    }

    public function join(Request $request) {

        try {
        //echo($request);
        $user = $request->user();
        $community = Community::find($request->community_id);
        if ($community) {
            $isMember = $user->communities()->where('community_id', $community->id)->exists();
            if($isMember) { 
                return response()->json(['message' => 'User already in the community'], 200);
            } else {
                $user->communities()->attach($community->id);
                return response()->json(['message' => 'Successfully joined community'], 200);
            }
        } else {
            return response()->json(['message' => 'Community not found'], 404);
        }
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function isUserInGroup(Request $request)
    {
    //$user = Auth::user(); //double check this later XD
    $user = $request->user();
    // Check if the user is already a member of the group
    $isMember = $user->communities()->where('community_id', $request->community_id)->exists();

    return response()->json(['is_member' => $isMember], 200);
    }


}

