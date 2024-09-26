<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Input;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function input(Request $request)
    {
        $input = new Input();
        $input->user_id = $request->user()->id;
        $input->quantity = $request->amount;
        $input->price = $request->price;
        $input->order_date = $request->date;
        $input->save();

        return response()->json(['message' => 'Input added',], 201);
    }

    public function retrieval()
    {
        // glenn's problem
    }
}
