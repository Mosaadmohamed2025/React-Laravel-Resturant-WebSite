import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import title1 from '../assets/images/title-img.png';
import axios from "axios";
import swal from 'sweetalert';


const Register = () => {

  const navigate = useNavigate();
  const [registerInput , setRegister ] = useState({
    name: '',
    email:'',
    password: '',
    error_list: [],
  });

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      navigate("/home");
    }
  }, []);
 

  const handleInput = (e) => {
    e.persist();
    setRegister({...registerInput, [e.target.name]: e.target.value });
  }


  const registerSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
  }
    
    try {
        await axios.get('/sanctum/csrf-cookie');
        
        const response = await axios.post(`/api/register`, data);
        
        if (response.data.status === 200) {
            const { token, username, message,email } = response.data;
            localStorage.setItem('auth_token', token);
            localStorage.setItem('auth_name', username);
            localStorage.setItem('email', email);
            swal('Success', message, 'success');
            navigate('/home');
        } else {
            setRegister({ ...registerInput, error_list: response.data.validation_errors });
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

 

  return(
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto" src={title1} />
      <h2 class="mt-2  w-full dark:text-[#ff9800] text-center text-4xl font-bold leading-9 tracking-tight ">Sign Up</h2>
    </div>
  
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" onSubmit={registerSubmit} method="POST">
              <div>
                <label for="name" class="block text-sm font-medium leading-6 dark:text-[#777]  text-gray-900">Name</label>
                <div class="mt-2">
                <input type="text" name="name" onChange={handleInput} value={registerInput.name} required className=" dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"  />
                <span style={{color: 'red'}}>{registerInput.error_list?.name}</span>
                </div>
              </div>
              <div>
                <label for="email" class="block text-sm font-medium leading-6 dark:text-[#777]  text-gray-900">Email</label>
                <div class="mt-2">
                  <input 
                  onChange={handleInput} value={registerInput.email}
                  id="email" name="email" type="text" required class=" dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2" />
                   <span style={{color: 'red'}}>{registerInput.error_list?.email}</span>
                </div>
              </div>
        
              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium leading-6 dark:text-[#777] text-gray-900">Password</label>
                </div>
                <div class="mt-2">
                  <input
                  onChange={handleInput} value={registerInput.password}
                  id="password" name="password" type="password" autocomplete="current-password" required className=" dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"/>
                    <span style={{color: 'red'}}>{registerInput.error_list?.password}</span>
                </div>
              </div> 
       <button type="submit" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#df2020] dark:bg-[#680813]">
          Sign Up
        </button>
      </form>

  
      <Link to="/login" class="mt-10 block font-semibold leading-6 text-[#df2020] dark:text-[#777]">Already have an account? Login</Link>

    </div>
  </div>
  );
};

export default Register;
