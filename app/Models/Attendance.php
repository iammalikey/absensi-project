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

    const STATUS_APPROVED = 'Approved';
    const STATUS_NEED_APPROVE = 'Need Approve';

    protected $fillable = [
        'user_id',
        'slug',
        'date',
        'clock_in',
        'clock_out',
        'clock_in_lat',
        'clock_in_long',
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

    public function scopeWithDistance($query, $officeLat, $officeLong)
    {
        return $query->select('*')
            ->selectRaw("
                (6371 * acos(
                    cos(radians(?)) * cos(radians(clock_in_lat)) * 
                    cos(radians(clock_in_long) - radians(?)) + 
                    sin(radians(?)) * sin(radians(clock_in_lat))
                )) AS distance", [$officeLat, $officeLong, $officeLat]);
    }
}
