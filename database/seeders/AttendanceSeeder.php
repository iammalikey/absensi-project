<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Attendance;
use Illuminate\Support\Str;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::where('name', 'Ahmad Setiawan')->first();
        $user2 = User::where('name', 'Siti Nurhaliza')->first();
        $user3 = User::where('name', 'Budi Santoso')->first();
        $user4 = User::where('name', 'Indah Permatasari')->first();
        $user5 = User::where('name', 'Rizky Ramadhan')->first();

        $attendance1 = Attendance::create([
            'user_id' => $user1->id,
            'date' => Carbon::parse('2025-01-01'),
            'slug' => Str::slug($user1->name) . '-' . $user1->id . '-' . Carbon::parse('2025-01-01')->format('Y-m-d'),
            'clock_in' => '08:00:00',
            'clock_out' => '16:00:00',
            'clock_in_lat' => '39.19750',
            'clock_in_long' => '9.90157',
            'category' => 'WFO',
            'status' => 'Approved',
        ]);

        $attendance2 = Attendance::create([
            'user_id' => $user1->id,
            'date' => Carbon::parse('2025-01-02'),
            'slug' => Str::slug($user1->name) . '-' . $user1->id . '-' . Carbon::parse('2025-01-02')->format('Y-m-d'),
            'clock_in' => '08:00:00',
            'clock_out' => '16:00:00',
            'clock_in_lat' => '39.19750',
            'clock_in_long' => '9.90157',
            'category' => 'WFO',
            'status' => 'Approved',
        ]);

        $attendance3 = Attendance::create([
            'user_id' => $user2->id,
            'date' => Carbon::parse('2025-01-01'),
            'slug' => Str::slug($user2->name) . '-' . $user2->id . '-' . Carbon::parse('2025-01-01')->format('Y-m-d'),
            'clock_in' => '08:00:00',
            'clock_out' => '16:00:00',
            'clock_in_lat' => '10.86042',
            'clock_in_long' => '106.98617',
            'category' => 'WFH',
            'status' => 'Approved',
        ]);

        $attendance4 = Attendance::create([
            'user_id' => $user2->id,
            'date' => Carbon::parse('2025-01-02'),
            'slug' => Str::slug($user2->name) . '-' . $user2->id . '-' . Carbon::parse('2025-01-02')->format('Y-m-d'),
            'clock_in' => '08:00:00',
            'clock_out' => '16:00:00',
            'clock_in_lat' => '6.74759',
            'clock_in_long' => '-162.90709',
            'category' => 'WFO',
            'status' => 'Approved',
        ]);
    }
}
