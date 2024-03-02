import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import title from '../assets/images/title-img.png';
import axios from "axios";
import swal from 'sweetalert';
import mosaad from '../assets/images/mosaad.jpeg';
import ProfileImg from "../assets/images/profile.png";


const Profile = () => {

  const navigate = useNavigate();
  const [profileInput , setProfile ] = useState({
    name: localStorage.getItem("auth_name") || '', // افتراض قيمة فارغة إذا لم يتم العثور على القيمة في localStorage
    email: localStorage.getItem("email") || '', // افتراض قيمة فارغة إذا لم يتم العثور على القيمة في localStorage
    password: '',
    password_confirmation:'',
    error_list: [],
  });
  const [disabled, setDisabled] = useState(false);
  const [picture, setPicture] = useState([]);

  const handleInput = (e) => {
    e.persist();
        setProfile({ ...profileInput, [e.target.name]: e.target.value });
 }



  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      navigate("/home");
    }
  }, []);

  const profileSubmit = async (e) => {
    e.preventDefault();

    const data = {
        name:profileInput.name,
        email:profileInput.email,
        password:profileInput.password,
        password_confirmation:profileInput.password_confirmation,
    };
    // const formData = new FormData();
    // formData.append('image', picture.image);
    // formData.append('name', profileInput.name);
    // formData.append('email', profileInput.email);
    // formData.append('password', profileInput.password);
    // formData.append('password_confirmation', profileInput.password_confirmation);
 
    try {
        setDisabled(true);
        await axios.get('/sanctum/csrf-cookie');
        
        const response = await axios.post(`/api/profile`, data);

        if (response.data.status === 200) {
            const { username,email } = response.data;
            localStorage.setItem('auth_name', username);
            localStorage.setItem('email', email);
            swal('Success', "profile update sucessfully", 'success');
            navigate('/home');
        } else {
            setProfile({ ...profileInput, error_list: response.data.validation_errors });
            setDisabled(false);
        }
    } catch (error) {
        console.error('Error:', error);
        setDisabled(false);
    }
};
  return (
    <section>
        <section>
            <img className="mx-auto" src={title} />
            <h2 className="dark:text-[#ff9800] text-center text-4xl font-bold	"  >
            Profile
            </h2>
        </section>
        <div className=' w-full rounded-md gap-4'style={{backgroundColor:'#121413'}}>
            <div className='rounded' >
            <div className="p-2 rounded-2xl w-full " >
                          <div className="flex flex-col items-center text-center justify-center p-4 -mt-24">
                              <a href="#" className="relative block">
                                  <img alt="profile-pic" src={ProfileImg} style={{width:'280px'}} className="mx-auto object-cover rounded-full  border-2 border-white dark:border-gray-800"/>
                              </a>
                                <div className='mt-3'>
                                    <p class="font-semibold text-xl dark:text-gray-200"> Username: {localStorage.getItem("auth_name")} </p>
                                    <p class="text-gray-500 text-sm font-semibold  dark:text-[#9e9e9e]">Email: {localStorage.getItem("email")} </p>
                                </div>
                          </div>
                           <form  method="POST" encType="multipart/form-data">
                           <div className='p-3'>
                                <label for="name"  class="block text-sm font-medium leading-6 dark:text-[#777]  text-gray-900">Name</label>
                                <div class="mt-2">
                                <input type="text" onChange={handleInput} name="name" value={profileInput.name} required className=" dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"  />
                                <span style={{color: 'red'}}>{profileInput.error_list?.name}</span>
                                </div>
                            </div>
                           <div className='p-3'>
                                <label for="email"  class="block text-sm font-medium leading-6 dark:text-[#777]  text-gray-900">Email</label>
                                <div class="mt-2">
                                <input type="email" onChange={handleInput} name="email" value={profileInput.email} required className=" dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"  />
                                <span style={{color: 'red'}}>{profileInput.error_list?.email}</span>
                                </div>
                            </div>
                           <div className='p-3'>
                                <label for="password" class="block text-sm font-medium leading-6 dark:text-[#777]  text-gray-900">Password</label>
                                <div class="mt-2">
                                <input type="password"onChange={handleInput} name="password" value={profileInput.password} required className=" dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"  />
                                <span style={{color: 'red'}}>{profileInput.error_list?.password}</span>
                                </div>
                            </div>
                           <div className='p-3'>
                                <label for="password_confirmation" class="block text-sm font-medium leading-6 dark:text-[#777]  text-gray-900">New-Password</label>
                                <div class="mt-2">
                                <input type="password"onChange={handleInput} name="password_confirmation" value={profileInput.password_confirmation} required className=" dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"  />
                                </div>
                            </div>
                            <div  class="mt-2 dark:bg-[#680813] w-full cursor-pointer dark:text-gray-200 w-full justify-self-center text-center p-2 rounded"><button onClick={profileSubmit} disabled={disabled ?true: false }  type="submit">{disabled ? "proseesing" : "Save"}</button></div>
                           </form>
                      </div>
            </div>
        </div>
    </section>
  )
}

export default Profile