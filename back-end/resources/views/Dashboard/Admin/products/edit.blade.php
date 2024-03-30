@extends('Dashboard.layouts.master')

@section('title')
    Update Product
@stop
@section('page-header')
    <!-- breadcrumb -->
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <h4 class="content-title mb-0 my-auto">Products</h4><span
                    class="text-muted mt-1 tx-13 mr-2 mb-0">/
               Update Product</span>
            </div>
        </div>
    </div>
    <!-- breadcrumb -->
@endsection
@section('content')


    <!-- row -->
    <div class="row">
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-body">
                    <form action="{{ route('Products.update', 'test') }}" method="post" autocomplete="off"
                    enctype="multipart/form-data">
                            {{ method_field('patch') }}
                                 {{ csrf_field() }}
                        <div class="pd-30 pd-sm-40 bg-gray-200">

                            <div class="row row-xs align-items-center mg-b-20">
                                <div class="col-md-1">
                                    <label for="exampleInputEmail1">
                                        name
                                    </label>
                                </div>
                                <div class="col-md-11 mg-t-5 mg-md-t-0">
                                    <input class="form-control" name="name" value="{{ $product->Product_name}}" type="text" autofocus>
                                    <input class="form-control" value="{{$product->id}}" name="id" type="hidden">
                                </div>
                            </div>
                            <div class="row row-xs align-items-center mg-b-20">
                                <div class="col-md-1">
                                    <label for="exampleInputEmail1">
                                        description
                                    </label>
                                </div>
                                <div class="col-md-11 mg-t-5 mg-md-t-0">
                                    <input class="form-control" name="description"  value="{{ $product->description }}" type="text" autofocus>
                                </div>
                            </div>
                            <div class="row row-xs align-items-center mg-b-20">
                                <div class="col-md-1">
                                    <label for="exampleInputEmail1">
                                        price
                                    </label>
                                </div>
                                <div class="col-md-11 mg-t-5 mg-md-t-0">
                                    <input class="form-control" name="price"  value="{{ $product->price }}" type="number" autofocus>
                                </div>
                            </div>
                            <div class="row row-xs align-items-center mg-b-20">
                                <div class="col-md-1">
                                    <label for="exampleInputEmail1">
                                    section
                                    </label>
                                </div>

                                <div class="col-md-11 mg-t-5 mg-md-t-0">
                                    <select name="section_id" class="form-control SlectBox">
                                        @foreach($sections as $section)
                                            <option
                                                value="{{$section->id}}" {{$section->id == $product->section_id ? 'selected':"" }}>{{$section->section_name}}</option>
                                        @endforeach
                                    </select>
                                </div>

                            </div>

                            <div class="row row-xs align-items-center mg-b-20">
                                <div class="col-md-1">
                                    <label for="exampleInputEmail1">
                                    Upload
                                    </label>
                                </div>
                                <div class="col-md-11 mg-t-5 mg-md-t-0">
                                    <input type="file" multiple accept="image/*" name="images[]" onchange="loadFiles(event)">
                                    <div id="output">
                                        @foreach ($product->images as $key => $image)
                                        <img  src="/product_images/{{$image->image}}" style="border-radius: 50%" width="150px" height="150px"  />
                                        @endforeach
                                    </div>
                                </div>
                            </div>

                            <button type="submit"
                                    class="btn btn-main-primary pd-x-30 mg-r-5 mg-t-5">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- /row -->
    </div>
    <!-- Container closed -->
    </div>
    <!-- main-content closed -->
@endsection
@section('js')

<script>
    var loadFiles = function(event) {
        var output = document.getElementById('output');
        output.innerHTML = ''; // مسح الصور السابقة إذا وجدت

        var files = event.target.files;
        for (var i = 0; i < files.length; i++) {
            var img = document.createElement('img');
            img.style.borderRadius = '50%';
            img.style.width = '150px';
            img.style.height = '150px';

            var reader = new FileReader();
            reader.onload = function(e) {
                var imgElement = document.createElement('img');
                imgElement.style.borderRadius = '50%';
                imgElement.style.width = '150px';
                imgElement.style.height = '150px';
                imgElement.src = e.target.result;

                output.appendChild(imgElement);
            };

            reader.readAsDataURL(files[i]);
        }
    };
</script>


@endsection
