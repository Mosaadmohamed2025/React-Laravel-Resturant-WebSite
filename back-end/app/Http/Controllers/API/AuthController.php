<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\InterFaces\API\AuthRepositoryInterface;


class AuthController extends Controller
{
    private $Auth;

    public function __construct(AuthRepositoryInterface $Auth)
    {
        $this->Auth = $Auth;
    }
    public function register(Request $request){
        return $this->Auth->register($request);
    }
    public function login(Request $request){
        return $this->Auth->login($request);
    }
    public function logout(){
        return $this->Auth->logout();
    }
}
