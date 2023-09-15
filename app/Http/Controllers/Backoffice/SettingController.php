<?php

namespace App\Http\Controllers\Backoffice;

use App\Helpers\AlertHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Backoffice\Setting\SettingUpdateRequest;
use App\Http\Resources\Backoffice\Setting\SettingEditResource;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SettingController extends Controller
{
    public function edit()
    {
        $challenge = Setting::where('slug', Setting::CHALLENGE_SLUG)->first();
        return inertia('Backoffice/Setting/Edit', [
            'challenge' => new SettingEditResource($challenge),
        ]);
    }

    public function update(SettingUpdateRequest $request)
    {
        $challenge = Setting::where('slug', Setting::CHALLENGE_SLUG)->first();
        try {
            DB::beginTransaction();
            $challenge->cta_title = $request->cta_title;
            $challenge->cta_link = $request->cta_link;
            $challenge->save();
            DB::commit();

            return redirect()->route('cms.setting.edit.challenge')->with('alert', ['type' => AlertHelper::ALERT_SUCCESS, 'message' => trans('success.crud_update', ['type' => "Setting $challenge->name"])]);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            Log::error($th);

            return back()->withErrors([trans('server.500')], 500);
        }
    }
}
