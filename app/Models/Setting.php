<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    const TABLE = 'setting';
    const CHALLENGE_SLUG = 'challenge';
    
    protected $table = self::TABLE;

    protected $fillable = [
        'name',
        'slug',
        'cta_title',
        'cta_link',
    ];
}
