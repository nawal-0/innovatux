<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Shop
 *
 * Represents an item available in the shop.
 * This model handles the storage and retrieval of shop items,
 * including details such as the item's name, image, and price.
 *
 */
class Shop extends Model
{
    use HasFactory;

    protected $table = 'shop';
    protected $primaryKey = 'drink_id';

    protected $fillable = [
        'name',
        'image',
        'price',
    ];
}
