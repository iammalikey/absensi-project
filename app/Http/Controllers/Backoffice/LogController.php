<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Backoffice\LogResource;
use App\Models\Attendance;
use App\Models\User;

class LogController extends Controller
{
    public function index(Request $request)
{
    $month = $request->query('month', now()->format('Y-m')); // Default ke bulan ini
    $logs = User::withCount([
        'attendance' => function ($query) use ($month) {
            $query->where('date', 'like', "$month%");
        }
    ])->get();

    return inertia('Backoffice/Log/Index', [
        'logs' => $logs,
        'selectedMonth' => $month
    ]);
}

    public function show($userId, Request $request)
    {
        $month = $request->input('month', now()->format('Y-m'));
        $user = User::withCount(['attendance' => function ($query) use ($month) {
            $query->where('date', 'like', "$month%");
        }])->findOrFail($userId);

        return inertia('Backoffice/Log/Detail', [
            'log' => new LogResource($user),
            'selectedMonth' => $month
        ]);
    }
}
