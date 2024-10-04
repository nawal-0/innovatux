<?php

namespace App\Http\Controllers;

use DateTime;
use Exception;
//use Carbon\Carbon;
use App\Models\Input;
use App\Models\Settings;
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
        
        if ($request->order_date) {
            $input->order_date = $request->order_date;
        } else {
            $input->order_date = now()->toDateString();
        }
        $input->save();

        // Get the start and end of the week
        list($startOfWeek, $endOfWeek) = $this->getStartAndEndOfWeek();

        $orders = Input::where('user_id', $request->user()->id)
        ->whereBetween('order_date', [$startOfWeek, $endOfWeek])
        ->selectRaw('sum(quantity) as total_quantity, sum(price) as total_price')
        ->first(); 

        $totalQuantity = $orders->total_quantity ?? 0;
        $totalPrice = $orders->total_price ?? 0;

        $settings = Settings::where('user_id', $request->user()->id)->first();
        if ($settings->notification) {
            if ($settings->consumption_threshold < $totalQuantity && $settings->savings_threshold < $totalPrice) {
                return response()->json(['message' => 'Input added', 'warning' => 'You have exceeded the consumption and price threshold'], 201);
            }
            if ($settings->consumption_threshold < $totalQuantity) {
                return response()->json(['message' => 'Input added', 'warning' => 'You have exceeded the consumption threshold'], 201);
            }
            if ($settings->savings_threshold < $totalPrice) {
                return response()->json(['message' => 'Input added', 'warning' => 'You have exceeded the price threshold'], 201);
            }
        }

        return response()->json(['message' => 'Input added',], 201);
    }

    public function checkLimit(Request $request)
    {
        list($startOfWeek, $endOfWeek) = $this->getStartAndEndOfWeek();

        $orders = Input::where('user_id', $request->user()->id)
        ->whereBetween('order_date', [$startOfWeek, $endOfWeek])
        ->selectRaw('sum(quantity) as total_quantity, sum(price) as total_price')
        ->first(); 

        $totalQuantity = $orders->total_quantity ?? 0;
        $totalPrice = $orders->total_price ?? 0;

        $settings = Settings::where('user_id', $request->user()->id)->first();
        if ($settings->notification) {
            if ($settings->consumption_threshold < $totalQuantity && $settings->savings_threshold < $totalPrice) {
                return response()->json(['warning' => 'You have exceeded the consumption and price threshold'], 201);
            }
            if ($settings->consumption_threshold < $totalQuantity) {
                return response()->json(['warning' => 'You have exceeded the consumption threshold'], 201);
            }
            if ($settings->savings_threshold < $totalPrice) {
                return response()->json(['warning' => 'You have exceeded the price threshold'], 201);
            }
        }

        return response()->json(['message' => 'You are within the consumption and price threshold'], 201);
    }

    function getStartAndEndOfWeek()
    {
        $now = new DateTime();
        
        // Get the start of the week (Monday)
        $startOfWeek = clone $now->modify(('Monday' === $now->format('l')) ? 'this Monday' : 'last Monday');
        
        // Get the end of the week (Sunday)
        $endOfWeek = clone $startOfWeek;
        $endOfWeek->modify('next Sunday');

        // Format as necessary
        $startOfWeekFormatted = $startOfWeek->format('Y-m-d');
        $endOfWeekFormatted = $endOfWeek->format('Y-m-d');

        return [$startOfWeekFormatted, $endOfWeekFormatted];
    }


    public function retrieval(Request $request)
    {
        // Get the start and end of the week
        list($startOfWeek, $endOfWeek) = $this->getStartAndEndOfWeek();

        $orders = Input::where('user_id', $request->user()->id)
            ->whereBetween('order_date', [$startOfWeek, $endOfWeek])->groupBy('order_date')
            ->selectRaw('order_date, sum(quantity) as quantity, sum(price) as price')
            ->get();

        // Map the day numbers to actual days
        $daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        $orderData = [];
        
        
        foreach ($orders as $order) {
            // Map date to day of the week
            $order->day = (new DateTime($order->order_date))->format('N');

            $orderData[] = [
                'day' => $daysOfWeek[$order->day - 1], // Map 1-7 to the correct day of the week
                'total_quantity' => $order->quantity,
                'total_price' => $order->price,
            ];
        }
        return response()->json($orderData, 200);
    }
}
