<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DataTableRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'sort_field' => 'nullable|string',
            'sort_order' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer',
            'search' => 'nullable|string',
            'page' => 'nullable|integer',
            'is_paginate' => 'nullable|int|in:0,1',
        ];
    }
}
