<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\User;
use App\Models\Input;
use Illuminate\Http\Request;

/**
 * Class ShopController
 *
 * This controller handles the shop functionality,
 * including displaying available drinks, managing the shopping cart,
 * and processing orders.
 *
 */
class ShopController extends Controller
{
    /**
     * Display the home page with a list of all available drinks.
     *
     * @return \Illuminate\View\View
     */
    public function home()
    {
        return view('home', ['drinks' => Shop::all()]);
    }

    /**
     * Add a drink to the shopping cart.
     *
     * @param int $id The ID of the drink to add to the cart
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function addcart($id, Request $request)
    {
        $form = $request->validate([
            'quantity' => 'required|numeric'
        ]);

        $cart = session()->get('cart', []);

        // Check if the drink is already in the cart
        if (isset($cart[$id])) {
            $cart[$id] = $cart[$id] + $form['quantity'];
        } else {
            $cart[$id] = $form['quantity'];
        }
        session()->put('cart', $cart);

        return redirect('/')->with('message', 'Item added to cart!');
    }

    /**
     * Display the shopping cart with the selected drinks and quantities.
     *
     * @return \Illuminate\View\View
     */
    public function cart()
    {
        $cart = session()->get('cart', []);
        $drinks = Shop::find(array_keys($cart));

        return view('cart', ['drinks' => $drinks, 'cart' => $cart]);
    }

    /**
     * Process the order, save it to the database, and clear the cart.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function order(Request $request)
    {
        $form = $request->validate([
            'username' => 'required',
        ]);

        $cart = session()->get('cart', []);
        $drinks = Shop::find(array_keys($cart));

        $totalPrice = 0;
        $totalQuantity = 0;

        // Calculate total price and quantity
        foreach ($drinks as $drink) {
            $totalQuantity += $cart[$drink->drink_id];
            $totalPrice += $drink->price * $cart[$drink->drink_id];
        }

        $user = User::where('username', $form['username'])->first();

        // Create a new order (Input)
        $order = new Input();
        $order->user_id = $user->id;
        $order->quantity = $totalQuantity;
        $order->price = $totalPrice;
        $order->save();

        session()->forget('cart');

        return redirect('/')->with('message', 'Order placed!');
    }
}
