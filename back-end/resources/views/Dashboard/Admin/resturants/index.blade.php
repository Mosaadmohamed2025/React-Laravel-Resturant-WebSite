@extends('Dashboard.layouts.master')
@section('title')
    Resturants
@stop

@section('page-header')
				<!-- breadcrumb -->
				<div class="breadcrumb-header justify-content-between">
					<div class="my-auto">
						<div class="d-flex">
							<h4 class="content-title mb-0 my-auto">Branches</h4><span class="text-muted mt-1 tx-13 mr-2 mb-0">/ Resturants</span>
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
				<!-- row -->
                    <!-- row opened -->
                    <div class="row row-sm">
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-header pb-0">
                                    <div class="d-flex justify-content-between">
                                        @can('اضافة مطعم')
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add">
                                            Add Resturant
                                        </button>
                                        @endcan
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table mg-b-0 text-md-nowrap" id="example2" data-page-length='50'style="text-align: center">
                                            <thead>
                                            <tr>
                                                <th class="wd-15p border-bottom-0">#</th>
                                                <th class="wd-15p border-bottom-0">name</th>
                                                <th class="wd-15p border-bottom-0">description</th>
                                                <th class="wd-15p border-bottom-0">location</th>
                                                <th class="wd-20p border-bottom-0">Process</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                           @foreach($resturants as $resturant)
                                               <tr>
                                                   <td>{{$loop->iteration}}</td>
                                                   <td>{{$resturant->resturant_name}}</td>
                                                   <td>{{ \Str::limit($resturant->description, 50) }}</td>
                                                   <td>
                                                    @foreach ($resturant->locations as $key => $location)
                                                    @if($key >= 1)
                                                    {
                                                        @break;
                                                    }@endif
                                                    {{$location->address}}
                                                    @endforeach
                                                   </td>
                                                   <td>
                                                    @can('تعديل مطعم')
                                                    <a class="modal-effect btn btn-sm btn-info" data-effect="effect-scale"  data-toggle="modal" href="#edit{{$resturant->id}}"><i class="las la-pen"></i></a>
                                                    @endcan
                                                    @can('حذف مطعم')
                                                    <a class="modal-effect btn btn-sm btn-danger" data-effect="effect-scale"  data-toggle="modal" href="#delete{{$resturant->id}}"><i class="las la-trash"></i></a>
                                                    @endcan
                                                   </td>
                                               </tr>

                                               @include('Dashboard.Admin.resturants.edit')
                                               @include('Dashboard.Admin.resturants.delete')

                                           @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div><!-- bd -->
                            </div><!-- bd -->
                        </div>
                        <!--/div-->

                    @include('Dashboard.Admin.resturants.add')
                    <!-- /row -->

				</div>
				<!-- row closed -->

			<!-- Container closed -->

		<!-- main-content closed -->
@endsection
