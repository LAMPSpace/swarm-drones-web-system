<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

abstract class BaseService
{
    protected ?Model $model;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function index()
    {
        return $this->model::all();
    }

    public function store($data)
    {
        return $this->model::create($data);
    }

    public function show($id)
    {
        return $this->model::findOrFail($id);
    }

    public function update($data, $id)
    {
        $model = $this->model::findOrFail($id);
        $model->update($data);
        return $model;
    }

    public function destroy($id)
    {
        $model = $this->model::findOrFail($id);
        $model->delete();
        return $model;
    }

    public function getModel()
    {
        return $this->model;
    }

    public function setModel($model): void
    {
        $this->model = $model;
    }

    public function getTable(): string
    {
        return $this->model->getTable();
    }
}
