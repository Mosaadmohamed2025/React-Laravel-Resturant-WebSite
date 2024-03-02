<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Image;
use App\Models\Section;
use App\Models\Resturant;
use App\Models\Location;
use App\Models\Order;
use App\Models\Orderitems;
use App\InterFaces\API\FrontendRepositoryInterface;


class FrontendController extends Controller
{
    private $FrontEnd;

    public function __construct(FrontendRepositoryInterface $FrontEnd)
    {
        $this->FrontEnd = $FrontEnd;
    }

    public function getProducts(){
        return $this->FrontEnd->getProducts();
    }
    public function getProductDetails($id){
        return $this->FrontEnd->getProductDetails($id);
    }
    public function getResturantLocations(){
        return $this->FrontEnd->getResturantLocations();
    }
    public function getOrders(){
        return $this->FrontEnd->getOrders();
    }
    public function updateProfile(Request $request){
        return $this->FrontEnd->updateProfile($request);
    }
}
