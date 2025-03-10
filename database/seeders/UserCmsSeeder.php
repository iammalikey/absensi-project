<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserCmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // 🔹 ROLE SETUP
        $role_super = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'cms']);
        $role_hrd = Role::firstOrCreate(['name' => 'HRD', 'guard_name' => 'cms']);
        $role_supervisor = Role::firstOrCreate(['name' => 'Supervisor', 'guard_name' => 'cms']);
        $role_employee = Role::firstOrCreate(['name' => 'Employee', 'guard_name' => 'cms']);

        // 🔹 SUPER ADMIN (1)
        $superadmin = User::create([
            'email' => "superadmin@app.com",
            'username' => "superadmin",
            'name' => "Super Admin",
            'password' => Hash::make('superadmin'),
            'role' => 'superadmin'
        ]);
        $superadmin->assignRole($role_super);

        // 🔹 HRD (1)
        $hrd = User::create([
            'email' => "hrd@app.com",
            'username' => "hrd",
            'name' => "HRD Manager",
            'password' => Hash::make('hrd'),
            'role' => 'hrd'
        ]);
        $hrd->assignRole($role_hrd);

        // 🔹 SUPERVISOR (3)
        $supervisors = [];
        for ($i = 1; $i <= 3; $i++) {
            $supervisors[] = User::create([
                'email' => "supervisor$i@app.com",
                'username' => "supervisor$i",
                'name' => "Supervisor $i",
                'password' => Hash::make('supervisor'),
                'role' => 'supervisor',
            ]);
            $supervisors[$i - 1]->assignRole($role_supervisor);
        }

        // 🔹 EMPLOYEE (20)
        for ($i = 1; $i <= 20; $i++) {
            User::create([
                'email' => "employee$i@app.com",
                'username' => "employee$i",
                'name' => "Employee $i",
                'password' => Hash::make('employee'),
                'role' => 'employee',
                // 'nik' => $faker->unique()->numerify('EMP####'),
                // 'position' => $faker->jobTitle,
                // 'department' => $faker->randomElement(['IT', 'HR', 'Finance', 'Marketing']),
                // 'join_date' => $faker->date,
                // 'salary' => $faker->randomFloat(2, 3000, 10000),
                // 'emergency_contact' => $faker->phoneNumber,
                // 'supervisor_id' => $supervisors[array_rand($supervisors)]->id,
            ])->assignRole($role_employee);
        }
    }
}
