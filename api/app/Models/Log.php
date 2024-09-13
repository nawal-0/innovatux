<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;

    protected $fillable = ['log_id', 'price', 'quantity', 'date'];

    public function user() {
        return $this->hasOne(User::class);
    }
}
