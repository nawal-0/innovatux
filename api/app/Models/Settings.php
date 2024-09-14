<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Settings extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'goal',
        'consumption_threshold',
        'savings_threshold',
        'notification',
        'public',
    ];  

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // notifcation accessor (return boolean)
    public function getNotificationAttribute($value)
    {
        return (bool) $value;
    }

    // notification mutator (save as integer)
    public function setNotificationAttribute($value)
    {
        $this->attributes['notification'] = (bool) $value;
    }

    // public accessor (return boolean)
    public function getPublicAttribute($value)
    {
        return (bool) $value;
    }

    // public mutator (save as integer)
    public function setPublicAttribute($value)
    {
        $this->attributes['public'] = (bool) $value;
    }
}
