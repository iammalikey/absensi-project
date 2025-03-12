<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Backoffice\LogResource;
use App\Http\Resources\Backoffice\Logs\LogDetailResource;
use App\Models\Attendance;
use App\Models\User;
use App\Exports\LogsExport;
use Maatwebsite\Excel\Facades\Excel;

class LogController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->query('month', now()->format('Y-m')); // Default bulan ini
        $name = $request->query('name', ''); // Filter nama
        $dateRange = explode('-', $month); // Ambil tahun & bulan

        // Query attendance dengan filter bulan & nama user
        $attendances = Attendance::with('user')
            ->whereYear('date', $dateRange[0])
            ->whereMonth('date', $dateRange[1])
            ->when($name, function ($query) use ($name) {
                $query->whereHas('user', function ($subQuery) use ($name) {
                    $subQuery->where('name', 'like', "%{$name}%");
                });
            })
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return inertia('Backoffice/Log/Index', [
            'attendances' => $attendances,
            'selectedMonth' => $month,
            'selectedName' => $name,
        ]);
    }


    public function export(Request $request)
    {
        $month = $request->query('month', date('Y-m'));

        return Excel::download(new LogsExport($month), "attendance_logs_{$month}.xlsx");
    }
}
