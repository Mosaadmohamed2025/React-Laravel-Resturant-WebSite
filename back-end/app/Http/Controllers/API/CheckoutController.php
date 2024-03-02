<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use Stripe\Stripe;
use App\InterFaces\API\CheckoutRepositoryInterface;

class CheckoutController extends Controller
{
    private $CheckOut;

    public function __construct(CheckoutRepositoryInterface $CheckOut)
    {
        $this->CheckOut = $CheckOut;
    }

    public function placeorder(Request $request){
        return $this->CheckOut->placeorder($request);
    }
    public function makePayment(Request $request){
        return $this->CheckOut->makePayment($request);
    }
}
