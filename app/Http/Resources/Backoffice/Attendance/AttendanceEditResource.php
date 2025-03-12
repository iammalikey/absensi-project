<?php

namespace App\Http\Resources\Backoffice\Attendance;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceEditResource extends JsonResource
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
            'clock_in' => $this->clock_in,
            'clock_out' => $this->clock_out,
            'clock_in_location' => $this->clock_in_location,
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
