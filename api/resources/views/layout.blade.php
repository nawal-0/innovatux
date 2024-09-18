<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    
        @vite('resources/css/app.css')
        @vite(['resources/css/app.css','resources/js/app.js'])
        <link rel="stylesheet" href="{{  asset('build/assets/app-BW44QvBb.css') }}">

        <title>InnovaTUX Ordering System</title>

        
    </head>

    <body>
        @yield('content')
    </body>
</html>