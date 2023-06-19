<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Swarm extends Model
{
    use HasFactory;

    public const IS_CONNECTED = 'Y';
    public const IS_DISCONNECTED = 'N';

    protected $fillable = [
        'name',
        'image',
        'is_connected',
        'config',
        'owner_id',
        'ip_address',
        'port',
    ];

    protected $casts = [
        'config' => 'array'
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
