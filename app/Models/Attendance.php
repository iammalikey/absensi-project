<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GenerateSlug;

class Attendance extends Model
{
    use HasFactory, GenerateSlug;

    const TABLE = 'attendances';
    protected $table = self::TABLE;

    protected $fillable = [
        'user_id',
        'slug',
        'date',
        'clock_in',
        'clock_out',
        'clock_in_location',
        'category',
        'status',
    ];
    
    public function getRouteKeyName(){
        return 'slug';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
