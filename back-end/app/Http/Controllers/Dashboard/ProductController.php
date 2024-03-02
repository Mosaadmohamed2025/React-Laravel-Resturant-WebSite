<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\InterFaces\products\ProductsRepositoryInterface;


class ProductController extends Controller
{
    private $Products;


    public function __construct(ProductsRepositoryInterface $Products)
    {
        $this->middleware('permission:المنتجات', ['only' => ['index']]);
        $this->middleware('permission:اضافة منتج', ['only' => ['create','store']]);
        $this->middleware('permission:تعديل منتج', ['only' => ['edit','update']]);
        $this->middleware('permission:حذف منتج', ['only' => ['destroy']]);

        $this->Products = $Products;
    }

    public function index()
    {
        return $this->Products->index();
    }
    public function create()
    {
        return $this->Products->create();
    }

    public function store(Request $request)
    {
        return $this->Products->store($request);
    }
    public function destroy(Request $request)
    {
        return $this->Products->destroy($request);
    }
    public function update(Request $request)
    {
        return $this->Products->update($request);
    }
    public function edit(string $id)
    {
        return $this->Products->edit($id);
    }
}
