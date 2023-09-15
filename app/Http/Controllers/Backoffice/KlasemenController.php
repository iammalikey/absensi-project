<?php

namespace App\Http\Controllers\Backoffice;

use App\Helpers\AlertHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\Klasemen\KlasemenUpdateRequest;
use App\Http\Resources\Backoffice\Klasemen\KlasemenEditResource;
use App\Http\Resources\Backoffice\Klasemen\KlasemenIndexResource;
use App\Models\Klasemen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class KlasemenController extends Controller
{
    public function index()
    {
        return inertia('Backoffice/Klasemen/Index', [
            'klasemens' => KlasemenIndexResource::collection(Klasemen::latest()->paginate(request()->size ?? 10))
        ]);
    }

    public function edit(Klasemen $klasemen)
    {
        return inertia('Backoffice/Klasemen/Edit', [
            'klasemen' => new KlasemenEditResource($klasemen),
        ]);
    }

    public function update(KlasemenUpdateRequest $request, Klasemen $klasemen)
    {
        try {
            DB::beginTransaction();
            $klasemen->title = $request->title;
            $klasemen->score = $request->score;
            $klasemen->cta_title = $request->cta_title;
            $klasemen->cta_link = $request->cta_link;
            $klasemen->save();
            DB::commit();

            return redirect()->route('cms.klasemen.index')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_update', ['type' => "Klasemen $klasemen->title"])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }
}
