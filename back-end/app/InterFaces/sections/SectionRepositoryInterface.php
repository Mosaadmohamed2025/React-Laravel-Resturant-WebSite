<?php 

namespace App\Interfaces\Sections;


use Illuminate\Database\Eloquent\Model;

interface SectionRepositoryInterface
{
    public function index();

    public function store($request);
    
    public function destroy($request);

    public function update($request);
}