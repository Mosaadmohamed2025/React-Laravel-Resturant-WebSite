<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::query()->delete();
        
        $permissions = [
            'المستخدمين',
            'قائمة المستخدمين',
            'صلاحيات المستخدمين',
            'المنتجات',
            'الاقسام',
            'الطلبات',
            'الطلبات الغير مدفوعة',
            'الطلبات المدفوعة',
            'الفروع',
            'المطاعم',
            'الموظفين',

            'اضافة مستخدم',
            'تعديل مستخدم',
            'حذف مستخدم',

            'عرض صلاحية',
            'اضافة صلاحية',
            'تعديل صلاحية',
            'حذف صلاحية',

            'اضافة منتج',
            'تعديل منتج',
            'حذف منتج',

            'اضافة قسم',
            'تعديل قسم',
            'حذف قسم',
            
            'اضافة موظف',
            'تعديل موظف',
            'حذف موظف',
            
            'اضافة مطعم',
            'تعديل مطعم',
            'حذف مطعم',
            'الاشعارات',

        ];

        foreach ($permissions as $permission) {

            Permission::create(['name' => $permission , 'guard_name' => 'admin']);
            }
    }
}
