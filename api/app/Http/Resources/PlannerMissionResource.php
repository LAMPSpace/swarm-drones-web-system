<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlannerMissionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' =>$this->name,
            'swarm_id' => $this->swarm_id,
            'waypoints' => $this->waypoints,
            'status' => $this->status,
            'config' => $this->config,
            'swarm_name' => $this->swarm->name,
        ];
    }
}
