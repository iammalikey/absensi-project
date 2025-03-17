<?php

namespace App\Http\Controllers\Front;

use App\Http\Requests\Front\AttendanceRequest;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AttendanceController extends Controller
{
    public function index()
    {
        return inertia('Front/Attendance/Index', [
            'userName' => Auth::user()->name,
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'date' => 'required|date',
            'clock_in' => 'required|date_format:H:i:s',
            'clock_out' => 'nullable|date_format:H:i:s',
            'clock_in_lat' => 'required|numeric',
            'clock_in_long' => 'required|numeric',
        ]);

        // Simpan data ke database
        $attendance = Attendance::create([
            'date' => $request->date,
            'clock_in' => $request->clock_in,
            'clock_out' => $request->clock_out,
            'clock_in_lat' => $request->clock_in_lat,
            'clock_in_long' => $request->clock_in_long,
        ]);

        return response()->json([
            'message' => 'Clock in berhasil!',
            'data' => $attendance
        ], 201);
    }
}
