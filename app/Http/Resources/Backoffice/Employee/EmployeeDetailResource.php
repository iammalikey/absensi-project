<?php

namespace App\Http\Resources\Backoffice\Employee;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeDetailResource extends JsonResource
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
            'user' => [
                'id' => $this->user_id,
                'email' => isset($this->user) ? $this->user->email : null,
                'avatar' => isset($this->user) ? $this->user->avatar : null,
            ],
            'division' => isset($this->division) ? ['id' => $this->division->id, 'title' => $this->division->title] : null,
            'created_at' => $this->created_at->format('d M Y H:i'),
        ];
    }
}
