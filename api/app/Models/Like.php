<?php

namespace App\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class Like
 *
 * Represents a 'like' action made by a user on a post.
 * This model defines the relationship between users and posts
 * through the 'like' functionality. It records which users 
 * have liked which posts, with features like counting 
 * likes and checking if a user has liked a post.
 *
 */
class Like extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'post_id'
    ];

    /**
     * Get the user who liked the post.
     *
     * Defines an inverse one-to-many relationship 
     * between Like and User models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the post that was liked.
     *
     * Defines an inverse one-to-many relationship 
     * between Like and Post models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
