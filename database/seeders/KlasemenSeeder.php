<?php

namespace Database\Seeders;

use App\Models\Klasemen;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class KlasemenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Klasemen::create([
            'title' => 'Tim Niat',
            'slug' => Str::slug('Tim Niat'),
            'score' => '0',
            'cta_title' => 'Gabung Niat',
            'cta_link' => null,
        ]);
        Klasemen::create([
            'title' => 'Tim Satset',
            'slug' => Str::slug('Tim Satset'),
            'score' => '0',
            'cta_title' => 'Gabung Satset',
            'cta_link' => null,
        ]);
    }
}
