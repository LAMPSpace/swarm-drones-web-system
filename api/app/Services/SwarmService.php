<?php

namespace App\Services;

use App\Models\Swarm;
use App\Traits\DataTableTrait;

class SwarmService
{
    use DataTableTrait;

    protected ?Swarm $swarm;

    public function __construct(Swarm $swarm)
    {
        $this->swarm = $swarm;
    }

    public function store(array $data)
    {
        $data['owner_id'] = auth()->user()->id;
        return $this->swarm::create($data);
    }

    protected function getSortableFields(): array
    {
        return [
            'name',
            'owner_id'
        ];
    }

    protected function getSearchableFields(): array
    {
        return [
            'name',
            'owner_id'
        ];
    }

    public function get(array $data)
    {
        $user = auth()->user();

        if ($user->isAdmin() && isset($data['show_all'])) {
            return $this->getPaginatedData(
                $this->swarm::query(),
                $data
            );
        }

        return $this->getPaginatedData(
            $user->swarms()->with('owner')->getQuery(),
            $data
        );
    }
}
