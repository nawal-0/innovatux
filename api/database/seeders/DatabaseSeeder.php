<?php

namespace Database\Seeders;

use App\Models\Shop;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Settings;
use App\Models\Community;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(FactsTableSeeder::class);
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

        Settings::create([
            'user_id' => 1,
            'goal' => 'Health',
            'consumption_threshold' => 20,
            'savings_threshold' => 100,
            'notification' => 1,
            'public' => 1
        ]);

        Shop::create([
            'name' => 'Drink 1',
            'image' => "Goblet_of_Fire_Cocktail.jpg",
            'price' => 20
        ]);

        Shop::create([
            'name' => 'Drink 2',
            'image' => "Goblet_of_Fire_Cocktail.jpg",
            'price' => 12
        ]);

        Shop::create([
            'name' => 'Drink 3',
            'image' => "Goblet_of_Fire_Cocktail.jpg",
            'price' => 15
        ]);

        Shop::create([
            'name' => 'Drink 4',
            'image' => "Goblet_of_Fire_Cocktail.jpg",
            'price' => 15
        ]);

        Community::create([
            'name' => 'Saver',
            'description' => 'saving'
        ]);
        
        Community::create([
            'name' => 'Liver Longer',
            'description' => 'idk'
        ]);
        
        Community::create([
            'name' => 'Faitful Recovery',
            'description' => 'Issues'
        ]);
        
        Community::create([
            'name' => 'Drink?',
            'description' => 'Alcoholics'
        ]);
    }
}
