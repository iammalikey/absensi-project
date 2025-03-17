<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Attendance;


class AttendanceController extends Controller
{
    public function clock_in()
    {
        return Inertia::render('Frontend/Attendance/ClockIn');
    }
    

    public function clock_in_store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'status' => 'required|in:WFO,WFH',
            'clock_in' => 'required|date_format:Y-m-d H:i:s',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        // Ambil user yang sedang login
        $user = auth()->user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Proses data
        $dateTime = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $validated['clock_in']);
        
        $data = [
            'user_id' => $user->id,
            'slug' => Str::slug($user->name) . '-' . $user->id . '-' . $dateTime->format('Y-m-d'),
            'clock_in' => $dateTime->format('Y-m-d H:i:s'),
            'clock_in_lat' => $validated['latitude'],
            'clock_in_long' => $validated['longitude'],
            'category' => 'Clock In',
            'status' => $validated['status'],
        ];

        // Simpan ke database
        $attendance = Attendance::create($data);
        // dd($attendance);


        // Return response JSON
        return response()->json(['message' => 'Clock In success', 'data' => $attendance]);
    }



    public function clock_out()
    {
        return Inertia::render('Frontend/Attendance/ClockOut');
    }

    public function clock_out_store(Request $request)
    {
        // Validasi input
        $request->validate([
            'clock_out' => 'required|date_format:Y-m-d H:i:s',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        // Ambil user yang sedang login
        $user = auth()->user();

        // Cari data Attendance berdasarkan user_id dan tanggal hari ini
        $attendance = Attendance::where('user_id', auth()->id()) 
    ->whereDate('clock_in', now()->toDateString())
    ->first();


        // Jika tidak ditemukan, return error
        if (!$attendance) {
            return response()->json(['message' => 'Clock In not found, please Clock In first!'], 404);
        }

        // Update hanya field clock_out, lat, long
        $attendance->update([
            'clock_out' => $request->clock_out,
            'clock_out_lat' => $request->latitude,
            'clock_out_long' => $request->longitude,
        ]);

        return response()->json(['message' => 'Clock Out successful', 'data' => $attendance]);
    }

}
