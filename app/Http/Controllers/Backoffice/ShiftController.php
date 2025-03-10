<?php

namespace App\Http\Controllers\Backoffice;

use App\Helpers\AlertHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\Shifts\ShiftStoreRequest;
use App\Http\Requests\Backoffice\Shifts\ShiftUpdateRequest;
use App\Http\Resources\Backoffice\Shifts\ShiftEditResource;
use App\Http\Resources\Backoffice\Shifts\ShiftIndexResource;
use App\Models\Shift;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ShiftController extends Controller
{
    /**
     * Menampilkan daftar shift.
     */
    public function index()
    {
        return inertia('Backoffice/Shifts/Index', [
            'shifts' => ShiftIndexResource::collection(Shift::latest()->paginate(request()->size ?? 10))
        ]);
    }

    /**
     * Menampilkan form edit shift.
     */
    public function edit(Shift $shift)
    {
        return inertia('Backoffice/Shifts/Edit', [
            'shift' => new ShiftEditResource($shift),
        ]);
    }

    public function create()
    {
        return inertia ('Backoffice/Shifts/Create');
    }

    /**
     * Menyimpan shift baru ke database.
     */
    public function store(ShiftStoreRequest $request)
    {
        try {
            DB::beginTransaction();

            $shift = new Shift();
            $shift->name = $request->name;
            $shift->start_time = $request->start_time;
            $shift->end_time = $request->end_time;
            $shift->save();

            DB::commit();

            return redirect()->route('cms.shifts.index')->with('alert', [
                'type' => AlertHelper::ALERT_SUCCESS,
                'message' => trans('success.crud_create', ['type' => "Shift $shift->name"])
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    /**
     * Memperbarui shift yang sudah ada.
     */
    public function update(ShiftUpdateRequest $request, Shift $shift)
    {
        try {
            DB::beginTransaction();

            $shift->name = $request->name;
            $shift->start_time = $request->start_time;
            $shift->end_time = $request->end_time;
            $shift->save();

            DB::commit();

            return redirect()->route('cms.shifts.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_update', ['type' => "Shift $shift->title"])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    public function destroy(Shift $shift)
    {
        try {
            DB::beginTransaction();
            $shift->delete();
            DB::commit();

            return redirect()->route('cms.shifts.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_delete', ['type' => $shift->title])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }
}
