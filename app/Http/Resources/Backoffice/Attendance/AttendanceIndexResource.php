<?php

namespace App\Http\Resources\Backoffice\Attendance;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class AttendanceIndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'date' => $this->date,
            'clock_in' => $this->clock_in ? Carbon::parse($this->clock_in)->addHours(7)->format('Y-m-d H:i:s') : null,
            'clock_out' => $this->clock_out ? Carbon::parse($this->clock_out)->addHours(7)->format('Y-m-d H:i:s') : null,
            'clock_in_lat' => $this->clock_in_lat,
            'clock_in_long' => $this->clock_in_long,
            'category' => $this->category,
            'status' => $this->status,
            'user_id' => $this->user_id,
            'user' => [
                'email' => isset($this->user) ? $this->user->email : null,
                'name' => isset($this->user) ? $this->user->name : null,
            ],
        ];
    }
}
