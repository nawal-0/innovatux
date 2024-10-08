<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FriendsList extends Model
{
    use HasFactory;

    protected $table = 'friendlist';

    protected $fillable = [
        'user_id',
        'friend_id',
    ];


}
