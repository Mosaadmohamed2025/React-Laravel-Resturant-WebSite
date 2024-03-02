<?php

namespace App\Repository\orders;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\InterFaces\orders\OrdersRepositoryInterface;
use App\Models\Product;
use App\Models\Section;
use App\Models\Order;
use App\Models\Orderitems;


class OrderRepository implements OrdersRepositoryInterface{

    public function index()
    {
        $orders = Order::all();
        return view('Dashboard.Admin.orders.index' , compact('orders'));
    }
    public function destroy($request)
    {
        if($request->page_id==1){

            $orderID = $request->input('id');

            $Order = Order::find($orderID);
        
            if (!$Order) {
                session()->flash('error', 'The Order is not found');
                return redirect('/Orders');        
            }

            $Order->delete();

            session()->flash('delete', 'The Order has been deleted');
            return redirect('/Orders');     
        }else if($request->page_id== 2){

        }
          else{

            $delete_select_id = explode(",", $request->delete_select_id);
                foreach ($delete_select_id as $ids_Orders){
                    $Order = Order::findorfail($ids_Orders);
                        $Order->delete();
                    }
            session()->flash('delete', 'The All orders Selected have been deleted');
            return redirect('/Orders'); 
        }
    }
    public function Update_Status($request)
    {
            $Order = Order::findorfail($request->id);
            $Order->status = $request->status;

            $Order->save();
            session()->flash('edit', 'The Order Status has been updated successfully');
            return redirect('/Orders');
       
    }
   
    public function Paid_Order()
    {
           $orders = Order::where('status' , 1)->get();
           return view('Dashboard.Admin.orders.orders_paid' , compact('orders'));
    }
    public function UnPaid_Order()
    {
           $orders = Order::where('status' , 0)->get();
           return view('Dashboard.Admin.orders.orders_unpaid' , compact('orders'));
    }
    public function edit($id)
    
    {
        $order = Order::where('id',$id)->first();
        $Orderitems  = Orderitems::where('order_id',$id)->get();
        return view('Dashboard.Admin.orders.order_details',compact('order','Orderitems'));
    }
    
    public function MarkAsRead_all ($request)
    {
        $userUnreadNotification= auth()->user()->unreadNotifications;

        if($userUnreadNotification) {
            $userUnreadNotification->markAsRead();
            return back();
        }
    }
}