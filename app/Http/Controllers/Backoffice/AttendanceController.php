<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\Attendance\AttendanceStoreRequest;
use App\Http\Requests\Backoffice\Attendance\AttendanceUpdateRequest;
use App\Http\Resources\Backoffice\Attendance\AttendanceEditResource;
use App\Http\Resources\Backoffice\Attendance\AttendanceIndexResource;
use App\Models\Attendance;
use App\Models\User;
use App\Models\Shift;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Helpers\AlertHelper;

class AttendanceController extends Controller
{
    public function index()
    {

        $attendances = Attendance::with('user')->latest()->get();
    
        return inertia('Backoffice/Attendance/Index', [
            'attendances' => AttendanceIndexResource::collection(Attendance::latest()->paginate(request()->size ?? 10))
        ]);
    }

    public function create()
    {
        $users = User::all();
        $shifts = Shift::all();
        return inertia ('Backoffice/Attendance/Create',[
            'users' => $users,
            'shifts' => $shifts
        ]);
    }

    public function store(AttendanceStoreRequest $request)
    {
        try {
            DB::beginTransaction();
    
            $attendance = new Attendance();
            $attendance->user_id = $request->user_id;
            $attendance->shift_id = $request->shift_id;
            $attendance->date = $request->date;
            $attendance->clock_in = $request->date . ' ' . $request->clock_in . ':00';
            $attendance->clock_out = $request->clock_out ? $request->date . ' ' . $request->clock_out . ':00' : null; 
            $attendance->clock_in_location = $request->clock_in_location ?? null;
            $attendance->status = $request->status ?? 'Pending';
            $attendance->save();
    
            DB::commit();
    
            return redirect()->route('cms.attendance.index')->with('alert', [
                'type' => 'success',
                'message' => trans('success.crud_create', ['type' => "Attendance for {$attendance->date}"]),
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th);
    
            return back()->withErrors([trans('server.500')], 500);
        }
    }

    public function edit(Attendance $attendance)
    {
        return inertia('Backoffice/Attendance/Edit', [
            'attendance' => new AttendanceEditResource(Attendance::with(['user'])->firstOrFail()),
                'users' => User::get(['id', 'name'])
        ]);
    }

    public function update(AttendanceUpdateRequest $request, Attendance $attendance)
    {
        try {
            DB::beginTransaction();
    
            $attendance = new Attendance();
            $attendance->user_id = $request->user_id;
            $attendance->date = $request->date;
            $attendance->clock_in = $request->date . ' ' . $request->clock_in . ':00';
            $attendance->clock_out = $request->clock_out ? $request->date . ' ' . $request->clock_out . ':00' : null; 
            $attendance->clock_in_location = $request->clock_in_location ?? null;
            $attendance->status = $request->status ?? 'Pending';
            $attendance->save();
    
            DB::commit();
    
            return redirect()->route('cms.attendance.index')->with('alert', [
                'type' => 'success',
                'message' => trans('success.crud_create', ['type' => "Attendance for {$attendance->date}"]),
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th);
    
            return back()->withErrors([trans('server.500')], 500);
        }
    }
}
