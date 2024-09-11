<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
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
}

