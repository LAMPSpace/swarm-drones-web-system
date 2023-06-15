<?php

namespace App\Services;

use App\Models\User;
use App\Traits\DataTableTrait;

class UserService
{
    use DataTableTrait;

    protected ?User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function get(array $data)
    {
        return $this->getPaginatedData(
            $this->user::query(),
            $data
        );
    }

    public function store(array $data)
    {
        $data['password'] = bcrypt($data['password']);
        return $this->user::create($data);
    }

    public function getSortableFields()
    {
        return [
            'name',
            'username',
            'email',
            'is_admin'
        ];
    }

    public function getSearchableFields()
    {
        return [
            'name',
            'username',
            'email'
        ];
    }

    public function show($id)
    {
        if (!is_numeric($id)) {
            return null;
        }
        $user = $this->user::find($id);

        if (!$user) {
            return null;
        }

        return $user;
    }

    public function update(array $all, $id)
    {
        $user = $this->show($id);

        if (!$user) {
            return null;
        }

        $user->update($all);

        return $user;
    }
}
