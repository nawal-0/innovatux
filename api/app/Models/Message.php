<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Message
 *
 * Represents a message posted by a user within a community.
 * This model handles the storage and retrieval of messages,
 * including relationships to the user who posted the message
 * and the community where it was posted.
 *
 */
class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';

    protected $fillable = [
        'user_id',
        'community_id',
        'content',
        'posted_at',
    ];

    /**
     * Get the user who posted the message.
     *
     * Defines an inverse one-to-many relationship 
     * between Message and User models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the community where the message was posted.
     *
     * Defines an inverse one-to-many relationship 
     * between Message and Community models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function community()
    {
        return $this->belongsTo(Community::class);
    }
}
