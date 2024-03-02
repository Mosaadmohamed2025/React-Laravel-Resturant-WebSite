<?php
namespace App\InterFaces\API;

use Illuminate\Database\Eloquent\Model;

interface CheckoutRepositoryInterface{
    public function placeorder($request);
    public function makePayment($request);
}