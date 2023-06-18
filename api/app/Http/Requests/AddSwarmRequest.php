<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddSwarmRequest extends FormRequest
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
            'name' => 'required|string|max:128',
            'ip_address' => 'nullable|string|max:64|ip',
            'port' => 'nullable|integer|min:1|max:65535',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'name.required' => 'Tên của bầy đàn là bắt buộc',
            'name.string' => 'Tên của bầy đàn không hợp lệ',
            'name.max' => 'Tên của bầy đàn phải nhỏ hơn 128 ký tự',
            'ip_address.string' => 'Địa chỉ IP không hợp lệ',
            'ip_address.max' => 'Địa chỉ IP phải nhỏ hơn 64 ký tự',
            'ip_address.ip' => 'Địa chỉ IP không hợp lệ',
            'port.integer' => 'Cổng kết nối phải là số nguyên',
            'port.min' => 'Cổng kết nối phải lớn hơn 0',
            'port.max' => 'Cổng kết nối phải nhỏ hơn 65536',
        ];
    }
}
