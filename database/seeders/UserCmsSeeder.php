<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserCmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make Role and User as a Super Administrator
        $role_super = Role::firstOrCreate([
            'name' => 'Super Admin',
            'guard_name' => 'cms'
        ]);

        // super dapat semua permission
        $user_super = User::create([
            'email' => 'super@app.com',
            'username' => 'super',
            'name' => 'Super Administrator',
            'password' => bcrypt('super'),
        ]);
        $user_super->assignRole($role_super);

        // Make Role and User as an HR Admin
        $role_hrd = Role::firstOrCreate([
            'name' => 'Human Resource',
            'guard_name' => 'cms'
        ]);

        // tambahin permission disini sesuai module
        $role_hrd->givePermissionTo([
            'user management',
            'permission management',
            'klasemen management',
            'klasemen management link',
            'klasemen management score',
            'setting management',
            'attendance management',
            'leave request management',
            'employee management',
        ]);

        $user_hrd = User::create([
            'email' => 'hrd@app.com',
            'username' => 'humanresource',
            'name' => 'Human Resource',
            'password' => bcrypt('humanresource'),
        ]);
        $user_hrd->assignRole($role_hrd);


        // Make Role and User as a supervisor
        $role_supervisor = Role::firstOrCreate([
            'name' => 'Supervisor',
            'guard_name' => 'cms'
        ]);

        // tambahin permission disini sesuai module
        $role_supervisor->givePermissionTo([
            'user management',
            'permission management',
            'klasemen management',
            'klasemen management link',
            'klasemen management score',
            'setting management',
            'attendance management',
            'leave request management',
            'employee management',
        ]);

        $user_supervisor = User::create([
            'email' => 'supervisor@app.com',
            'username' => 'supervisor',
            'name' => 'Supervisor',
            'password' => bcrypt('supervisor'),
        ]);
        $user_supervisor->assignRole($role_supervisor);


        // Make Role and User as a employee
        $role_employee = Role::firstOrCreate([
            'name' => 'Employee',
            'guard_name' => 'cms'
        ]);

        // tambahin permission disini sesuai module
        $role_employee->givePermissionTo([
            'user management',
            'permission management',
            'klasemen management',
            'klasemen management link',
            'klasemen management score',
            'setting management',
            'attendance management',
            'leave request management',
            'employee management',
        ]);

        $user_employee1 = User::create([
            'email' => 'employee1@app.com',
            'username' => 'employee1',
            'name' => 'Employee 1',
            'password' => bcrypt('employee'),
        ]);
        $user_employee1->assignRole($role_employee);

        $user_employee2 = User::create([
            'email' => 'employee2@app.com',
            'username' => 'employee2',
            'name' => 'Employee 2',
            'password' => bcrypt('employee'),
        ]);
        $user_employee2->assignRole($role_employee);

        $user_employee3 = User::create([
            'email' => 'employee3@app.com',
            'username' => 'employee3',
            'name' => 'Employee 3',
            'password' => bcrypt('employee'),
        ]);
        $user_employee3->assignRole($role_employee);

        $user_employee4 = User::create([
            'email' => 'employee4@app.com',
            'username' => 'employee4',
            'name' => 'Employee 4',
            'password' => bcrypt('employee'),
        ]);
        $user_employee4->assignRole($role_employee);

        $user_employee5 = User::create([
            'email' => 'employee5@app.com',
            'username' => 'employee5',
            'name' => 'Employee 5',
            'password' => bcrypt('employee'),
        ]);
        $user_employee5->assignRole($role_employee);


    }
}
