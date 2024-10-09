<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Fact;
use App\Models\User;
use Illuminate\Http\Request;
use IIluminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(Request $request) {
        $user = User::where('email', $request->email)->orWhere('username', $request->email)
            ->first();
        if ($user && password_verify($request->password, $user->password)) {
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token], 200);
        } else {
            return response()->json(['message' => 'Invalid Email or Password. Sucks to be YOU !!'], 401);
        }
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out'], 200);
    }

    public function signup(Request $request) {
        $request['password'] = bcrypt($request->password);
        $user = User::create($request->all());
        $token = $user->createToken('token')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token], 201);
    }

    public function getUser(Request $request) {
        return response()->json($request->user(), 200);
    }

    public function getSettings(Request $request) {
        return response()->json($request->user()->settings, 200);
    }

    public function createPreference(Request $request) {
        try {
            $settings = $request->user()->settings()->updateOrCreate(
                ['user_id' => $request->user()->id], // check if user already has settings
                $request->all()
            );
            return response()->json(['message' => 'Preferences added'], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

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

    public function follow(Request $request) {
        $user = $request->user();
        $user->following()->attach($request->user_id);
        return response()->json(['message' => 'User followed'], 201);
    }

    public function unfollow(Request $request) {
        $user = $request->user();
        $user->following()->detach($request->user_id);
        return response()->json(['message' => 'User unfollowed'], 200);
    }

    public function getFollowers(Request $request) {
        $user = $request->user();
        return response()->json($user->followers()->get(), 200);
        
    }

    public function getFollowing(Request $request) {
        $user = $request->user();
        return response()->json($user->following()->get(), 200);

    }

    public function getFacts(Request $request) {
        $user = $request->user();
        $settings = $user->settings()->first();
        $goal = $settings->goal;
        $facts = Fact::where('goal', $goal)->get();
        return response()->json($facts, 200);
    }

    public function index() {
        return response()->json(User::all(), 200);
    }


}

