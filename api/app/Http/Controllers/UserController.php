<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddUserRequest;
use App\Http\Requests\DataTableRequest;
use App\Http\Requests\UpdateUserRequest;
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

    public function index(DataTableRequest $request)
    {
        $this->authorize('viewAny', User::class);
        return new UserCollection($this->userService->get($request->all()));
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
        $user = $this->userService->show($id);

        if (!$user) {
            return $this->error('Không tìm thấy người dùng', 404);
        }

        $this->authorize('view', $user);

        return $this->success(new UserResource($user));
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = $this->userService->update($request->validated(), $id);

        if (!$user) {
            return $this->error('Cập nhật thất bại');
        }

        return $this->success(new UserResource($user), 'Cập nhật thành công');
    }

    public function destroy($id)
    {
        //
    }
}
