@extends('layout')
@section('content')
    
<header>
    <nav class="bg-emerald-950 px-4 py-2.5">
        <div class="container mx-auto flex justify-between items-center">
            
            <a href="/" class="font-bold text-white">InnovaTUX Ordering System</a>
               
            <a href="/cart" class="font-medium text-white">View Cart</a>
                   
        </div>
    </nav>
</header>

<div class="relative overflow-x-auto shadow-md rounded-lg mx-4 mt-4">
    <table class="w-full table-fixed text-sm text-center text-gray-500">
        <thead>
            <tr class="bg-emerald-950 text-white">
                <th class="px-4 py-4">Item</th>
                <th class="px-4 py-4">Quantity</th>
                <th class="px-4 py-4">Total Price</th>
            </tr>
        <tbody>
            @forelse ($drinks as $drink)
            <tr class="odd:bg-white even:bg-gray-50 border-b">
                <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ $drink->name }}
                    <img class="w-14 rounded-md mx-auto mt-2" src="{{ asset('storage/' . $drink->image) }}" alt="{{ $drink->name }} Image" />
                </th>
                <td class="px-4 py-4">
                    {{ $cart[$drink->drink_id] }}
                </td>
                <td class="px-4 py-4">
                    ${{ $cart[$drink->drink_id] * $drink->price }}
                </td>
            </tr>

            @empty
            <tr>
                <td class="px-4 py-4 text-center" colspan="3">
                    Your cart is empty.
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>

@if (!empty($cart))
<div>
    <div class="flex justify-center mt-4">
            <button data-modal-target="modal" data-modal-toggle="modal" class="bg-emerald-950 hover:bg-green-800 text-white px-4 py-2 rounded-md">Checkout</button>
    </div>
</div>


  <!-- Main modal -->
<div id="modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
            <!-- Modal header -->
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 class="text-xl font-semibold text-gray-900">
                    Checkout
                </h3>
                <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-4 md:p-5">
                <form action="/order" method="POST">
                @csrf
                    <div>
                        @php
                            $totalPrice = 0;
                            foreach ($drinks as $drink) {
                                $totalPrice += $cart[$drink->drink_id] * $drink->price;
                            }
                        @endphp
                        <label class="block mb-4 text-lg font-medium text-gray-900">Total Price: ${{ $totalPrice }}</label>
                    </div>
                                
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900">Link Your BoozeCTRL Account</label>
                        <input name="username" class="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Username"/>
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Order - Go To Payment</button>

                </form>
            </div>
        </div>
    </div>
</div> 
@endif