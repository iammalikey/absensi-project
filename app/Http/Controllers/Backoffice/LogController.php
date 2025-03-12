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
        $month = $request->query('month', now()->format('Y-m')); // Default ke bulan ini
        $dateRange = explode('-', $month); // Ambil tahun dan bulan

        // Query data attendance berdasarkan bulan
        $attendances = Attendance::with('user')
            ->whereYear('date', $dateRange[0])
            ->whereMonth('date', $dateRange[1])
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return inertia('Backoffice/Log/Index', [
            'attendances' => $attendances,
            'selectedMonth' => $month,
        ]);
    }
}
