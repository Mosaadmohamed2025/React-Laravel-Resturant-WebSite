<?php 

namespace App\InterFaces\resturants;


use Illuminate\Database\Eloquent\Model;

interface ResturantRepositoryInterface
{

    public function index();

    public function store($request);
    
    public function update($request);
    
    public function destroy($request);
}