<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Input
 *
 * Represents an alcohol consumption input made by a user.
 * This model stores data related to the user's alcohol intake,
 * including the quantity consumed, the price paid, and the date of the order.
 *
 */
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