<?php 

namespace App\InterFaces\API;

use Illuminate\Database\Eloquent\Model;

interface AuthRepositoryInterface{

    public function register($request);

    public function login($request);

    public function logout();

}