<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function clock_in()
    {
        return Inertia::render('Frontend/Attendance/ClockIn');
    }

    public function clock_in_store(Request $request)
    {
        $request->validate([
            'status' => 'required|in:WFO,WFH',
            'date_time' => [
                'required',
                'date_format:m/d/Y, g:i:s A'
            ],
            'latitude' => [
                'required',
                'numeric',
                'between:-90,90'
            ],
            'longitude' => [
                'required',
                'numeric',
                'between:-180,180'
            ],
        ]);

        // PROCESS
        return 'success';
    }

    public function clock_out()
    {
        return Inertia::render('Frontend/Attendance/ClockOut');
    }

    public function clock_out_store(Request $request)
    {
        $request->validate([
            'status' => 'required|in:WFO,WFH',
            'date_time' => [
                'required',
                'date_format:m/d/Y, g:i:s A'
            ],
            'latitude' => [
                'required',
                'numeric',
                'between:-90,90'
            ],
            'longitude' => [
                'required',
                'numeric',
                'between:-180,180'
            ],
        ]);

        // PROCESS
        return 'success';
    }
}
