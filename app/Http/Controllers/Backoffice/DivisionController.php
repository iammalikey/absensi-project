<?php

namespace App\Http\Controllers\Backoffice;

use App\Helpers\AlertHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\DivisionUpdateRequest;
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
}
