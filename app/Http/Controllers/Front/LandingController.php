<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Klasemen;
use Illuminate\Http\Request;

class LandingController extends Controller
{
    public function index()
    {
        $all_klasemen_data = Klasemen::get(['title', 'slug', 'score', 'cta_title', 'cta_title',]);

        $tim_niat = $all_klasemen_data->firstWhere('slug', Klasemen::TIM_NIAT_SLUG);
        $tim_satset = $all_klasemen_data->firstWhere('slug', Klasemen::TIM_SATSET_SLUG);

        // return Klasemen::where('title', 'Tim Niat')->pluck('score');
        return inertia('Front/LandingPage', [
            'tim_niat' => $tim_niat,
            'tim_satset' => $tim_satset,
        ]);
    }
}
