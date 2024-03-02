<?php

namespace App\Repository\API;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\InterFaces\API\AuthRepositoryInterface;


class AuthRepository implements AuthRepositoryInterface{
    
    public function register($request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8'
        ]);

        if($validator->fails())
        {
            return  response()->json([
                'validation_errors' =>$validator->messages(),
            ]);

        }else{

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return  response()->json([
                'status' =>200,
                'username' => $user->name,
                'token' => $token,
                'email' => $user->email,
                'message' => 'Registered Successfully',
            ]);
        }
    }

    public function login($request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email|max:191',
            'password' => 'required|min:8'
        ]);

        if($validator->fails())
        {
            return  response()->json([
                'validation_errors' =>$validator->messages(),
            ]);

        }else{
            $user = User::where('email',$request->email)->first();
            if(! $user || ! Hash::check($request->password,$user->password))
            {
                return  response()->json([
                    'status' =>401,
                    'message' => 'Invalid Credentials',
                ]);
            }else{
                $token = $user->createToken($user->email.'_Token')->plainTextToken;

                return  response()->json([
                    'status' =>200,
                    'username' => $user->name,
                    'email' => $user->email,
                    'token' => $token,
                    'message' => 'Logged In Successfully',
                ]);
            }
        }
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return  response()->json([
            'status' =>200,
            'message' => 'Logged out In Successfully',
        ]);
    }
}