<?php

namespace App\Http\Controllers;

use Log;
use Exception;
use App\Models\Community;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class CommunityController
 *
 * This controller manages community-related operations,
 * including listing communities, allowing users to join communities,
 * and checking if a user is a member of specific communities.
 *
 */
class CommunityController extends Controller
{
    /**
     * Display a listing of all communities.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request) {
        $communities = Community::all();
        return response()->json($communities, 200);
    }

    /**
     * Allow a user to join a community.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function join(Request $request) {
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
    }

    /**
     * Check if the authenticated user is a member of each community.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function isUserInGroup(Request $request)
    {
        $user = $request->user();
        $communities = Community::all();
        $membership = [];
        foreach ($communities as $community) {
            $isMember = $user->communities()->where('community_id', $community->id)->exists();
            $membership[$community->id] = $isMember;
        }
        return response()->json($membership, 200);
    }
}