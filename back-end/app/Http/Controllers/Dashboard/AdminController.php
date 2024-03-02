<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Spatie\Permission\Models\Role;
use DB;
use Hash;
class AdminController extends Controller
{

    function __construct()
{

$this->middleware('permission:المستخدمين', ['only' => ['index']]);
$this->middleware('permission:قائمة المستخدمين', ['only' => ['create','store']]);
$this->middleware('permission:صلاحيات المستخدمين', ['only' => ['edit','update']]);

}
    
public function index(Request $request)
{
$data = Admin::orderBy('id','DESC')->paginate(5);
return view('Dashboard.Admin.users.show_users',compact('data'))
->with('i', ($request->input('page', 1) - 1) * 5);
}
/**
* Show the form for creating a new resource.
*
* @return \Illuminate\Http\Response
*/
public function create()
{
$roles = Role::pluck('name','name')->all();
return view('Dashboard.Admin.users.Add_user',compact('roles'));
}
/**
* Store a newly created resource in storage.
*
* @param  \Illuminate\Http\Request  $request
* @return \Illuminate\Http\Response
*/
public function store(Request $request)
{
$this->validate($request, [
'name' => 'required',
'email' => 'required|email|unique:admins,email',
'password' => 'required|same:confirm-password',
'roles_name' => 'required'
]);
$input = $request->all();
$input['password'] = Hash::make($input['password']);
$user = Admin::create($input);
$user->assignRole($request->input('roles_name'));
return redirect()->route('users.index')
->with('success','User created successfully');
}
/**
* Display the specified resource.
*
* @param  int  $id
* @return \Illuminate\Http\Response
*/
public function show($id)
{
$user = Admin::find($id);
return view('users.show',compact('user'));
}
/**
* Show the form for editing the specified resource.
*
* @param  int  $id
* @return \Illuminate\Http\Response
*/
public function edit($id)
{
$user = Admin::find($id);
$roles = Role::pluck('name','name')->all();
$userRole = $user->roles->pluck('name','name')->all();
return view('Dashboard.Admin.users.edit',compact('user','roles','userRole'));
}
/**
* Update the specified resource in storage.
*
* @param  \Illuminate\Http\Request  $request
* @param  int  $id
* @return \Illuminate\Http\Response
*/
public function update(Request $request, $id)
{
$this->validate($request, [
'name' => 'required',
'email' => 'required|email|unique:admins,email,'.$id,
'password' => 'same:confirm-password',
'roles' => 'required'
]);
$input = $request->all();
if(!empty($input['password'])){
$input['password'] = Hash::make($input['password']);
}else{
$input = array_except($input,array('password'));
}
$user = Admin::find($id);
$user->update($input);
DB::table('model_has_roles')->where('model_id',$id)->delete();
$user->assignRole($request->input('roles'));
return redirect()->route('users.index')
->with('success','User Update Successfully');
}
/**
* Remove the specified resource from storage.
*
* @param  int  $id
* @return \Illuminate\Http\Response
*/
public function destroy(Request $request)
{
Admin::find($request->user_id)->delete();
return redirect()->route('users.index')
->with('success','User deleted successfully');
}
}
