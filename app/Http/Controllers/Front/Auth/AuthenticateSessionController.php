<?php

namespace App\Http\Controllers\Front\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Front\Auth\LoginRequest;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AuthenticateSessionController extends Controller
{
    public function index()
    {
        return inertia('Front/Auth/Login', []);
    }
    
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        
        $request->session()->regenerate();
        

        try {
            // Fail to login for users that want to login with a logged in account
            $userId = Auth::guard('web')->id();
            $twoHoursAgo = Carbon::now()->subHours(2)->timestamp;
            if (DB::table('sessions')->where('user_id', $userId)->where('last_activity', '>', $twoHoursAgo)->exists()) {
                Auth::guard('web')->logout();
                return back()->withErrors([trans('server.session_unavailable')], 500);
            }
            Auth::logoutOtherDevices($request->password);
            // ---------------------------------------------------------------------
        } catch (\Throwable $th) {
            //throw $th;
            Log::notice($th);
        }
        // dd(Auth::check(), Auth::user());
        

        return redirect()->route('attendance.index');


    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // return redirect()->route('web.login');
        return redirect()->route('landing');
    }
}
