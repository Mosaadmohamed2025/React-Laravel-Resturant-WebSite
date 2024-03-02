<?php

namespace App\Repository\API;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\InterFaces\API\FrontendRepositoryInterface;
use App\Models\Product;
use App\Models\Image;
use App\Models\Section;
use App\Models\Resturant;
use App\Models\Location;
use App\Models\Order;
use App\Models\Orderitems;

class FrontendRepository implements FrontendRepositoryInterface{
    public function getProducts()
    {
        $products = Product::all();
        $images = Image::all();
        $sections = Section::all();
         return response()->json([
            'status' => 200,
            'sections' => $sections,
            'products' => $products,
            'images' => $images,
        ]);
    }   

    public function getProductDetails($id)
    {
        $product = Product::where('id',$id)->first();
        $section = Section::where('id',$product->section_id)->first();
        $images = Image::where('product_id' ,$product->id)->get();

        return response()->json([
            'status' => 200,
            'product' => $product,
            'section' => $section,
            'images' => $images,
        ]);

    }

    public function getResturantLocations()
    {
        $resturants = Resturant::all();
        $locations = Location::all();
        return response()->json([
            'status' => 200,
            'resturants' => $resturants,
            'locations' => $locations
        ]); 
    }

    public function getOrders()
{
    if (auth('sanctum')->check()) {
        $user_id = auth('sanctum')->user()->id;
        $orders = Order::where('user_id', $user_id)->get();
        $orderItemsByOrder = [];

        foreach ($orders as $order) {
            $orderitems = Orderitems::where('order_id', $order->id)->get();
            $orderItemsByOrder[] = [
                'order' => $order,
                'orderitems' => $orderitems,
            ];
        }

        return response()->json([
            'status' => 200,
            'orders' => $orderItemsByOrder,
        ]);
    }

    return response()->json([
        'status' => 401,
        'message' => 'Login to Continue',
    ]);
}
public function updateProfile($request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255',
        'password' => 'nullable|string|min:8|same:password_confirmation',
    ]);

    if($validator->fails())
    {
        return  response()->json([
            'validation_errors' =>$validator->messages(),
        ]);

    }else{
        try{
            $user = auth('sanctum')->user();
            $user->name = $request->input('name');
            $user->email = $request->input('email');

            if ($request->filled('password')) {
                $user->password = Hash::make($request->input('password'));
            }

            
            $user->save();

            return  response()->json([
                'status' =>200,
                'username' => $user->name,
                'email' => $user->email,
                'message' => 'Profile update In Successfully',
            ]);
        }catch (\Exception $e) {
            \Log::error('Error while saving profile online: ' . $e);
            return response()->json([
                    'status' => 500,
                    'message' => 'An error occurred while saving the profile.',
            ]);                    
        }
    }
}
}