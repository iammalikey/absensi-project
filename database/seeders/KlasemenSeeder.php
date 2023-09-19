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
            'slug' => 'tim-niat',
            'score' => '0',
            'cta_title_instagram' => 'Gabung Niat',
            'cta_link_instagram' => null,
            'cta_title_tiktok' => 'Gabung Niat',
            'cta_link_tiktok' => null,
        ]);
        Klasemen::create([
            'title' => 'Tim Satset',
            'slug' => 'tim-satset',
            'score' => '0',
            'cta_title_instagram' => 'Gabung Satset',
            'cta_link_instagram' => null,
            'cta_title_tiktok' => 'Gabung Satset',
            'cta_link_tiktok' => null,
        ]);
    }
}
