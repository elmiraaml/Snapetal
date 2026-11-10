<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $fillable = [
        'creator_id',
        'name',
        'image_url',
        'config',
        'status',
    ];

    // Relasi ke User (Creator)
    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}