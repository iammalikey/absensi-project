<?php

namespace App\Exports;

use App\Models\Attendance;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\DB;

class LogExport implements FromCollection, WithHeadings
{
    protected $month;

    public function __construct($month)
    {
        $this->month = $month;
    }

    public function collection()
    {
        return DB::table('attendance')
            ->select('users.name', DB::raw('COUNT(attendance.id) as total_attendance'))
            ->join('users', 'attendance.user_id', '=', 'users.id')
            ->whereRaw("DATE_FORMAT(attendance.date, '%Y-%m') = ?", [$this->month])
            ->groupBy('users.name')
            ->get();
    }

    public function headings(): array
    {
        return ['Employee Name', 'Total Attendance'];
    }
}
