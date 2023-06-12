<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    private ?AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $validator = $this->authService->login($credentials);

        if (!$validator->success) {
            return response()->json([
                'message' => 'Đăng nhập thất bại',
                'errors' => $validator->errors(),
            ], 422);
        }

        return response()->json($validator->user, 200);
    }

    public function logout()
    {
        $this->authService->logout();

        return response()->json(['message' => 'Đăng xuất thành công'], 200);
    }
}
