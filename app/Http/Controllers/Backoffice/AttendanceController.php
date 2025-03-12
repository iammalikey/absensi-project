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
use Carbon\Carbon;
use Illuminate\Support\Str;

class AttendanceController extends Controller
{
    public function index()
    {
        return inertia('Backoffice/Attendance/Index', [
            'attendances' => AttendanceIndexResource::collection(Attendance::with(['user'])->paginate(request()->size ?? 10))
        ]);
    }

    public function create()
    {
        // dd("Create method accessed!");
        // return inertia('Backoffice/Employee/Create');
        return inertia('Backoffice/Attendance/Create', [
            'users' => User::select('id', 'name')->get(),
            'categories' => ['WFH', 'WFO'],
            'statuses' => ['Pending', 'Approved', 'Rejected'],
        ]);

    }

    public function store(AttendanceStoreRequest $request)
    {
        try {
            DB::beginTransaction();

            $user = User::findOrFail($request->user_id);
    
            $attendance = new Attendance();
            $attendance->user_id = $request->user_id;
            $attendance->date = $request->date;
            $attendance->slug = Str::slug($user->name) . '-' . $user->id . '-' . Carbon::parse($request->date)->format('Y-m-d');
            $attendance->clock_in = $request->date . ' ' . $request->clock_in . ':00';
            $attendance->clock_out = $request->clock_out ? $request->date . ' ' . $request->clock_out . ':00' : null; 
            $attendance->clock_in_location = $request->clock_in_location ?? null;
            $attendance->status = $request->status ?? 'Pending';
            $attendance->category = $request->category;
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
