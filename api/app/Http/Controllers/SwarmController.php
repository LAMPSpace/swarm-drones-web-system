<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddSwarmRequest;
use App\Http\Requests\DataTableRequest;
use App\Http\Resources\SwarmCollection;
use App\Services\SwarmService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class SwarmController extends Controller
{
    use ResponseTrait;

    private ?SwarmService $swarmService;
    public function __construct(SwarmService $swarmService)
    {
        $this->swarmService = $swarmService;
    }

    public function index(DataTableRequest $request)
    {
        $swarms = $this->swarmService->get($request->all());
        return new SwarmCollection($swarms);
    }

    public function store(AddSwarmRequest $request)
    {
        $swarm = $this->swarmService->store($request->all());
        if ($swarm) {
            return $this->success($swarm, 'Thêm bầy đàn thành công');
        }

        return $this->error('Thêm bầy đàn thất bại');
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
