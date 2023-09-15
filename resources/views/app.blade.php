<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        @if (isset($title))
        <title inertia>{{ $title }} - {{ config('app.name', 'Laravel') }}</title>
        @else
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        @endif
        @if (env('APP_ENV') == 'production')
        <meta name="robots" content="index, follow" />
        @else
        <meta name="robots" content="noindex, nofollow" />
        @endif
        @if (isset($description))
        <meta name="description" content="{{ $description }}"/>
        @endif
        @if (isset($tag))
        <meta name="tag" content="{{ $tag }}" />
        @endif
        @if (isset($keywords))
        <meta name="keywords" content="{{ $keywords }}" />
        @endif
        @if (isset($created_at))
        <meta name="date.created" content="{{ $created_at }}" />
        @endif
        @if (isset($last_modified))
        <meta name="last-modified" content="{{ $last_modified }}" />
        @endif
        @if (isset($environment))
        <meta name="environment" content="{{ $environment }}" />
        @endif
        @if (isset($user_signed_in))
        <meta name="user-signed-in" content="{{ $user_signed_in }}" />
        @endif
        @if (isset($og_type))
        <meta property="og:type" content="{{ $og_type }}" />
        @endif
        @if (isset($og_url))
        <meta property="og:url" content="{{ $og_url }}" />
        @endif
        @if (isset($og_title))
        <meta property="og:title" content="{{ $og_title }}" />
        @endif
        @if (isset($og_description))
        <meta property="og:description" content="{{ $og_description }}" />
        @endif
        @if (isset($og_site_name))
        <meta property="og:site_name" content="{{ $og_site_name }}" />
        @endif
        @if (isset($og_image))
        <meta property="og:image" content="{{ $og_image }}" />
        @endif
        @if (isset($twitter_site))
        <meta name="twitter:site" content="{{ $twitter_site }}" />
        @endif
        @if (isset($twitter_creator))
        <meta name="twitter:creator" content="{{ $twitter_creator }}" />
        @endif
        @if (isset($twitter_url))
        <meta name="twitter:url" content="{{ $twitter_url }}" />
        @endif
        @if (isset($twitter_title))
        <meta name="twitter:title" content="{{ $twitter_title }}" />
        @endif
        @if (isset($twitter_description))
        <meta name="twitter:description" content="{{ $twitter_description }}" />
        @endif
        @if (isset($twitter_card))
        <meta name="twitter:card" content="{{ $twitter_card }}" />
        @endif
        @if (isset($twitter_widgets_new_embed_design))
        <meta name="twitter:widgets:new-embed-design" content="{{ $twitter_widgets_new_embed_design }}" />
        @endif
        @if (isset($twitter_image))
        <meta name="twitter:image" content="{{ $twitter_image }}" />
        @endif
        @if (isset($apple_mobile_web_app_title))
        <meta name="apple-mobile-web-app-title" content="{{ $apple_mobile_web_app_title }}" />
        @endif
        @if (isset($application_name))
        <meta name="application-name" content="{{ $application_name }}" />
        @endif
        @if (isset($fb_pages))
        <meta property="fb:pages" content="{{ $fb_pages }}" />
        @endif
        @if (isset($theme_color))
        <meta name="theme-color" content="{{ $theme_color }}" />
        @endif
        {{-- <!-- Fonts --> --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        {{-- <!-- Scripts --> --}}
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
