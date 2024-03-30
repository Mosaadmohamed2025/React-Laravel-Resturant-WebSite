@extends('Dashboard.layouts.master')
@section('title')
    Sections
@stop

@section('page-header')
				<!-- breadcrumb -->
				<div class="breadcrumb-header justify-content-between">
					<div class="my-auto">
						<div class="d-flex">
							<h4 class="content-title mb-0 my-auto">Sections</h4><span class="text-muted mt-1 tx-13 mr-2 mb-0">/ View All</span>
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
                                        @can('اضافة قسم')
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add">
                                            Add Section
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
                                                <th class="wd-15p border-bottom-0">created_at</th>
                                                <th class="wd-20p border-bottom-0">Process</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                           @foreach($sections as $section)
                                               <tr>
                                                   <td>{{$loop->iteration}}</td>
                                                   <td>{{$section->section_name}}</td>
                                                   <td>{{ \Str::limit($section->description, 50) }}</td>
                                                   <td>{{ $section->created_at->diffForHumans() }}</td>
                                                   <td>
                                                    @can('تعديل قسم')
                                                       <a class="modal-effect btn btn-sm btn-info" data-effect="effect-scale"  data-toggle="modal" href="#edit{{$section->id}}"><i class="las la-pen"></i></a>
                                                    @endcan
                                                    @can('حذف قسم')
                                                       <a class="modal-effect btn btn-sm btn-danger" data-effect="effect-scale"  data-toggle="modal" href="#delete{{$section->id}}"><i class="las la-trash"></i></a>
                                                    @endcan
                                                    </td>
                                               </tr>

                                               @include('Dashboard.Admin.sections.edit')
                                               @include('Dashboard.Admin.sections.delete')

                                           @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div><!-- bd -->
                            </div><!-- bd -->
                        </div>
                        <!--/div-->

                    @include('Dashboard.Admin.sections.add')
                    <!-- /row -->

				</div>
				<!-- row closed -->

			<!-- Container closed -->

		<!-- main-content closed -->
@endsection
