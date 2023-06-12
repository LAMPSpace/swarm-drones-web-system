<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [[
            'name' => 'Admin',
            'username' => 'sadmin',
            'is_admin' => User::ADMIN_USER,
            'email' => 'admin@svute.com',
            'password' => bcrypt('password'),
        ], [
            'name' => 'User',
            'username' => 'normaluser',
            'is_admin' => User::NORMAL_USER,
            'email' => 'user@svute.com',
            'password' => bcrypt('password'),
        ]];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
