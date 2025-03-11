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
            'employees' => EmployeeIndexResource::collection(Employee::with(['user','division'])->paginate(request()->size ?? 10))
        ]);
    }

    public function show($id)
    {
        return inertia('Backoffice/Employee/Show', [
            'employee' => new EmployeeDetailResource(Employee::with(['user', 'division'])->findOrFail($id)),
        ]);
    }
}
