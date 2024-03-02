@extends('Dashboard.layouts.master')
@section('title')
    Products
@stop
@section('css')
    <link href="{{URL::asset('dashboard/plugins/notify/css/notifIt.css')}}" rel="stylesheet"/>
@endsection


@section('page-header')
    <!-- breadcrumb -->
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <h4 class="content-title mb-0 my-auto">Products</h4>
                <span class="text-muted mt-1 tx-13 mr-2 mb-0">/
                    View All</span>
            </div>
        </div>
    </div>
    <!-- breadcrumb -->
@endsection
@section('content')

@if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

@if (session()->has('Add'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{{ session()->get('Add') }}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif

@if (session()->has('delete'))
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>{{ session()->get('delete') }}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif

@if (session()->has('edit'))
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>{{ session()->get('edit') }}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif
    <!-- row opened -->
    <div class="row row-sm">
        <!--div-->
        <div class="col-xl-12">
            <div class="card mg-b-20">
                <div class="card-header pb-0">

                    @can('اضافة منتج')
                    <a href="{{route('Products.create')}}" class="btn btn-primary" role="button"
                       aria-pressed="true">Add Product</a>
                    @endcan
                    @can('حذف منتج')
                    <button type="button" class="btn btn-danger" id="btn_delete_all">Delete Selected</button>
                    @endcan
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="example" class="table key-buttons text-md-nowrap">
                            <thead>
                                    <tr>
                                        <th>#</th>
                                        <th><input name="select_all"  id="example-select-all"  type="checkbox"/></th>
                                        <th>Product</th>
                                        <th>Section</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Created_at</th>
                                        <th>images</th>
                                        <th>Process</th>
                                    </tr>
                            </thead>
                            <tbody>
                            @foreach($products as $product)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>
                                        <input type="checkbox" name="delete_select" value="{{$product->id}}" class="delete_select">
                                    </td>
                                    <td>{{ $product->Product_name }}</td>
                                    <td>{{ $product->section->section_name}}</td>
                                    <td>{{ $product->description }}</td>
                                    <td>{{ $product->price}}</td>
                                    <td>{{ $product->created_at->diffForHumans() }}</td>
                                    <td>@foreach ($product->images as $key => $image)
                                        <img  src="/product_images/{{$image->image}}" style="border-radius: 50%" width="40px" height="40px"  />
                                        @endforeach
                                    </td>
                                    <td>
                                        <div class="dropdown">
                                            <button aria-expanded="false" aria-haspopup="true" class="btn ripple btn-outline-primary btn-sm" data-toggle="dropdown" type="button">Process<i class="fas fa-caret-down mr-1"></i></button>
                                            <div class="dropdown-menu tx-13">
                                                @can('تعديل منتج')
                                                <a class="dropdown-item" href="{{route('Products.edit',$product->id)}}"><i style="color: #0ba360" class="text-success ti-user"></i>&nbsp;&nbsp;Update</a>
                                                @endcan
                                                @can('حذف منتج')
                                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete{{$product->id}}"><i   class="text-danger  ti-trash"></i>&nbsp;&nbsp;Delete</a>
                                                @endcan
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                @include('Dashboard.Admin.products.delete_select')
                                @include('Dashboard.Admin.products.delete')
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--/div-->
    </div>
    <!-- /row -->
    </div>
    <!-- Container closed -->
    </div>
    <!-- main-content closed -->
@endsection
@section('js')
    <!--Internal  Notify js -->
    <script src="{{URL::asset('dashboard/plugins/notify/js/notifIt.js')}}"></script>
    <script src="{{URL::asset('/plugins/notify/js/notifit-custom.js')}}"></script>

    <script>
        $(function() {
            jQuery("[name=select_all]").click(function(source) {
                checkboxes = jQuery("[name=delete_select]");
                for(var i in checkboxes){
                    checkboxes[i].checked = source.target.checked;
                }
            });
        })
    </script>


    <script type="text/javascript">
        $(function () {
            $("#btn_delete_all").click(function () {
                var selected = [];
                $("#example input[name=delete_select]:checked").each(function () {
                    selected.push(this.value);
                });

                if (selected.length > 0) {
                    $('#delete_select').modal('show')
                    $('input[id="delete_select_id"]').val(selected);
                }
            });
        });
    </script>



@endsection
