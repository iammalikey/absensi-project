<?php

namespace App\Exports;

use App\Models\User;
use App\Models\Attendance;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class LogsExport implements FromView, ShouldAutoSize
{
    protected $month;

    public function __construct($month)
    {
        $this->month = $month;
    }

    public function view(): View
    {
        $logs = User::withCount([
            'attendance' => function ($query) {
                $query->where('date', 'like', "{$this->month}%");
            }
        ])->get();

        return view('exports.logs', [
            'logs' => $logs,
            'month' => $this->month
        ]);
    }
}

