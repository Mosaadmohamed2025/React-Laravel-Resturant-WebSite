<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
class DashboardController extends Controller
{
    public function index()
    {
      $count_all =Order::count();
      $count_Paid = Order::where('status', 1)->count();
      $count_UnPaid = Order::where('status', 0)->count();

      if($count_UnPaid == 0){
          $nspainvoices2=0;
      }
      else{
          $nspainvoices2 = $count_UnPaid/ $count_all*100;
      }

        if($count_Paid == 0){
            $nspainvoices1=0;
        }
        else{
            $nspainvoices1 = $count_Paid/ $count_all*100;
        }

       


        $chartjs = app()->chartjs
            ->name('barChartTest')
            ->type('bar')
            ->size(['width' => 350, 'height' => 200])
            ->labels(['OrderUnPaid', 'OrderPaid'])
            ->datasets([
                [
                    "label" => "OrderUnPaid",
                    'backgroundColor' => ['#ec5858'],
                    'data' => [$nspainvoices2]
                ],
                [
                    "label" => "OrderPaid",
                    'backgroundColor' => ['#81b214'],
                    'data' => [$nspainvoices1]
                ],
               


            ])
            ->options([]);


        $chartjs_2 = app()->chartjs
            ->name('pieChartTest')
            ->type('pie')
            ->size(['width' => 340, 'height' => 200])
            ->labels(['OrderUnPaid', 'OrderPaid'])
            ->datasets([
                [
                    'backgroundColor' => ['#ec5858', '#81b214','#ff9642'],
                    'data' => [$nspainvoices2, $nspainvoices1]
                ]
            ])
            ->options([]);
        return view('Dashboard.Admin.dashboard',compact('chartjs','chartjs_2'));
    }
}
