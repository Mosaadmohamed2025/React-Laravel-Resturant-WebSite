<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\InterFaces\employees\EmployeeRepositoryInterface;

class EmployeeController extends Controller
{
    private $Employees;


    public function __construct(EmployeeRepositoryInterface $Employees)
    {
        $this->middleware('permission:الموظفين', ['only' => ['index']]);
        $this->middleware('permission:اضافة موظف', ['only' => ['create','store']]);
        $this->middleware('permission:تعديل موظف', ['only' => ['edit','update']]);
        $this->middleware('permission:حذف موظف', ['only' => ['destroy']]);

        $this->Employees = $Employees;
    }

    public function index()
    {
        return $this->Employees->index();
    }
    public function create()
    {
        return $this->Employees->create();
    }
    public function store(Request $request)
    {
        return $this->Employees->store($request);
    }
    public function update(Request $request)
    {
        return $this->Employees->update($request);
    }
    public function destroy(Request $request)
    {
        return $this->Employees->destroy($request);
    }
    public function edit($id)
    {
        return $this->Employees->edit($id);
    }
}
