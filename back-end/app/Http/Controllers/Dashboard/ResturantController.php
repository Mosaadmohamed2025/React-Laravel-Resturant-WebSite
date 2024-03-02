<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\InterFaces\resturants\ResturantRepositoryInterface;


class ResturantController extends Controller
{
    private $Resturants;


    public function __construct(ResturantRepositoryInterface $Resturants)
    {
        $this->middleware('permission:المطاعم', ['only' => ['index']]);
        $this->middleware('permission:اضافة مطعم', ['only' => ['store']]);
        $this->middleware('permission:تعديل مطعم', ['only' => ['update']]);
        $this->middleware('permission:حذف مطعم', ['only' => ['destroy']]);

        $this->Resturants = $Resturants;
    }


    public function index()
    {
        return $this->Resturants->index();
    }
    

    public function store(Request $request)
    {
        return $this->Resturants->store($request);
    }

    public function update(Request $request)
    {
        return $this->Resturants->update($request);
    }
    public function destroy(Request $request)
    {
        return $this->Resturants->destroy($request);
    }

}
