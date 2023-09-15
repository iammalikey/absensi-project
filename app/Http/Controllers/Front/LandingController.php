<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Klasemen;
use App\Models\Setting;

class LandingController extends Controller
{
    public function index()
    {
        $all_klasemen_data = Klasemen::get(['title', 'slug', 'score', 'cta_title', 'cta_link',]);

        $tim_niat = $all_klasemen_data->firstWhere('slug', Klasemen::TIM_NIAT_SLUG);
        $tim_satset = $all_klasemen_data->firstWhere('slug', Klasemen::TIM_SATSET_SLUG);

        // return Klasemen::where('title', 'Tim Niat')->pluck('score');
        return inertia('Front/LandingPage', [
            'tim_niat' => $tim_niat,
            'tim_satset' => $tim_satset,
            'challenge' => Setting::where('slug', Setting::CHALLENGE_SLUG)->first(['cta_title', 'cta_link']),
        ])->withViewData([
            'title' => env('APP_NAME'),
            'tag' => 'walls, unilever, feast, ice cream, es krim, vindes, vincent desta, tim niat, tim satset, challenge',
            'description' => "Jelajahi perjalanan seru tim 'Niat' dan tim 'Satset' dalam tantangan Wall's Feast Pop Unilever. Temukan rasa unik dari makanan lezat kami dalam petualangan yang penuh kegembiraan. Ikuti perjalanan mereka dan nikmati momen Wall's Feast Pop yang tak terlupakan.",
            'keywords' => null,
            'last_modified' => "2023-09-15T14:30:00Z",
            'environment' => null,
            'user_signed_in' => null,
            'og_type' => 'website',
            'og_title' => env('APP_NAME'),
            'og_description' => "Jelajahi perjalanan seru tim 'Niat' dan tim 'Satset' dalam tantangan Wall's Feast Pop Unilever. Temukan rasa unik dari makanan lezat kami dalam petualangan yang penuh kegembiraan. Ikuti perjalanan mereka dan nikmati momen Wall's Feast Pop yang tak terlupakan.",
            'og_site_name' => env('APP_NAME') . ' - ' . "Unilever",
            'og_image' => env('APP_URL') . '/assets/images/banner-2-seo.png',
            'og_url' => route('landing'),
            'twitter_site' => null,
            'twitter_creator' => null,
            'twitter_url' => route('landing'),
            'twitter_title' => env('APP_NAME'),
            'twitter_description' => "Jelajahi perjalanan seru tim 'Niat' dan tim 'Satset' dalam tantangan Wall's Feast Pop Unilever. Temukan rasa unik dari makanan lezat kami dalam petualangan yang penuh kegembiraan. Ikuti perjalanan mereka dan nikmati momen Wall's Feast Pop yang tak terlupakan.",
            'twitter_card' => 'summary_large_image',
            'twitter_image' => env('APP_URL') . '/assets/images/banner-2-seo.png',
            'twitter_widgets_new_embed_design' => null,
            'apple_mobile_web_app_title' => null,
            'application_name' => env('APP_NAME'),
            'fb_pages' => null,
            'theme_color' => null,
        ]);
    }
}
