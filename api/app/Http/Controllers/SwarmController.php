<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddSwarmRequest;
use App\Http\Requests\DataTableRequest;
use App\Http\Resources\SwarmCollection;
use App\Services\SwarmService;
use App\Traits\ResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SwarmController extends Controller
{
    use ResponseTrait;

    private ?SwarmService $swarmService;
    public function __construct(SwarmService $swarmService)
    {
        $this->swarmService = $swarmService;
    }

    public function index(DataTableRequest $request): SwarmCollection
    {
        $swarms = $this->swarmService->get($request->all());
        return new SwarmCollection($swarms);
    }

    public function store(AddSwarmRequest $request): JsonResponse
    {
        $swarm = $this->swarmService->store($request->all());
        if ($swarm) {
            return $this->success($swarm, 'Thêm bầy đàn thành công');
        }

        return $this->error('Thêm bầy đàn thất bại');
    }

    public function show($id): JsonResponse
    {
        $swarm = $this->swarmService->show($id);
        if ($swarm) {
            return $this->success($swarm, 'Lấy thông tin bầy đàn thành công');
        }

        return $this->error('Lấy thông tin bầy đàn thất bại');
    }

    public function update(Request $request, $id): JsonResponse
    {
        $swarm = $this->swarmService->update($request->all(), $id);
        if ($swarm) {
            return $this->success($swarm, 'Cập nhật thông tin bầy đàn thành công');
        }

        return $this->error('Cập nhật thông tin bầy đàn thất bại');
    }

    public function destroy($id)
    {
        //
    }
}
