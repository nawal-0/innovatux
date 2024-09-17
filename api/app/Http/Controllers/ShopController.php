<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function home()
    {
        return view('home', ['drinks' => Shop::all()]);
    }

    public function addcart($id, Request $request)
    {
        $form = $request->validate([
            'quantity' => 'required|numeric'
        ]);

        $cart = session()->get('cart', []);
        if (isset($cart[$id])) {
            $cart[$id] = $cart[$id] + $form['quantity'];
        } else {
            $cart[$id] = $form['quantity'];
        }
       
        session()->put('cart', $cart);
        return redirect('/')->with('message', 'Item added to cart!');
    }

    public function cart()
    {
        $cart = session()->get('cart', []);
        $drinks = Shop::find(array_keys($cart));
        return view('cart', ['drinks' => $drinks, 'cart' => $cart]);
    }

    public function order(Request $request)
    {
        $form = $request->validate([
            'username' => 'required',
        ]);

        $cart = session()->get('cart', []);
        $drinks = Shop::find(array_keys($cart));
        $totalPrice = 0;
        $totalQuantity = 0;
        foreach ($drinks as $drink) {
            $totalQuantity += $cart[$drink->drink_id];
            $totalPrice += $drink->price * $cart[$drink->drink_id];
        }

        $user = User::where('username', $form['username'])->first();

        $order = new Order();
        $order->user_id = $user->id;
        $order->quantity = $totalQuantity;
        $order->total = $totalPrice;
        $order->save();

        session()->forget('cart');
        return redirect('/')->with('message', 'Order placed!');
    }
}
