<?php

namespace App\Exports;

use App\Models\Attendance;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class LogsExport implements FromView, ShouldAutoSize
{
    protected $month;
    protected $name;

    public function __construct($month, $name)
    {
        $this->month = $month;
        $this->name = $name;
    }

    public function view(): View
    {
        $dateRange = explode('-', $this->month);

        // Pastikan format bulan benar (YYYY-MM)
        if (count($dateRange) !== 2) {
            abort(400, 'Format bulan tidak valid. Gunakan format YYYY-MM.');
        }

        // Koordinat lokasi kantor
        $officeLat = -6.200000; // Ganti dengan latitude kantor
        $officeLong = 106.816666; // Ganti dengan longitude kantor

        // Query attendance dengan filter bulan, nama, dan perhitungan jarak
        $attendances = Attendance::with('user')
            ->whereYear('clock_in', $dateRange[0])
            ->whereMonth('clock_in', $dateRange[1])
            ->when($this->name, function ($query) {
                $query->whereHas('user', function ($subQuery) {
                    $subQuery->where('name', 'like', "%{$this->name}%");
                });
            })
            ->select('attendances.*')
            ->selectRaw("
                (6371 * acos(
                    cos(radians(?)) * cos(radians(clock_in_lat)) * 
                    cos(radians(clock_in_long) - radians(?)) + 
                    sin(radians(?)) * sin(radians(clock_in_lat))
                )) AS distance", [$officeLat, $officeLong, $officeLat])
            ->orderBy('clock_in', 'desc')
            ->get();

        return view('exports.logs', [
            'attendances' => $attendances,
            'month' => $this->month,
            'name' => $this->name
        ]);
    }

}
