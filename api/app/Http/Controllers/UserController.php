<?php

namespace App\Http\Controllers;

use Exception;
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
        // $request->validate([
        //     'first_name' => 'required',
        //     'last_name' => 'required',
        //     'email' => 'required|email|unique:users',
        //     'username' => 'required|unique:users',
        //     'age' => 'required',
        //     'gender' => 'required',
        //     'password' => 'required'
        // ]);

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
        // $settings = $request->user()->settings()->create($request->all());
        // return response()->json($settings, 201);


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


}

