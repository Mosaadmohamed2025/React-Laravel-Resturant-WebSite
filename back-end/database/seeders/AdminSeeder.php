<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\Admin;
class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('admins')->delete();
        $user = Admin::create([
            'name' => 'admin', 
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345678'),
            'roles_name' => ["owner"],
            'Status' => 'مفعل',
            ]);
      
            $role = Role::where('name', 'owner')->where('guard_name', 'admin')->first();

            if (!$role) {
                $role = Role::create([
                    'name' => 'owner',
                    'guard_name' => 'admin',
                ]);
            }

           
            $permissions = Permission::pluck('id', 'id')->all();
            $role->syncPermissions($permissions);

            $user->assignRole([$role->name]);
}
}