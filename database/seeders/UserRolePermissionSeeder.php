<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\PermissionRegistrar;

class UserRolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $userRole = Role::create(['name' => User::USER_ROLE]);
        $superAdminRole = Role::create(['name' => User::SUPER_ADMIN_ROLE]);
        $adminRole = Role::create(['name' => User::ADMIN_ROLE]);
        $managerRole = Role::create(['name' => User::MANAGER_ROLE]);

        $user_permission_arr = array(
            'create-post',
            'sync-social-accounts',
        );

        $manager_permission_arr = array(
            'create-post',
        );

        $super_admin_permission_arr = array(
            // Users
            'list-user',
            'edit-user',
            'view-user',
            'delete-user',
            // Account Types (ex: facebook, twitter)
            'create-account-type',
            'list-account-type',
            'edit-account-type',
            'delete-account-type',
            // // Permissions
            'create-permission',
            'list-permission',
            'edit-permission',
            'delete-permission',
            // Roles
            'create-role',
            'list-role',
            'edit-role',
            'delete-role',
        );

        $admin_permission_arr = array(
            // Users
            'list-user',
            'edit-user',
            'view-user',
            'delete-user',
            // Account Types (ex: facebook, twitter)
            'create-account-type',
            'list-account-type',
            'edit-account-type',
            'delete-account-type',
            // // Permissions
            'create-permission',
            'list-permission',
            'edit-permission',
            'delete-permission',
        );

        $all_permissions = array_merge($super_admin_permission_arr, $user_permission_arr, $manager_permission_arr);

        // Remove duplicate values
        $permissions = array_unique($all_permissions);

        foreach ($permissions as $all_permissions_name) {
            Permission::create(['name' => $all_permissions_name]);
        }


        foreach ($user_permission_arr as $user_permission_arr_name) {
            $userRole->givePermissionTo($user_permission_arr_name);
        }


        foreach ($manager_permission_arr as $manager_permission_arr_name) {
            $managerRole->givePermissionTo($manager_permission_arr_name);
        }

        foreach ($admin_permission_arr as $admin_permission_arr_name) {
            $adminRole->givePermissionTo($admin_permission_arr_name);
        }

        foreach ($super_admin_permission_arr as $super_admin_permission_arr_name) {
            $superAdminRole->givePermissionTo($super_admin_permission_arr_name);
        }


        $super_admin = User::create([
            'name' => 'super-admin',
            'email' => 'superadmin@gmail.com',
            'password' => bcrypt('password'),
            'account_type' => 'super-admin',
            'email_verified_at' => now(),
        ]);

        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'account_type' => 'admin',
            'email_verified_at' => now(),
        ]);

        $user = User::create([
            'name' => 'test-user',
            'email' => 'testuser@gmail.com',
            'password' => bcrypt('password'),
            'account_type' => 'test-user',
            'email_verified_at' => now(),
        ]);


        $manager = User::create([
            'name' => 'test-manager',
            'email' => 'testmanager@gmail.com',
            'password' => bcrypt('password'),
            'account_type' => 'test-manager',
            'email_verified_at' => now(),
        ]);


        $super_admin->assignRole($superAdminRole);
        $admin->assignRole($adminRole);
        $user->assignRole($userRole);
        $manager->assignRole($managerRole);
    }
}
