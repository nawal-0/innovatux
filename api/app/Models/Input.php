<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Input extends Model
{
    protected $table = 'alcohol_input';
    use HasFactory;

    protected $fillable = [
        'user_id',
        'price',
        'quantity',
        'order_date'
    ];
}
