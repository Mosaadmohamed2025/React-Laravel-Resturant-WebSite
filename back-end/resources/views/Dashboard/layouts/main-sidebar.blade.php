<!-- main-sidebar -->
<div class="app-sidebar__overlay" data-toggle="sidebar"></div>
<aside class="app-sidebar sidebar-scroll">
    <div class="main-sidebar-header active">
        <a class="desktop-logo logo-light active" href="{{ url('/' . $page='index') }}"><img src="{{URL::asset('Dashboard/img/brand/logo.png')}}" class="main-logo" alt="logo"></a>
        <a class="desktop-logo logo-dark active" href="{{ url('/' . $page='index') }}"><img src="{{URL::asset('Dashboard/img/brand/logo-white.png')}}" class="main-logo dark-theme" alt="logo"></a>
        <a class="logo-icon mobile-logo icon-light active" href="{{ url('/' . $page='index') }}"><img src="{{URL::asset('Dashboard/img/brand/favicon.png')}}" class="logo-icon" alt="logo"></a>
        <a class="logo-icon mobile-logo icon-dark active" href="{{ url('/' . $page='index') }}"><img src="{{URL::asset('Dashboard/img/brand/favicon-white.png')}}" class="logo-icon dark-theme" alt="logo"></a>
    </div>
    <div class="main-sidemenu">
        <div class="app-sidebar__user clearfix">
            <div class="dropdown user-pro-body">
                <div class="">
                    <img alt="user-img" class="avatar avatar-xl brround" src="{{URL::asset('Dashboard/img/faces/6.jpg')}}"><span class="avatar-status profile-status bg-green"></span>
                </div>
                <div class="user-info">
                    <h4 class="font-weight-semibold mt-3 mb-0">{{ Auth::user()->name }}</h4>
                    <span class="mb-0 text-muted">{{ Auth::user()->email }}</span>
                </div>
            </div>
        </div>
        <ul class="side-menu">
            <li class="slide">
                <a class="side-menu__item" href="{{ url('/' . ($page = 'dashboard/admin')) }}"><svg xmlns="http://www.w3.org/2000/svg" class="side-menu__icon" viewBox="0 0 24 24" ><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 5h4v6H5zm10 8h4v6h-4zM5 17h4v2H5zM15 5h4v2h-4z" opacity=".3"/><path d="M3 13h8V3H3v10zm2-8h4v6H5V5zm8 16h8V11h-8v10zm2-8h4v6h-4v-6zM13 3v6h8V3h-8zm6 4h-4V5h4v2zM3 21h8v-6H3v6zm2-4h4v2H5v-2z"/></svg><span class="side-menu__label">Main</span></a>
            </li>
            
            @can('الاقسام')
            <li class="slide">
                <a class="side-menu__item" data-toggle="slide" href="{{ url('/' . $page='#') }}"><span class="side-menu__label">Sections</span><i class="angle fe fe-chevron-down"></i></a>
                <ul class="slide-menu">
                    <li><a class="slide-item" href="{{ route('Sections.index') }}">View All</a></li>
                </ul>
            </li>
            @endcan
            @can('المنتجات')
            <li class="slide">
                <a class="side-menu__item" data-toggle="slide" href="{{ url('/' . $page='#') }}"><span class="side-menu__label">Products</span><i class="angle fe fe-chevron-down"></i></a>
                <ul class="slide-menu">
                    <li><a class="slide-item" href="{{ route('Products.index')}}">View All</a></li>
                </ul>
            </li>
            @endcan
            @can('الطلبات')
            <li class="slide">
                <a class="side-menu__item" data-toggle="slide" href="{{ url('/' . $page='#') }}"><span class="side-menu__label">Orders</span><i class="angle fe fe-chevron-down"></i></a>
                <ul class="slide-menu">
                    <li><a class="slide-item" href="{{ route('Orders.index')}}">View All</a></li>
                    @can('الطلبات المدفوعة')
                    <li><a class="slide-item" href="{{ route('Paid_Order')}}">Paid Orders</a></li>
                    @endcan
                    @can('الطلبات الغير مدفوعة')
                    <li><a class="slide-item" href="{{ route('UnPaid_Order')}}">UnPaid Order</a></li>
                    @endcan
                </ul>
            </li>
            @endcan
            @can('المستخدمين')
            <li class="slide">
                <a class="side-menu__item" data-toggle="slide" href="{{ url('/' . $page='#') }}"><span class="side-menu__label">Users</span><i class="angle fe fe-chevron-down"></i></a>
                <ul class="slide-menu">
                    @can('قائمة المستخدمين')
                    <li><a class="slide-item" href="{{ url('/' . ($page = 'users')) }}">Users</a></li>
                    @endcan
                    @can('صلاحيات المستخدمين')
                    <li><a class="slide-item" href="{{ url('/' . ($page = 'roles')) }}">Users Permissions</a></li>
                    @endcan
                </ul>
            </li>
            @endcan
           
            @can('الفروع')
            <li class="slide">
                <a class="side-menu__item" data-toggle="slide" href="{{ url('/' . $page='#') }}"><span class="side-menu__label">Branches</span><i class="angle fe fe-chevron-down"></i></a>
                <ul class="slide-menu">
                    @can('المطاعم')
                    <li><a class="slide-item" href="{{ route('Resturants.index')}}">Resturants</a></li>
                    @endcan
                    @can('الموظفين')
                    <li><a class="slide-item" href="{{ route('Employees.index')}}">Employees</a></li>
                    @endcan
                </ul>
            </li>
            @endcan
        </ul>
    </div>
</aside>
<!-- main-sidebar -->
