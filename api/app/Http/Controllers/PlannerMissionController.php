<?php

namespace App\Http\Controllers;

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
        return new PlannerMissionCollection($plannerMissions);
    }

    public function store(Request $request)
    {
        //
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
