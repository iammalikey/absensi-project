<?php

namespace App\Http\Requests\Backoffice\Employee;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'division_id' => 'required|exists:divisions,id',
            'full_name' => 'required|string|max:255',
            'place_of_birth' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'blood_type' => 'nullable|string|max:3',
            'address' => 'required|string',
            'nik' => 'required|string|max:16|unique:employees,nik,' . $this->employee->id,
            'npwp' => 'nullable|string|max:20|unique:employees,npwp,' . $this->employee->id,
            'postal_code' => 'nullable|string|max:10',
            'marital_status' => 'required|string|in:Single,Married,Divorced,Widowed',
            'religion' => 'required|string|in:Islam,Christian,Hindu,Buddhist,Others',
        ];
    }
}
