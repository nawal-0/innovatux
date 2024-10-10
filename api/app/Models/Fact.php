<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Fact
 *
 * Represents a facts related to a specific goal.
 * This model stores facts that can be associated with user goals.
 *
 */
class Fact extends Model
{
    protected $fillable = [
        'goal', 
        'title', 
        'fact'];

    public $timestamps = false;
}
