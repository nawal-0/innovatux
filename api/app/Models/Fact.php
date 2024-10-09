<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fact extends Model
{

    protected $fillable = [
        'goal', 
        'title', 
        'fact'];

    public $timestamps = false;
}
