<?php

namespace App\Repository\products;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\InterFaces\products\ProductsRepositoryInterface;
use App\Models\Product;
use App\Models\Section;
use App\Models\Image;


class ProductRepository implements ProductsRepositoryInterface{

            public function index()
            {
                $products = Product::all();
                return view('Dashboard.Admin.products.index' , compact('products'));
            }

            public function create()
            {
                $sections = Section::all();
                return view('Dashboard.Admin.products.add',compact('sections'));
            }
            
            public function store($request)
            {
            // التحقق من صحة البيانات المدخلة
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric',
                'description' => 'required|string',
                'section_id' => 'required|exists:sections,id',
                'images.*' => 'required|image|mimes:jpeg,png,jpg||max:2048', // السماح بصور JPEG و PNG بحجم أقصى 2MB لكل صورة
            ]);

            // إنشاء المنتج
            $product = Product::create([
                'Product_name' => $request->input('name'),
                'price' => $request->input('price'),
                'description' => $request->input('description'),
                'section_id' => $request->input('section_id'),
                'Created_by' => (Auth::user()->name),
            ]);

        
            // حفظ المنتج في قاعدة البيانات
            $product->save();

            // // تحميل الصور إذا تم تقديمها
            if($request->has('images')){
                foreach($request->file('images')as $key => $image){
                    if ($key >= 3) {
                        break; // توقف إذا تجاوز عدد الصور الأقصى المسموح به (3)
                    }
                    $imageName = $data['name'].'-image-'.time().rand(1,1000).'.'.$image->extension();
                    $image->move(public_path('product_images'),$imageName);
                    Image::create([
                        'product_id'=>$product->id,
                        'image'=>$imageName
                    ]);
                }
                }
                session()->flash('Add', 'The product has been added successfully');
                return redirect('/Products');
            }
            
        public function destroy($request)
        {
            if($request->page_id==1){

                $productId = $request->input('product_id');

                // التحقق مما إذا كان المنتج موجودًا
                $product = Product::find($productId);
            
                if (!$product) {
                    session()->flash('error', 'The product is not found');
                    return redirect('/Products');        
                }

                foreach ($product->images as $image) {

                    Storage::disk('local_images')->delete($image->image);
                    $image->delete();
                
                }

                $product->delete();

                session()->flash('delete', 'The product has been deleted');
                return redirect('/Products');     
            } else{

                $delete_select_id = explode(",", $request->delete_select_id);
                foreach ($delete_select_id as $ids_products){
                    $product = Product::findorfail($ids_products);
                    if($product->images){
                        foreach ($product->images as $image) {

                            Storage::disk('local_images')->delete($image->image);
                            $image->delete();
                        
                        }
                        $product->delete();
                    }
                }

                session()->flash('delete', 'The All products have been deleted');
                return redirect('/Products'); 
            }
        }

        public function edit($id)
        {
            $product = Product::findorfail($id);
            $sections = Section::all();
            return view('Dashboard.Admin.products.edit', compact('product', 'sections'));
        }

        public function update($request)
        {

            $data = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric',
                'description' => 'required|string',
                'section_id' => 'required|exists:sections,id',
                'images.*' => 'image|mimes:jpeg,png,jpg|max:2048', // السماح بصور JPEG و PNG بحجم أقصى 2MB لكل صورة
            ]);

            $product = Product::findorfail($request->id);
            $product->Product_name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->section_id = $request->section_id;

            $product->save();

            if($request->has('images')){
                foreach ($product->images as $image) {

                    Storage::disk('local_images')->delete($image->image);
                    $image->delete();
                
                }
                foreach($request->file('images')as $key => $image){
                    if ($key >= 3) {
                        break; // توقف إذا تجاوز عدد الصور الأقصى المسموح به (3)
                    }
                    $imageName = $data['name'].'-image-'.time().rand(1,1000).'.'.$image->extension();
                    $image->move(public_path('product_images'),$imageName);
                   
                    $Image = new Image();
                    $Image->product_id = $product->id;
                    $Image->image = $imageName;

                    $Image->save();
                }
                }
                session()->flash('edit', 'The product has been updated successfully');
                return redirect('/Products');
        }
}