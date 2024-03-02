<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\InterFaces\orders\OrdersRepositoryInterface;
class OrderController extends Controller
{
    private $Orders;


    public function __construct(OrdersRepositoryInterface $Orders)
    { 
        $this->middleware('permission:الطلبات', ['only' => ['index']]);
        $this->middleware('permission:الطلبات الغير مدفوعة', ['only' => ['UnPaid_Order']]);
        $this->middleware('permission:الطلبات المدفوعة', ['only' => ['Paid_Order']]);
        $this->Orders = $Orders;
    }
    public function index()
    {
        return $this->Orders->index();
    }
    public function Paid_Order()
    {
        return $this->Orders->Paid_Order();
    }
    public function UnPaid_Order()
    {
        return $this->Orders->UnPaid_Order();
    }
    public function destroy(Request $request)
    {
        return $this->Orders->destroy($request);
    }
    public function Update_Status(Request $request)
    {
        return $this->Orders->Update_Status($request);
    }
    public function MarkAsRead_all(Request $request)
    {
        return $this->Orders->MarkAsRead_all($request);
    }
    public function edit($id)
    {
        return $this->Orders->edit($id);
    }

}
