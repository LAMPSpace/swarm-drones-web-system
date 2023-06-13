<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddUserRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use ResponseTrait;

    private ?UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $this->authorize('viewAny', User::class);
        return new UserCollection($this->userService->get());
    }

    public function store(AddUserRequest $request)
    {
        $this->authorize('create', User::class);
        $user = $this->userService->store($request->all());

        if (!$user) {
            return $this->error('Thêm mới thất bại');
        }

        return $this->success(new UserResource($user), 'Thêm mới thành công');
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
