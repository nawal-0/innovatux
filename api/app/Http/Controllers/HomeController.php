<?php

namespace App\Http\Controllers;

use DateTime;
use Exception;
//use Carbon\Carbon;
use App\Models\Input;
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
        //Log::info('Starting retrieval...');
        // Get the start and end of the week
        list($startOfWeek, $endOfWeek) = $this->getStartAndEndOfWeek();

        $orders = Input::where('user_id', $request->user()->id)
            ->whereBetween('order_date', [$startOfWeek, $endOfWeek])
            ->groupBy('order_date')
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
