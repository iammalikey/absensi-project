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
        $month = $request->query('month', now()->format('Y-m'));
        $name = $request->query('name', '');
        $dateRange = explode('-', $month);

        // Ambil lokasi kantor dari config
        $officeLat = config('app.office_lat');
        $officeLong = config('app.office_long');

        $attendances = Attendance::with('user')
            ->select('attendances.*')
            ->selectRaw("
                (6371 * acos(
                    cos(radians(?)) * cos(radians(clock_in_lat)) * 
                    cos(radians(clock_in_long) - radians(?)) + 
                    sin(radians(?)) * sin(radians(clock_in_lat))
                )) AS distance", [$officeLat, $officeLong, $officeLat])
            ->whereYear('clock_in', $dateRange[0]) // 🔹 Filter Tahun dari clock_in
            ->whereMonth('clock_in', $dateRange[1]) // 🔹 Filter Bulan dari clock_in
            ->when($name, function ($query) use ($name) {
                $query->whereHas('user', function ($subQuery) use ($name) {
                    $subQuery->where('name', 'like', "%{$name}%");
                });
            })
            ->orderBy('clock_in', 'desc')
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
        $request->validate([
            'month' => 'nullable|date_format:Y-m',
            'name' => 'nullable|string',
        ]);

        $month = $request->query('month', now()->format('Y-m'));
        $name = $request->query('name', '');

        return Excel::download(new LogsExport($month, $name), "attendance_log_{$month}.xlsx");
    }


}
