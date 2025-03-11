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

        $user1 = User::where('name', 'Employee 1')->first();
        $user2 = User::where('name', 'Employee 2')->first();
        $user3 = User::where('name', 'Employee 3')->first();
        $user4 = User::where('name', 'Employee 4')->first();
        $user5 = User::where('name', 'Employee 5')->first();


        $division1 = Division::where('title', 'Division 1')->first();
        $division2 = Division::where('title', 'Division 2')->first();
        $division3 = Division::where('title', 'Division 3')->first();
        $division4 = Division::where('title', 'Division 4')->first();

        $employee1 = Employee::create([
            'user_id' => $user1->id,
            'division_id' => $division1->id,
            'slug' => Str::slug('Employee 1'),
            'full_name' => 'Employee 1',
            'phone' => '628118723799',
            'place_of_birth' => 'lorem ipsum dolor sit amet ',
            'date_of_birth' => Carbon::parse('1990-06-01'),
            'gender' => 'lorem ipsum dolor sit amet ',
            'marital_status' => 'lorem ipsum dolor sit amet ',
            'blood_type' => 'lorem ipsum dolor sit amet ',
            'religion' => 'lorem ipsum dolor sit amet ',
            'address' => 'lorem ipsum dolor sit amet',
            'postal_code' => '10200',
            'NIK' => '123456789',
            'NPWP' => '123456789',
        ]);
        $employee2 = Employee::create([
            'user_id' => $user2->id,
            'division_id' => $division2->id,
            'slug' => Str::slug('Employee 2'),
            'full_name' => 'Employee 2',
            'phone' => '628118723799',
            'place_of_birth' => 'lorem ipsum dolor sit amet ',
            'date_of_birth' => Carbon::parse('1990-06-01'),
            'gender' => 'lorem ipsum dolor sit amet ',
            'marital_status' => 'lorem ipsum dolor sit amet ',
            'blood_type' => 'lorem ipsum dolor sit amet ',
            'religion' => 'lorem ipsum dolor sit amet ',
            'address' => 'lorem ipsum dolor sit amet',
            'postal_code' => '10200',
            'NIK' => '123456789',
            'NPWP' => '123456789',
        ]);
        $employee3 = Employee::create([
            'user_id' => $user3->id,
            'division_id' => $division3->id,
            'slug' => Str::slug('Employee 3'),
            'full_name' => 'Employee 3',
            'phone' => '628118723799',
            'place_of_birth' => 'lorem ipsum dolor sit amet ',
            'date_of_birth' => Carbon::parse('1990-06-01'),
            'gender' => 'lorem ipsum dolor sit amet ',
            'marital_status' => 'lorem ipsum dolor sit amet ',
            'blood_type' => 'lorem ipsum dolor sit amet ',
            'religion' => 'lorem ipsum dolor sit amet ',
            'address' => 'lorem ipsum dolor sit amet',
            'postal_code' => '10200',
            'NIK' => '123456789',
            'NPWP' => '123456789',
        ]);
        $employee4 = Employee::create([
            'user_id' => $user4->id,
            'division_id' => $division4->id,
            'slug' => Str::slug('Employee 4'),
            'full_name' => 'Employee 4',
            'phone' => '628118723799',
            'place_of_birth' => 'lorem ipsum dolor sit amet ',
            'date_of_birth' => Carbon::parse('1990-06-01'),
            'gender' => 'lorem ipsum dolor sit amet ',
            'marital_status' => 'lorem ipsum dolor sit amet ',
            'blood_type' => 'lorem ipsum dolor sit amet ',
            'religion' => 'lorem ipsum dolor sit amet ',
            'address' => 'lorem ipsum dolor sit amet',
            'postal_code' => '10200',
            'NIK' => '123456789',
            'NPWP' => '123456789',
        ]);
        $employee5 = Employee::create([
            'user_id' => $user5->id,
            'division_id' => $division4->id,
            'slug' => Str::slug('Employee 5'),
            'full_name' => 'Employee 5',
            'phone' => '628118723799',
            'place_of_birth' => 'lorem ipsum dolor sit amet ',
            'date_of_birth' => Carbon::parse('1990-06-01'),
            'gender' => 'lorem ipsum dolor sit amet ',
            'marital_status' => 'lorem ipsum dolor sit amet ',
            'blood_type' => 'lorem ipsum dolor sit amet ',
            'religion' => 'lorem ipsum dolor sit amet ',
            'address' => 'lorem ipsum dolor sit amet',
            'postal_code' => '10200',
            'NIK' => '123456789',
            'NPWP' => '123456789',
        ]);
    }
}
