<?php

namespace App\Http\Resources\Backoffice;

use Illuminate\Http\Resources\Json\JsonResource;

class LogResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
            'date' => $this->date,
            'clock_in' => $this->clock_in,
            'clock_out' => $this->clock_out,
            'clock_in_lat' => $this->clock_in_lat,
            'clock_in_long' => $this->clock_in_long,
            'distance' => round($this->distance, 2),
            'status' => $this->status,
        ];
    }
}

