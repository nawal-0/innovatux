<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class Settings
 *
 * Represents user-specific settings within the application.
 * This model stores settings related to the user's goals,
 * consumption and savings thresholds, notification preferences,
 * and privacy settings.
 *
 */
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

    /**
    * Get the user that owns the settings.
    *
    * Defines an inverse one-to-one relationship 
    * between Settings and User models.
    *
    * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
    */
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
