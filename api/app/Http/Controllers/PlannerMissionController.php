<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddMissionRequest;
use App\Http\Requests\DataTableRequest;
use App\Http\Resources\PlannerMissionCollection;
use App\Services\PlannerMissionService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class PlannerMissionController extends Controller
{
    use ResponseTrait;

    private ?PlannerMissionService $plannerMissionService;

    public function __construct(PlannerMissionService $plannerMissionService)
    {
        $this->plannerMissionService = $plannerMissionService;
    }

    public function index(DataTableRequest $request)
    {
        $plannerMissions = $this->plannerMissionService->get($request->all());
        return $plannerMissions;
        return new PlannerMissionCollection($plannerMissions);
    }

    public function store(AddMissionRequest $request)
    {
        $plannerMission = $this->plannerMissionService->store($request->all());
        if ($plannerMission) {
            return $this->success($plannerMission, 'Thêm nhiệm vụ thành công');
        }

        return $this->error('Thêm nhiệm vụ thất bại');
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
