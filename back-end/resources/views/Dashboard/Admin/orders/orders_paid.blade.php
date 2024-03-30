@extends('Dashboard.layouts.master')
@section('title')
Paid Orders
@stop


@section('page-header')
    <!-- breadcrumb -->
    <div class="breadcrumb-header justify-content-between">
        <div class="my-auto">
            <div class="d-flex">
                <h4 class="content-title mb-0 my-auto">Orders</h4><span class="text-muted mt-1 tx-13 mr-2 mb-0">/
                    Paid Orders</span>
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


                    <button type="button" class="btn btn-danger" id="btn_delete_all">Delete Selected</button>


                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="example" class="table key-buttons text-md-nowrap">
                            <thead>
                                <tr>
                                    <th class="border-bottom-0">#</th>
                                    <th><input name="select_all"  id="example-select-all"  type="checkbox"/></th>
                                    <th class="border-bottom-0">Placed On</th>
                                    <th class="border-bottom-0">first name</th>
                                    <th class="border-bottom-0">last name</th>
                                    <th class="border-bottom-0">email</th>
                                    <th class="border-bottom-0">address</th>
                                    <th class="border-bottom-0">city</th>
                                    <th class="border-bottom-0">payment </th>
                                    <th class="border-bottom-0">status</th>
                                    <th class="border-bottom-0">total</th>
                                    <th class="border-bottom-0">process</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($orders as $order)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>
                                        <input type="checkbox" name="delete_select" value="{{$order->id}}" class="delete_select">
                                    </td>
                                    <td>{{ $order->created_at->diffForHumans() }} </td>
                                    <td>{{ $order->firstname }}</td>
                                    <td>{{ $order->lastname }}</td>
                                    <td>{{ $order->email }}</td>
                                    <td>{{ $order->address }}</td>
                                    <td>{{ $order->city }}</td>
                                    <td>
                                        @if ($order->payment_mode == "COD")
                                        <span>Cash</span>
                                        @else
                                        <span>Visa</span>
                                        @endif
                                    </td>
                                    <td>
                                        @if ($order->status == 1)
                                            <span class="text-success">Paid</span>
                                        @elseif($order->status == 0)
                                            <span class="text-danger"> UnPaid</span>
                                        @endif
                                    </td>
                                    <td>{{ $order->total }}</td>
                                    <td>

                                        <div class="dropdown">
                                            <button aria-expanded="false" aria-haspopup="true" class="btn ripple btn-outline-primary btn-sm" data-toggle="dropdown" type="button">Process<i class="fas fa-caret-down mr-1"></i></button>
                                            <div class="dropdown-menu tx-13">
                                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#update_status{{$order->id}}"><i   class="text-warning ti-back-right"></i>&nbsp;&nbsp;Update Status</a>
                                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#delete{{$order->id}}"><i   class="text-danger  ti-trash"></i>&nbsp;&nbsp;Delete</a>
                                            </div>
                                        </div>

                                    </td>
                                </tr>
                                @include('Dashboard.Admin.orders.delete')
                                @include('Dashboard.Admin.orders.delete_select')
                                @include('Dashboard.Admin.orders.update_status')
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
