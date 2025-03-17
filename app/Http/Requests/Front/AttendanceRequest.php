<?php

namespace App\Http\Requests\Front;

use Illuminate\Foundation\Http\FormRequest;

class AttendanceRequest extends FormRequest
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
            'clock_in' => 'required|date_format:Y-m-d H:i:s',
            'clock_in_lat' => 'required|numeric',
            'clock_in_long' => 'required|numeric',
        ];
    }
}
