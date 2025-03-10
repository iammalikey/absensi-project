<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Division;
use Illuminate\Support\Str;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $division1 = Division::create([
            'title' => 'Division 1',
            'slug' => Str::slug('division'),
        ]);

        $division2 = Division::create([
            'title' => 'Division 2',
            'slug' => Str::slug('division-2'),
        ]);

        $division3 = Division::create([
            'title' => 'Division 3',
            'slug' => Str::slug('division-3'),
        ]);

        $division4 = Division::create([
            'title' => 'Division 4',
            'slug' => Str::slug('division-4'),
        ]);
    }
}
