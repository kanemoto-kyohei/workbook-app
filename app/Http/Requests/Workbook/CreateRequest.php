<?php

namespace App\Http\Requests\Workbook;

use Illuminate\Foundation\Http\FormRequest;

class CreateRequest extends FormRequest
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
            //
            'question' => 'required|string|max:2000',
            'options' => 'array|min:2',
            'options.*'=> 'string|max:2000',
            'answer' => 'required|numeric',
            'description' => 'max:2000'


        ];
    }
}
