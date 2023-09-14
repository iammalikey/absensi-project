<?php

namespace App\Http\Controllers\Backoffice\Access;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        return inertia('Backoffice/Setting/Index', [
            'setting' => Setting::get(),
        ]);
    }
}
