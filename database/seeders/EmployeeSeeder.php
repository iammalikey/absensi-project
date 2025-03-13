<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Models\Employee;
use App\Models\User;
use App\Models\Division;
use Illuminate\Support\Str;

class EmployeeSeeder extends Seeder
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


        $division1 = Division::where('title', 'Division 1')->first();
        $division2 = Division::where('title', 'Division 2')->first();
        $division3 = Division::where('title', 'Division 3')->first();
        $division4 = Division::where('title', 'Division 4')->first();

        $employee1 = Employee::create([
            'user_id' => $user1->id,
            'division_id' => $division1->id,
            'slug' => Str::slug('Ahmad Setiawan'),
            'full_name' => 'Ahmad Setiawan',
            'phone' => '6281234567890',
            'place_of_birth' => 'Jakarta',
            'date_of_birth' => Carbon::parse('1990-06-01'),
            'gender' => 'Male',
            'marital_status' => 'Married',
            'blood_type' => 'A',
            'religion' => 'Islam',
            'address' => 'Jl. Merdeka No. 45, Kel. Gambir, Kec. Gambir, Jakarta Pusat, DKI Jakarta',
            'postal_code' => '10110',
            'NIK' => '-',
            'NPWP' => '-',
        ]);
        $employee2 = Employee::create([
            'user_id' => $user2->id,
            'division_id' => $division2->id,
            'slug' => Str::slug('Siti Nurhaliza'),
            'full_name' => 'Siti Nurhaliza',
            'phone' => '6282198765432',
            'place_of_birth' => 'Bandung',
            'date_of_birth' => Carbon::parse('1995-02-12'),
            'gender' => 'Female',
            'marital_status' => 'Single',
            'blood_type' => 'B',
            'religion' => 'Islam',
            'address' => 'Jl. Riau No. 123, Kel. Citarum, Kec. Bandung Wetan, Bandung, Jawa Barat',
            'postal_code' => '40115',
            'NIK' => '-',
            'NPWP' => '-',
        ]);
        $employee3 = Employee::create([
            'user_id' => $user3->id,
            'division_id' => $division3->id,
            'slug' => Str::slug('Budi Santoso'),
            'full_name' => 'Budi Santoso',
            'phone' => '628118723799',
            'place_of_birth' => 'Surabaya',
            'date_of_birth' => Carbon::parse('1988-07-12'),
            'gender' => 'Male',
            'marital_status' => 'Married',
            'blood_type' => 'O',
            'religion' => 'Islam',
            'address' => 'Jl. Darmo Permai No. 78, Kel. Sawahan, Kec. Sawahan, Surabaya, Jawa Timur',
            'postal_code' => '60251',
            'NIK' => '-',
            'NPWP' => '-',
        ]);
        $employee4 = Employee::create([
            'user_id' => $user4->id,
            'division_id' => $division4->id,
            'slug' => Str::slug('Indah Permatasari'),
            'full_name' => 'Indah Permatasari',
            'phone' => '6281922334455',
            'place_of_birth' => 'Yogyakarta',
            'date_of_birth' => Carbon::parse('1993-06-01'),
            'gender' => 'Female',
            'marital_status' => 'Single',
            'blood_type' => 'A',
            'religion' => 'Christian',
            'address' => 'Jl. Malioboro No. 9, Kel. Suryatmajan, Kec. Danurejan, Yogyakarta',
            'postal_code' => '55213',
            'NIK' => '-',
            'NPWP' => '-',
        ]);
        $employee5 = Employee::create([
            'user_id' => $user5->id,
            'division_id' => $division4->id,
            'slug' => Str::slug('Rizky Ramadhan'),
            'full_name' => 'Rizky Ramadhan',
            'phone' => '6287855667788',
            'place_of_birth' => 'Medan',
            'date_of_birth' => Carbon::parse('1997-08-12'),
           'gender' => 'Male',
            'marital_status' => 'Single',
            'blood_type' => 'AB',
            'religion' => 'Islam',
            'address' => 'Jl. Sisingamangaraja No. 50, Kel. Teladan Barat, Kec. Medan Kota, Medan, Sumatera Utara',
            'postal_code' => '20217',
            'NIK' => '-',
            'NPWP' => '-',
        ]);
    }
}
