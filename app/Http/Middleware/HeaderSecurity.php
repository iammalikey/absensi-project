<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HeaderSecurity
{
    // Enumerate headers which you do not want in your application's responses.
    // Great starting point would be to go check out @Scott_Helme's:
    // https://securityheaders.com/
    private $unwantedHeaderList = [
        'X-Powered-By',
        'Server',
        'X-Forwarded-Host',
        'Host'
    ];
    public function handle($request, Closure $next)
    {
        $this->removeUnwantedHeaders($this->unwantedHeaderList);
        $response = $next($request);
        $response->headers->set('Host', env('APP_URL'));
        $response->headers->set('Referrer-Policy', 'no-referrer-when-downgrade');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        // this permission-policy is disable all feature
        $response->headers->set('Permissions-Policy', 'accelerometer=(), ambient-light-sensor=(), autoplay=(), camera=(), encrypted-media=(), fullscreen=(), geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), speaker-selection=(), sync-xhr=(), usb=(), vr=()');
        if(env('APP_ENV') === 'production') $response->headers->set('Content-Security-Policy', "style-src 'self' 'unsafe-inline' ". env('APP_URL') . " https://fonts.googleapis.com https://fonts.bunny.net; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://analytics.tiktok.com https://www.google.com https://www.google-analytics.com https://www.gstatic.com");
        $response->headers->set('Cache-Control', "no-cache, no-store, must-revalidate");
        $response->headers->set('Pragma', "no-cache");
        $response->headers->set('Expires', "0");
        return $response;
    }
    private function removeUnwantedHeaders($headerList)
    {
        foreach ($headerList as $header)
            header_remove($header);
    }
}
