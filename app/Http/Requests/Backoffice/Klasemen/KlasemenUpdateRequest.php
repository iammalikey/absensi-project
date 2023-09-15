<?php

namespace App\Http\Requests\Backoffice\Klasemen;

use Illuminate\Foundation\Http\FormRequest;

class KlasemenUpdateRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:256'],
            'score' => ['required', 'numeric', 'min:0'],
            'cta_title' => ['required', 'string'],
            'cta_link' => ['nullable', 'url'],
        ];
    }
}
