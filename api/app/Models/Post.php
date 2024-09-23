<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts';

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
}
