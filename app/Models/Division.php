<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\GenerateSlug;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Division extends Model
{
    use HasFactory, GenerateSlug;

    const TABLE = 'divisions';
    protected $table = self::TABLE;

    protected $fillable = [
        'title',
        'slug'
    ];
    
    public function getRouteKeyName(){
        return 'slug';
    }

    public function employee()
    {
        return $this->hasMany(Employee::class);
    }
}
