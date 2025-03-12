<?php

namespace App\Http\Resources\Backoffice;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogResource extends JsonResource
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
            'name' => $this->name,
            'attendance_count' => $this->attendance_count,
            'attendance' => isset($this->attendance) ? $this->attendance->map(function ($att) {
                return [
                    'clock_in_lat' => isset($att->clock_in_lat) ? $att->clock_in_lat : 'No Data',
                    'clock_in_long' => isset($att->clock_in_long) ? $att->clock_in_long : 'No Data',
                ];
            }) : [],
        ];
        
    }
}
