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
    <table class="w-full table-fixed text-sm text-left text-gray-500">
        <tbody>
            @foreach ($drinks as $drink)
            <tr class="odd:bg-white even:bg-gray-50 border-b">
                <td class="px-4 py-4">
                    <img class="w-14 rounded-md" src="{{ asset('storage/' . $drink->image) }}" alt="{{ $drink->name }} Image" />
                </td>
                <th scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ $drink->name }}
                </th>
                <td class="px-4 py-4">
                    ${{ $drink->price }}
                </td>
                <td class="px-4 py-4">
                    <form action="/cart/{{ $drink->drink_id }}" method="post">
                        @csrf
                    <input type="number" name="quantity" id="quantity" class="bg-gray-100 border border-gray-300 rounded w-full max-w-xs" value="1">
                </td>
                <td class="px-4 py-4 text-center">
                    {{-- <a href="#" class="font-medium text-blue-600 hover:underline">Add to Cart</a> --}}
                    <button class="font-medium text-blue-600 hover:underline">Add to Cart</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>

@if (session('message'))
<div id="message" class="fixed top-5 left-1/2 transform -translate-x-1/2 rounded-lg bg-emerald-900 max-w-xs text-center whitespace-nowrap text-white sm:px-40 px-16 py-3">
    <p>
      {{session('message')}}
    </p>
</div>
@endif


@endsection

<script>
    document.addEventListener('DOMContentLoaded', function () {
        var notification = document.getElementById('message');
        if (notification) {
            setTimeout(function () {
                notification.style.opacity = '0';
                setTimeout(function () {
                    notification.style.display = 'none';
                }, 500); 
            }, 3000);
        }
    });
</script>


