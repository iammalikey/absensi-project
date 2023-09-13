<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Klasemen extends Model
{
    use HasFactory;

    const TABLE = 'klasemen';

    const TIM_NIAT_SLUG = 'tim-niat';
    const TIM_SATSET_SLUG = 'tim-satset';

    protected $table = self::TABLE;

    protected $fillable = [
        'title', 'slug', 'score', 'cta_title', 'cta_link'
    ];
}
