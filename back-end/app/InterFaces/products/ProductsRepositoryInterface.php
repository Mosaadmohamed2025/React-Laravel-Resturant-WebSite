<?php 

namespace App\InterFaces\products;


use Illuminate\Database\Eloquent\Model;

interface ProductsRepositoryInterface
{
    public function index();

    public function create();

    public function store($request);
    
    public function destroy($request);
    
    public function edit($id);

    public function update($request);
}