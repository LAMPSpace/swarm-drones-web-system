<?php

namespace App\Services;

use App\Models\User;

class UserService
{
    protected ?User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function get()
    {
        return $this->user::paginate(10);
    }

    public function store(array $data)
    {
        $data['password'] = bcrypt($data['password']);
        return $this->user::create($data);
    }
}
