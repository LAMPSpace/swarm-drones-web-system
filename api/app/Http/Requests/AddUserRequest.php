<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddUserRequest extends FormRequest
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
            'username' => 'required|string|unique:users,username|max:128',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'is_admin' => 'required|string|in:Y,N',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, mixed>
     */
    public function messages()
    {
        return [
            'name.required' => ':attribute không được để trống',
            'name.string' => ':attribute không hợp lệ',
            'name.max' => ':attribute không được vượt quá :max ký tự',
            'username.required' => ':attribute không được để trống',
            'username.string' => ':attribute không hợp lệ',
            'username.unique' => ':attribute đã tồn tại',
            'username.max' => ':attribute không được vượt quá :max ký tự',
            'email.required' => ':attribute không được để trống',
            'email.email' => ':attribute không hợp lệ',
            'email.unique' => ':attribute đã tồn tại',
            'password.required' => ':attribute không được để trống',
            'password.string' => ':attribute không hợp lệ',
            'is_admin.required' => ':attribute không được để trống',
            'is_admin.string' => ':attribute không hợp lệ',
            'is_admin.in' => ':attribute không hợp lệ',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, mixed>
     */
    public function attributes()
    {
        return [
            'name' => 'Họ và tên',
            'username' => 'Tên tài khoản',
            'email' => 'Email',
            'password' => 'Mật khẩu',
            'is_admin' => 'Quyền quản trị',
        ];
    }
}
