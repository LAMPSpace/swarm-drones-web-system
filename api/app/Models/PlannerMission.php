<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlannerMission extends Model
{
    use HasFactory;



    protected $fillable = [
        'name',
        'swarm_id',
        'waypoints',
        'status',
        'config'
    ];
}
