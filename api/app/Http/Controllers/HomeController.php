<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Input;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        // Get the start and end of this week (Monday to;; Sunday)
        $startOfWeek = Carbon::now()->startOfWeek(Carbon::MONDAY)->format('Y-m-d');  // Monday
        $endOfWeek = Carbon::now()->endOfWeek(Carbon::SUNDAY)->format('Y-m-d');      // Sunday

        // Retrieve the orders grouped by day of the week
        //$orders = Input::whereBetween('order_date', [$startOfWeek, $endOfWeek])->get();

        $orders = $orders = DB::select(
            'SELECT * FROM alcohol_input WHERE order_date BETWEEN ? AND ?',
            [$startOfWeek, $endOfWeek]
        );
        

        // Map the day numbers to actual days
        $daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        $orderData = [];
        
        foreach ($orders as $order) {
            $orderData[] = [
                //'day' => $daysOfWeek[$order->day - 1], // Map 1-7 to the correct day of the week
                'total_quantity' => $order->total_quantity,
                'total_price' => $order->total_price,
            ];
        }

        //return response()->json($orderData, 200);
        return response()->json($orders, 200);
    }
}
