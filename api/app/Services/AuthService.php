<?php

namespace App\Services;

class AuthService
{
    public function login($credentials)
    {
        $isLogin = auth()->attempt($credentials);
        $validator = \Validator::make([], []);

        if (!$isLogin) {
            $validator->errors()->add('username', 'Tên người dùng hoặc mật khẩu không đúng');
            $validator->success = false;
            return $validator;
        }

        $user = auth()->user();
        $token = $user->createToken('authToken')->plainTextToken;
        $validator->success = true;

        $user->token = $token;
        $validator->user = $user;

        return $validator;
    }

    public function logout(): bool
    {
        return auth()->user()->tokens()->delete();
    }
}
