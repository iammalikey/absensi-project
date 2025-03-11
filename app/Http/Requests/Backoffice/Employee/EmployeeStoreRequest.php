<?php

namespace App\Http\Requests\Backoffice\Employee;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeStoreRequest extends FormRequest
{
    /**
     * Menentukan apakah user diizinkan melakukan request ini.
     */
    public function authorize(): bool
    {
        return true; // Ubah ke false jika ingin membatasi akses
    }

    /**
     * Aturan validasi untuk request ini.
     */
    public function rules(): array
    {
        return [
            'user_id'       => ['required', 'exists:users,id', 'unique:employees,user_id'],
            'division_id'   => ['required', 'exists:divisions,id'],
            'marital_status'=> ['required', 'string'],
            'religion'      => ['required', 'string'],
            'full_name'     => ['required', 'string', 'max:255'],
            'place_of_birth'=> ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'date'],
            'blood_type'    => ['nullable', 'string', 'max:3'],
            'address'       => ['required', 'string'],
            'nik'           => ['required', 'string', 'size:16', 'unique:employees,nik'],
            'npwp'          => ['nullable', 'string', 'size:15', 'unique:employees,npwp'],
            'postal_code'   => ['required', 'string', 'max:10'],
        ];
    }

    
}
