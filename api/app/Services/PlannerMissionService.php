<?php

namespace App\Services;

use App\Models\PlannerMission;
use App\Traits\DataTableTrait;

class PlannerMissionService
{
    use DataTableTrait;

    protected ?PlannerMission $plannerMission;

    public function __construct(PlannerMission $plannerMission)
    {
        $this->plannerMission = $plannerMission;
    }

    public function store(array $data)
    {
//        $data['waypoints'] = json_encode($data['waypoints']);
        return $this->plannerMission::create($data);
    }

    public function update(array $data, int $id)
    {
        $plannerMission = $this->plannerMission::findOrFail($id);
        $plannerMission->update($data);
        return $plannerMission;
    }

    public function get(array $data)
    {
        return $this->getPaginatedData(
            $this->plannerMission->getQuery(),
            $data
        );
    }

    protected function getSortableFields(): array
    {
        return [
            'name',
            'status'
        ];
    }

    protected function getSearchableFields(): array
    {
        return [
            'name',
            'status'
        ];
    }
}
