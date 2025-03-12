<?php

namespace App\Http\Resources\Backoffice\Logs;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        dd($this->resource);
        return [
            'id' => $this->id,
            'date' => $this->date,
            'clock_in_lat' => $this->clock_in_lat ?? 'No Data',
            'clock_in_long' => $this->clock_in_long ?? 'No Data',
            'status' => $this->status,
        ];
    }
}
