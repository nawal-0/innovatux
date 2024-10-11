<?php

namespace App\Http\Controllers;

use DateTime;
use Exception;
use App\Models\Input;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class HomeController
 *
 * This controller handles user inputs related to consumption and spending,
 * checks against user-defined thresholds, retrieves data for reporting,
 * and provides methods to calculate weekly data.
 *
 */
class HomeController extends Controller
{
    /**
     * Handles the input of user data.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function input(Request $request)
    {
        $input = new Input();
        $input->user_id = $request->user()->id;
        $input->quantity = $request->amount;
        $input->price = $request->price;
        
        if ($request->date) {
            $input->order_date = $request->date;
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

        // Check if notifications are enabled, then return the necessay alert
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

    /**
     * Checks if the user is within their consumption and price thresholds.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkLimit(Request $request)
    {
        list($startOfWeek, $endOfWeek) = $this->getStartAndEndOfWeek();

        // Retrieve total quantity and price for the current week
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

    /**
     * Gets the start and end dates of the week.
     *
     * @param int $offsetWeeks Number of weeks to offset from the current week
     * @return array An array containing the formatted start and end dates
     */
    function getStartAndEndOfWeek($offsetWeeks = 0)
    {
        $now = new DateTime();

        if ($offsetWeeks) {
            $now->modify("$offsetWeeks week");
        }
        
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

    /**
     * Retrieves user input data for the current week, grouped by day.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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
            /** 
             * Map date to day of the week
             * 
             * The code snippet (1. $order->day = new(DateTime())) below has been 
             * adapted from https://chat.openai.com/ with the query "Mapping dates to day". 
             * We mapped the days to monday instead of the default sunday.
             */ 
            $order->day = (new DateTime($order->order_date))->format('N');

            $orderData[] = [
                'day' => $daysOfWeek[$order->day - 1],
                'total_quantity' => $order->quantity,
                'total_price' => $order->price,
            ];
            //End of code snippet (1. $order->day = new(DateTime()))
        }
        return response()->json($orderData, 200);
    }

    /**
     * Retrieves total quantity and price for the previous week.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLastWeek(Request $request) {
        list($startOfWeek, $endOfWeek) = $this->getStartAndEndOfWeek(-1);

        $orders = Input::where('user_id', $request->user()->id)
        ->whereBetween('order_date', [$startOfWeek, $endOfWeek])
        ->selectRaw('sum(quantity) as total_quantity, sum(price) as total_price')
        ->first(); 

        // Set total quantity and price, defaulting to 0 if null
        $totalQuantity = $orders->total_quantity ?? 0;
        $totalPrice = $orders->total_price ?? 0;

        return response()->json(['total_quantity' => $totalQuantity, 'total_price' => $totalPrice], 200);
    }
}
