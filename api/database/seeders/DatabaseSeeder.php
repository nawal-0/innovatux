<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'Test',
            'last_name' => 'User',
            'email' => '123@abc.com',
            'password' => bcrypt('pass'),
            'age' => 25,
            'gender' => 'M',
            'username' => '123',
            'remember_token' => '1234567890'

        ]);
    }
}
