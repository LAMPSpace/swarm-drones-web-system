<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddMissionRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'swarm_id' => 'required|integer|exists:swarms,id',
            'waypoints' => 'required|array',
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
            'name.required' => 'Tên nhiệm vụ là bắt buộc',
            'swarm_id.required' => 'Swarm ID là bắt buộc',
            'waypoints.required' => 'Waypoints là bắt buộc',
        ];
    }
}
