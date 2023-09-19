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
            'score' => auth('cms')->user()->hasPermissionTo('klasemen management score') ? ['required', 'numeric', 'min:0'] : [],
            'cta_title_instagram' => ['required', 'string'],
            'cta_title_tiktok' => ['required', 'string'],
            'cta_link_instagram' => auth('cms')->user()->hasPermissionTo('klasemen management link') ? ['nullable', 'url'] : [],
            'cta_link_tiktok' => auth('cms')->user()->hasPermissionTo('klasemen management link') ? ['nullable', 'url'] : [],
        ];
    }
}
