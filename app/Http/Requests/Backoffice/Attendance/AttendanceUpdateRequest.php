<?php

namespace App\Http\Requests\Backoffice\Attendance;

use Illuminate\Foundation\Http\FormRequest;

class AttendanceUpdateRequest extends FormRequest
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
            'user_id'               => ['required', 'exists:users,id'],
            'date'                  => ['required', 'date'],
            'clock_in'              => ['required', 'date_format:H:i'],
            'clock_out'             => ['required', 'date_format:H:i', 'after:clock_in'],
            'clock_in_location'     => ['required', 'string', 'max:255'],
            'category'              => ['required', 'string', 'max:255'],
            'status'                => ['required', 'string', 'max:255'],
        ];
    }
}
