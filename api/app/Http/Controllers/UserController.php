<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Fact;
use App\Models\User;
use Illuminate\Http\Request;
use IIluminate\Support\Facades\Auth;

/**
 * Class UserController
 *
 * This controller handles user-related operations,
 * including authentication (login and logout), user registration,
 * retrieving user information, managing user settings and preferences,
 * handling follow/unfollow actions, and fetching facts based on user goals.
 *
 */
class UserController extends Controller
{
    /**
     * Authenticate a user and issue an access token.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request) {
        $user = User::where('email', $request->email)
            ->orWhere('username', $request->email)
            ->first();
        if ($user && password_verify($request->password, $user->password)) {
            $token = $user->createToken('token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token], 200);
        } else {
            return response()->json(['message' => 'Invalid Email or Password.'], 401);
        }
    }

    /**
     * Log out the authenticated user by revoking their tokens.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    /**
     * Register a new user and issue an access token.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function signup(Request $request) {
        $request['password'] = bcrypt($request->password);
        $user = User::create($request->all());
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token], 201);
    }

    /**
     * Retrieve the authenticated user's information.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser(Request $request) {
        return response()->json($request->user(), 200);
    }

    /**
     * Retrieve the authenticated user's settings.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSettings(Request $request) {
        return response()->json($request->user()->settings, 200);
    }

    /**
     * Create or update the authenticated user's preferences.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createPreference(Request $request) {
        $settings = $request->user()->settings()->updateOrCreate(
            ['user_id' => $request->user()->id], // check if user already has settings
            $request->all()
        );

        return response()->json(['message' => 'Preferences added'], 201);
    }

    /**
     * Change the authenticated user's password.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request) {
        $user = $request->user();
        if (password_verify($request->old_password, $user->password)) {
            $user->password = bcrypt($request->new_password);
            $user->save();
            return response()->json(['message' => 'Password changed successfully'], 200);
        } else {
            return response()->json(['message' => 'Invalid old password'], 401);
        }
    }

    /**
     * Follow another user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function follow(Request $request) {
        $user = $request->user();
        $user->following()->attach($request->user_id);
        return response()->json(['message' => 'User followed'], 201);
    }

    /**
     * Unfollow a user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function unfollow(Request $request) {
        $user = $request->user();
        $user->following()->detach($request->user_id);
        return response()->json(['message' => 'User unfollowed'], 200);
    }

    /**
     * Get the list of users who follow the authenticated user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFollowers(Request $request) {
        $user = $request->user();
        return response()->json($user->followers()->get(), 200);
    }

    /**
     * Get the list of users the authenticated user is following.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFollowing(Request $request) {
        $user = $request->user();
        return response()->json($user->following()->get(), 200);
    }

    /**
     * Retrieve facts based on the user's goal settings.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFacts(Request $request) {
        $user = $request->user();
        $settings = $user->settings()->first();
        $goal = $settings->goal;
        $facts = Fact::where('goal', $goal)->get();
        return response()->json($facts, 200);
    }

    /**
     * Retrieve a list of all users.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index() {
        return response()->json(User::all(), 200);
    }
}

