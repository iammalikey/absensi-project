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

    // Koordinat lokasi kantor
    $officeLat = -6.200000; // Ganti dengan latitude kantor
    $officeLong = 106.816666; // Ganti dengan longitude kantor

    // Query attendance dengan filter bulan, nama, dan perhitungan jarak
    $attendances = Attendance::with('user')
        ->whereYear('date', $dateRange[0])
        ->whereMonth('date', $dateRange[1])
        ->when($this->name, function ($query) {
            $query->whereHas('user', function ($subQuery) {
                $subQuery->where('name', 'like', "%{$this->name}%");
            });
        })
        ->withDistance($officeLat, $officeLong) // Tambahkan perhitungan jarak
        ->orderBy('date', 'desc')
        ->get();

    return view('exports.logs', [
        'attendances' => $attendances,
        'month' => $this->month,
        'name' => $this->name
    ]);
}

}
