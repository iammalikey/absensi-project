<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionsPolicy
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        // Tambahkan header Permissions-Policy agar geolocation bisa digunakan
        $response->headers->set('Permissions-Policy', 'geolocation=(self "http://127.0.0.1:8000" "http://localhost")');

        
        return $response;
    }
}
