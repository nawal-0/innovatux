<?php

namespace App\Models;

use App\Models\Like;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    private function isLikedByUser(User $user)
    {
        return $this->likes->contains('user_id', $user->id);
    }

    public function getIsLikedAttribute()
    {
        $user = auth()->user();
        if ($user) {
            return $this->isLikedByUser($user);
        }
        return false; 
    }
}
