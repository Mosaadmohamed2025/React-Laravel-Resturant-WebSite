<?php

namespace App\Repository\employees;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\InterFaces\employees\EmployeeRepositoryInterface;
use App\Models\Employee;
use App\Models\Resturant;


class EmployeeRepository implements EmployeeRepositoryInterface{

            public function index()
            {
                $employees = Employee::all();
                $branches = Resturant::all();
                return view('Dashboard.Admin.employees.index' , compact('employees','branches'));
            }

            public function create()
            {
                $branches = Resturant::all();
                return view('Dashboard.Admin.employees.add',compact('branches'));
            }
            
            public function store($request)
            {
            // التحقق من صحة البيانات المدخلة
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'salary' => 'required|numeric',
                'branch_id' => 'required|exists:resturants,id',
                'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048', // السماح بصور JPEG و PNG بحجم أقصى 2MB لكل صورة
            ]);

            if($request->has('photo')){

                $image = $request->file('photo');
                $imageName = $data['name'].'-image-'.time().rand(1,1000).'.'.$image->extension();
                $image->move(public_path('employee_images'),$imageName);
                
                $employee = Employee::create([
                    'name' => $request->input('name'),
                    'email' => $request->input('email'),
                    'salary' => $request->input('salary'),
                    'branch_id' => $request->input('branch_id'),
                    'image'=>$imageName
                ]);
                }

                $employee->save();

                session()->flash('Add', 'The employee has been added successfully');
                return redirect('/Employees');
            }
            
        public function destroy($request)
        {
            if($request->page_id==1){

                $employee = $request->input('employee_id');

                // التحقق مما إذا كان المنتج موجودًا
                $employee = Employee::find($employee);
            
                if (!$employee) {
                    session()->flash('error', 'The employee is not found');
                    return redirect('/Employees');        
                }

                if($employee->image)
                {
                    Storage::disk('employee')->delete($employee->image);
                }

                $employee->delete();

                session()->flash('delete', 'The employee has been deleted');
                return redirect('/Employees');     
            } else{

                $delete_select_id = explode(",", $request->delete_select_id);
                foreach ($delete_select_id as $ids_employees){
                    $employee = Employee::findorfail($ids_employees);
                    Storage::disk('employee')->delete($employee->image);
                    $employee->delete();
                }

                session()->flash('delete', 'The All employees have been deleted');
                return redirect('/Employees'); 
            }
        }

        public function edit($id)
        {
            $employee = Employee::findorfail($id);
            $branches = Resturant::all();
            return view('Dashboard.Admin.employees.edit', compact('employee', 'branches'));
        }

        public function update($request)
        {
             // التحقق من صحة البيانات المدخلة
             $data = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'salary' => 'required|numeric',
                'branch_id' => 'required|exists:resturants,id',
                'photo' => 'image|mimes:jpeg,png,jpg|max:2048', // السماح بصور JPEG و PNG بحجم أقصى 2MB لكل صورة
            ]);

           
                    
                    $employee = Employee::findorfail($request->id);
                    $employee->name = $request->name;
                    $employee->email = $request->email;
                    $employee->salary = $request->salary;
                    $employee->branch_id = $request->branch_id;
                
                
                    
                    if($request->has('photo')){
                    
                    Storage::disk('employee')->delete($employee->image);
                    
                    $image = $request->file('photo');
                    $imageName = $data['name'].'-image-'.time().rand(1,1000).'.'.$image->extension();
                    $image->move(public_path('employee_images'),$imageName);

                    $employee->image = $imageName;
                }
                
                $employee->save();
                session()->flash('edit', 'The employee has been edtited successfully');
                return redirect('/Employees');
                
        }
}