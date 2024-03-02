<?php 

namespace App\InterFaces\orders;


use Illuminate\Database\Eloquent\Model;

interface OrdersRepositoryInterface
{
    public function index();

    public function destroy($request);  
    
    public function Update_Status($request); 
     
    public function Paid_Order();
    
    public function UnPaid_Order();

    public function edit($id);

    public function MarkAsRead_all ($request);

}