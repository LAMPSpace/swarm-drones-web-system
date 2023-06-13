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
        return $this->user::all();
    }
}
