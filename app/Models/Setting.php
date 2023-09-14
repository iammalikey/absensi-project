<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    const TABLE = 'setting';
    
    protected $table = self::TABLE;

    protected $fillable = [
        'cta_title', 'cta_link'
    ];
}
