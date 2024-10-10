<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class Community
 *
 * Represents a community within the application.
 * Manages the relationship between communities and users,
 * and provides access to community-related data.
 *
 */
class Community extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'communities';

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * The users that belong to the community.
     *
     * Defines a many-to-many relationship between Community and User models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'community_user')
                    ->withPivot('joined_at');
    }
}
