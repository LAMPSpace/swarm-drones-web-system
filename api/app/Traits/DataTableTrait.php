<?php

namespace App\Traits;

trait DataTableTrait
{
    abstract protected function getSortableFields();
    abstract protected function getSearchableFields();

    public function sortQuery($query, $sort, $order = 'asc')
    {
        if (!in_array($sort, $this->getSortableFields())) {
            return $query;
        }

        return $query->orderBy($sort, $order);
    }

    public function searchQuery($query, $search)
    {
        if (empty($search)) {
            return $query;
        }

        $searchableFields = $this->getSearchableFields();

        return $query->where(function ($query) use ($search, $searchableFields) {
            foreach ($searchableFields as $field) {
                $query->orWhere($field, 'like', "%{$search}%");
            }
        });
    }

    public function paginateQuery($query, $paginate)
    {
        return $query->paginate($paginate);
    }

    public function getPaginatedData($query, $data)
    {
        $sort = $data['sort_field'] ?? null;
        $sortOrder = $data['sort_order'] ?? 'asc';
        $perPage = $data['per_page'] ?? 10;
        $search = $data['search'] ?? null;

        $query = $this->sortQuery($query, $sort, $sortOrder);
        $query = $this->searchQuery($query, $search);

        return $this->paginateQuery($query, $perPage);
    }
}
