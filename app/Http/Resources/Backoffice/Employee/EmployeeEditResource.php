<?php

namespace App\Http\Resources\Backoffice\Employee;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeEditResource extends JsonResource
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
            'full_name' => $this->full_name,
            'place_of_birth' => $this->place_of_birth,
            'date_of_birth' => $this->date_of_birth,
            'phone' => $this->phone,
            'gender' => $this->gender,
            'marital_status' => $this->marital_status,
            'blood_type' => $this->blood_type,
            'religion' => $this->religion,
            'address' => $this->address,
            'postal_code' => $this->postal_code,
            'nik' => $this->nik,
            'npwp' => $this->npwp,
            'user' => [
                'email' => isset($this->user) ? $this->user->email : null,
                'avatar' => isset($this->user) ? $this->user->avatar : null,
            ],
            'division' => isset($this->division) ? ['id' => $this->division->id, 'title' => $this->division->title] : null,
        ];
    }
}
