<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create([
            'name' => 'user management',
            'guard_name' => 'cms'
        ]);
        Permission::create([
            'name' => 'permission management',
            'guard_name' => 'cms'
        ]);
        Permission::create([
            'name' => 'role management',
            'guard_name' => 'cms'
        ]);

        Permission::create([
            'name' => 'klasemen management',
            'guard_name' => 'cms',
        ]);

        Permission::create([
            'name' => 'klasemen management link',
            'guard_name' => 'cms',
        ]);

        Permission::create([
            'name' => 'klasemen management score',
            'guard_name' => 'cms',
        ]);

        Permission::create([
            'name' => 'setting management',
            'guard_name' => 'cms',
        ]);

        Permission::create([
            'name' => 'attendance management',
            'guard_name' => 'cms',
        ]);

        Permission::create([
            'name' => 'leave request management',
            'guard_name' => 'cms',
        ]);

        Permission::create([
            'name' => 'employee management',
            'guard_name' => 'cms',
        ]);

        Permission::create([
            'name' => 'log management',
            'guard_name' => 'cms',
        ]);
    }
}
