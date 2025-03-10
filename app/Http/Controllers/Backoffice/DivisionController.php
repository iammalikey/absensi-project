<?php

namespace App\Http\Controllers\Backoffice;

use App\Helpers\AlertHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\Division\DivisionUpdateRequest;
use App\Http\Requests\Backoffice\Division\DivisionStoreRequest;
use App\Http\Resources\Backoffice\Division\DivisionEditResource;
use App\Http\Resources\Backoffice\Division\DivisionIndexResource;
use Illuminate\Http\Request;
use App\Models\Division;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DivisionController extends Controller
{
    // Index
    public function index()
    {
        return inertia('Backoffice/Division/Index', [
            'divisions' => DivisionIndexResource::collection(Division::latest()->paginate(request()->size ?? 10))
        ]);
    }

    public function create()
    {
        // dd("Create method accessed!");
        return inertia('Backoffice/Division/Create');
    }

    public function store(DivisionStoreRequest $request){
        try {
            DB::beginTransaction();
            $division = new Division();
            $division->title = $request->title;
            $division->slug = (new Division)->uniqueSlug($request->title);
            $division->save();
            DB::commit();

            return redirect()->route('cms.division.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' =>trans('success.crud_create', ['type' => "FAQ $division->title"])]);

        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    public function edit(Division $division)
    {
        return inertia('Backoffice/Division/Edit', [
            'division' => new DivisionEditResource($division),
        ]);
    }

    public function update(DivisionUpdateRequest $request, Division $division){
        try {
            DB::beginTransaction();
            $division->slug = $division->title !== $request->title ? (new Division())->uniqueSlug($request->title) : $division->slug  ;
            $division->title = $request->title;
            $division->save();
            DB::commit();

            return redirect()->route('cms.division.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' =>trans('success.crud_update', ['type' => "Division $division->title"])]);

        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    public function destroy(Division $division){
        try {
            DB::beginTransaction();
            $division->delete();
            DB::commit();

            return back()->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' =>trans('success.crud_delete', ['type' => "Division $division->title"])]);

        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }
}
