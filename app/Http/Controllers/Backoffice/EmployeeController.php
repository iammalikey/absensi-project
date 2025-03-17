<?php

namespace App\Http\Controllers\Backoffice;

use App\Helpers\AlertHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\Employee\EmployeeUpdateRequest;
use App\Http\Requests\Backoffice\Employee\EmployeeStoreRequest;
use App\Http\Resources\Backoffice\Employee\EmployeeEditResource;
use App\Http\Resources\Backoffice\Employee\EmployeeIndexResource;
use App\Http\Resources\Backoffice\Employee\EmployeeDetailResource;
use Illuminate\Http\Request;
use App\Models\Employee;
use App\Models\User;
use App\Models\Division;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EmployeeController extends Controller
{
    public function index()
    {
        return inertia('Backoffice/Employee/Index', [
            'employees' => EmployeeIndexResource::collection(Employee::with(['user','division'])->paginate(request()->size ?? 10)),
            'user' => [
                'role' => auth()->user()->roles->pluck('name'), // Jika pakai Spatie
            ],
        ]);
    }

    public function show($id)
    {
        return inertia('Backoffice/Employee/Show', [
            'employee' => new EmployeeDetailResource(Employee::with(['user', 'division'])->findOrFail($id)),
        ]);
    }

    public function create()
    {
        // dd("Create method accessed!");
        // return inertia('Backoffice/Employee/Create');
        return inertia('Backoffice/Employee/Create', [
            'users' => User::select('id', 'name')->get(),
            'divisions' => Division::select('id', 'title')->get(),
            'maritalStatuses' => ['Single', 'Married', 'Divorced', 'Widowed'],
            'religions' => ['Islam', 'Christian', 'Hindu', 'Buddhist', 'Others'],
        ]);

    }

    public function store(EmployeeStoreRequest $request)
    {
        // Log::info('Store function accessed');
        // dd('Request sampai ke store');
        try {
            DB::beginTransaction();

            $employee = new Employee();
            $employee->user_id = $request->user_id;
            $employee->division_id = $request->division_id;
            $employee->marital_status = $request->marital_status;
            $employee->religion = $request->religion;
            $employee->full_name = $request->full_name;
            $employee->slug = (new Employee)->uniqueSlug($request->full_name);
            $employee->place_of_birth = $request->place_of_birth;
            $employee->date_of_birth = $request->date_of_birth;
            $employee->blood_type = $request->blood_type;
            $employee->address = $request->address;
            $employee->nik = $request->nik;
            $employee->npwp = $request->npwp;
            $employee->postal_code = $request->postal_code;
            $employee->save();

            DB::commit();

            return redirect()->route('cms.employee.index')->with('alert', [
                'type' => AlertHelper::ALERT_SUCCESS,
                'message' => trans('success.crud_create', ['type' => "Employee $employee->full_name"]),
            ]);

        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    public function edit(Employee $employee)
    {
        return inertia('Backoffice/Employee/Edit', [
            'employee' => new EmployeeEditResource($employee),
            'users' => User::select('id', 'name')->get(),
            'divisions' => Division::select('id', 'title')->get(),
            'maritalStatuses' => ['Single', 'Married', 'Divorced', 'Widowed'],
            'religions' => ['Islam', 'Christian', 'Hindu', 'Buddhist', 'Others'],
        ]);
        
    }

    public function update(EmployeeUpdateRequest $request, Employee $employee)
    {
        try {
            DB::beginTransaction();

            // Update employee data
            $employee->update([
                'user_id' => $request->user_id,
                'division_id' => $request->division_id,
                'full_name' => $request->full_name,
                'place_of_birth' => $request->place_of_birth,
                'date_of_birth' => $request->date_of_birth,
                'blood_type' => $request->blood_type,
                'address' => $request->address,
                'nik' => $request->nik,
                'npwp' => $request->npwp,
                'postal_code' => $request->postal_code,
                'marital_status' => $request->marital_status,
                'religion' => $request->religion,
            ]);

            DB::commit();

            return redirect()->route('cms.employee.index')->with('alert', [
                'type' => AlertHelper::ALERT_SUCCESS,
                'message' => trans('success.crud_update', ['type' => "Employee $employee->full_name"])
            ]);

        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }

    public function destroy(Employee $employee){
        try {
            DB::beginTransaction();
            $employee->delete();
            DB::commit();

            return back()->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' =>trans('success.crud_delete', ['type' => "Employee $employee->full_name"])]);

        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }
}
