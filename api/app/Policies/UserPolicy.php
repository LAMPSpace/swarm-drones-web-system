<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->isAdmin();
    }

    public function view(User $user, User $model)
    {
        if ($user->id === $model->id) {
            return true;
        }

        return $user->isAdmin();
    }

    public function create(User $user)
    {
        return $user->isAdmin();
    }

    public function update(User $user, User $model)
    {
        return $user->isAdmin();
    }

    public function delete(User $user, User $model)
    {
        if ($user->id === $model->id) {
            return false;
        }

        return $user->isAdmin();
    }
}
