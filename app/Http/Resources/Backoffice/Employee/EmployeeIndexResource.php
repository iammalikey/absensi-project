<?php

namespace App\Http\Resources\Backoffice\Employee;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeIndexResource extends JsonResource
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
            'full_name' => $this->full_name,
            'user_id' => $this->user_id,
            'user' => [
                'email' => isset($this->user) ? $this->user->email : null,
                'avatar' => isset($this->user) ? $this->user->avatar : null,
            ],
            'division' => isset($this->division) ? ['title' => $this->division->title] : null,
        ];
    }
}
