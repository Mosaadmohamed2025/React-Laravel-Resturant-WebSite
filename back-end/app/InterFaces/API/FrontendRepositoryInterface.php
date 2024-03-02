<?php 

namespace App\InterFaces\API;

use Illuminate\Database\Eloquent\Model;

interface FrontendRepositoryInterface{
    
    public function getProducts();

    public function getProductDetails($id);

    public function getResturantLocations();

    public function getOrders();

    public function updateProfile($request);
}