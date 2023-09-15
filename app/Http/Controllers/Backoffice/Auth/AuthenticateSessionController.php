<?php

namespace App\Http\Controllers\Backoffice\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\Auth\LoginRequest;
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
        return inertia('Backoffice/Auth/Login', []);
    }
    
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        
        $request->session()->regenerate();

        try {
            // Fail to login for users that want to login with a logged in account
            $userId = Auth::guard('cms')->id();
            $twoHoursAgo = Carbon::now()->subHours(2)->timestamp;
            if (DB::table('sessions')->where('user_id', $userId)->where('last_activity', '>', $twoHoursAgo)->exists()) {
                Auth::guard('cms')->logout();
                return back()->withErrors([trans('server.session_unavailable')], 500);
            }
            Auth::logoutOtherDevices($request->password);
            // ---------------------------------------------------------------------
        } catch (\Throwable $th) {
            //throw $th;
            Log::notice($th);
        }

        return redirect()->intended(route('cms.dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('cms')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('cms.login');
    }
}
