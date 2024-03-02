<?php 

namespace App\InterFaces\employees;


use Illuminate\Database\Eloquent\Model;

interface EmployeeRepositoryInterface
{
    public function index();

    public function create();

    public function store($request);
    
    public function update($request);
    
    public function destroy($request);
    
    public function edit($id);

}