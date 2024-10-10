<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FriendsList
 *
 * Represents a friendship relationship between users in the application.
 * Manages the friend list functionality by storing pairs of user IDs
 * that indicate a friendship connection.
 *
 */
class FriendsList extends Model
{
    use HasFactory;

    protected $table = 'friendlist';

    protected $fillable = [
        'user_id',
        'friend_id',
    ];
}
