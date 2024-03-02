<?php

namespace App\Repository\API;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\InterFaces\API\CheckoutRepositoryInterface;
use App\Models\Order;
use App\Models\Admin;
use App\Notifications\OrderPlaced;
use Stripe\Stripe;

class CheckoutRepository implements CheckoutRepositoryInterface
{
    public function placeorder($request)
    {
        if(auth('sanctum')->check())
        {
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|max:191',
                'lastname' => 'required|max:191',
                'phone' => 'required|max:191',
                'email' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191',
            ]);

            if($validator->fails())
            {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(), // Make sure this matches your frontend's expected format.
                ]);
            }else{

                $user_id = auth('sanctum')->user()->id;
                try{
                    $order = new Order;
                    $order->user_id = $user_id;
                    $order->firstname = $request->firstname;
                    $order->lastname = $request->lastname;
                    $order->phone = $request->phone;
                    $order->email = $request->email;
                    $order->address = $request->address;
                    $order->city = $request->city;
                    $order->state = $request->state;
                    $order->zipcode = $request->zipcode;
    
                    $order->payment_mode = "COD";
                    $order->tracking_no = 'italiano' . rand(111 , 9999);
                    $order->total = $request->subtotal;
                    $order->save();
                    $cart = json_decode($request->cartItems);         
                    $orderitems = [];
                        foreach($cart as $item)
                        {
                            $orderitems[] = [
                                'product_id' => $item->id,
                                'qty' => $item->quantity,
                                'price' => $item->totalPrice,
                                'product_name' => $item->title
                            ];
                        }
                        $order->orderitems()->createMany($orderitems);
                    
    
                        $order_id = $order->id;
                        $user = Admin::where('email' , 'admin@gmail.com')->first();
                        
                        $orders = Order::latest()->first();

                        Notification::send($user, new OrderPlaced($order_id));

                        Notification::send($user, new \App\Notifications\NewOrder($orders));

                    return response()->json([
                        'status' => 200,
                        'message' => 'order placed successfully',
                    ]);

                } catch (\Exception $e) {
                    \Log::error('Error while saving order: ' . $e->getMessage());
                    return response()->json([
                            'status' => 500,
                            'message' => 'An error occurred while saving the order.',
                        ]);                    
                }

               
            }
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue',
            ]);
        }
    }
    public function makePayment($request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|max:191',
                'lastname' => 'required|max:191',
                'phone' => 'required|max:191',
                'email' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191',
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(), // Make sure this matches your frontend's expected format.
                ]);
            } else {
                Stripe::setApiKey(config('services.stripe.secret'));

                $amountInCents = (int)($request->subtotal * 100);

    
                try {
                    // إنشاء الدفعة على Stripe واسترداد الرابط الذي سيتم توجيه المستخدم إليه لإتمام الدفع
                    $paymentIntent = \Stripe\PaymentIntent::create([
                        'amount' => $amountInCents, // قيمة المبلغ بالسنت (في هذا المثال 10 دولار)
                        'currency' => 'usd', // العملة
                    ]);
    
                    // يمكنك إرسال الرابط إلى الجزء الأمامي لتنفيذ عملية الدفع
                    $clientSecret = $paymentIntent->client_secret;
    
                    $user_id = auth('sanctum')->user()->id;
                    $order = new Order;
                    $order->user_id = $user_id;
                    $order->firstname = $request->firstname;
                    $order->lastname = $request->lastname;
                    $order->phone = $request->phone;
                    $order->email = $request->email;
                    $order->address = $request->address;
                    $order->city = $request->city;
                    $order->state = $request->state;
                    $order->zipcode = $request->zipcode;
    
                    $order->total = $request->subtotal;
                    $order->payment_mode = "stripe";
                    $order->status = 1;
                    $order->tracking_no = 'italiano' . rand(111, 9999);
                    $order->save();
    
                    $cart = json_decode($request->cartItems);
                    $orderitems = [];

                    foreach ($cart as $item) {
                        $orderitems[] = [
                            'product_id' => $item->id,
                            'qty' => $item->quantity,
                            'price' => $item->totalPrice,
                            'product_name' => $item->title
                        ];
                    }
                    $order->orderitems()->createMany($orderitems);

                    $order_id = $order->id;
                    $user = Admin::where('email' , 'admin@gmail.com')->first();
                    
                    $orders = Order::latest()->first();

                    Notification::send($user, new OrderPlaced($order_id));

                    Notification::send($user, new \App\Notifications\NewOrder($orders));

    
                    return response()->json([
                        'status' => 200,
                        'clientSecret' => $clientSecret, 
                    ]);
                } catch (\Exception $e) {
                    \Log::error('Error while saving order online: ' . $e);
                    return response()->json([
                            'status' => 500,
                            'message' => 'An error occurred while saving the order.',
                        ]);                    
                }
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue',
            ]);
        }
    }
}