<?php

namespace App\Models;

use App\Models\Like;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class Post
 *
 * Represents a post made by a user, containing an image and a caption.
 * This model handles the storage and retrieval of posts, 
 * manages relationships to the user who created the post and the 
 * likes associated with the post, and includes functionality to check 
 * if the post is liked by the authenticated user.
 *
 */
class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $appends = ['is_liked'];

    protected $fillable = [
        'user_id',
        'image_path',
        'caption',
        'likes_count'
    ];

    /**
     * Get the user who created the post.
     *
     * Defines an inverse one-to-many relationship 
     * between Post and User models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the likes associated with the post.
     *
     * Defines a one-to-many relationship 
     * between Post and Like models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /**
     * Check if the post is liked by a specific user.
     *
     * This is a private helper method used internally to determine
     * if the given user has liked the post.
     *
     * @param \App\Models\User $user
     * @return bool
     */
    private function isLikedByUser(User $user)
    {
        return $this->likes->contains('user_id', $user->id);
    }

    /**
     * Accessor for the 'is_liked' attribute.
     *
     * Determines if the authenticated user has liked the post and appends
     * this boolean value to the model's array.
     *
     * @return bool
     */
    public function getIsLikedAttribute()
    {
        $user = auth()->user();
        if ($user) {
            return $this->isLikedByUser($user);
        }
        return false; 
    }
}
