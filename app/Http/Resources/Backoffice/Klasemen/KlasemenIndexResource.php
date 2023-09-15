<?php

namespace App\Http\Resources\Backoffice\Klasemen;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KlasemenIndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
