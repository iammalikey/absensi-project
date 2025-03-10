<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GenerateSlug;

class Employee extends Model
{
    use HasFactory, GenerateSlug;

    const TABLE = 'employees';
    protected $table = self::TABLE;

    protected $fillable = [
        'user_id',
        'full_name',
        'phone',
        'place_of_birth',
        'date_of_birth',
        'gender',
        'marital_status',
        'blood_type',
        'religion'
    ];
    
    public function getRouteKeyName(){
        return 'slug';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function division()
    {
        return $this->belongsTo(Division::class);
    }
}
