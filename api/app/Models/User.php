<?php

namespace App\Models;

use App\Models\Like;
use App\Models\Post;
use App\Models\Settings;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class User
 *
 * Represents a user of the application.
 * Extends Laravel's Authenticatable class to provide authentication features.
 * Includes relationships to settings, communities, 
 * followers, following, posts, and likes.
 *
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'age',
        'gender',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the settings associated with the user.
     *
     * Defines a one-to-one relationship between User and Settings models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function settings()
    {
        return $this->hasOne(Settings::class);
    }

    /**
     * Get the communities the user belongs to.
     *
     * Defines a many-to-many relationship between User and Community models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function communities(): BelongsToMany
    {
        return $this->belongsToMany(Community::class, 'community_user')
                    ->withPivot('joined_at');
    }

    /**
     * Get the users who follow this user.
     *
     * Defines a many-to-many self-referential relationship to represent followers.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'friendlist', 'friends_id', 'user_id');
    }

    /**
     * Get the users this user is following.
     *
     * Defines a many-to-many self-referential relationship to represent following.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function following(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'friendlist', 'user_id', 'friends_id');
    }

    /**
     * Get the posts created by the user.
     *
     * Defines a one-to-many relationship between User and Post models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    /**
     * Get the likes made by the user.
     *
     * Defines a one-to-many relationship between User and Like models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
