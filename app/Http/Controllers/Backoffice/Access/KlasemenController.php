<?php

namespace App\Http\Controllers\Backoffice\Access;

use App\Http\Controllers\Controller;
use App\Models\Klasemen;
use App\Models\Post;
use Illuminate\Http\Request;

class KlasemenController extends Controller
{
    public function index()
    {
        return inertia('Backoffice/Klasemen/Index', [
            'klasemen' => Klasemen::latest()->get(),
        ]);
    }

    public function create()
    {
        return inertia('Backoffice/Klasemen/Create');
    }
}
