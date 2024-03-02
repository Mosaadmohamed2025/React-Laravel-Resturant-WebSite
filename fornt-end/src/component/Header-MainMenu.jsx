import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../context/Context';
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import { cartActions } from '../store/shopping-cart/cartSlice';
import { useSelector, useDispatch } from "react-redux";
import mosaad from '../assets/images/mosaad.jpeg'
import {AiOutlineUser} from 'react-icons/ai';
import ProfileImg from "../assets/images/profile.png";


const UserProfile = () => {
  const { setProfile, profile} = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveAll = () => {
      dispatch(cartActions.removeAll());
    };
  const logoutSubmit = (e) => {
    e.preventDefault();
    
    axios.post(`/api/logout`)
    .then(res => {
        if (res.data.status === 200) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            localStorage.removeItem("email");
            swal("Success", res.data.message, "success");
            handleRemoveAll();
            navigate('/');
            setProfile(false)
        } else {
            swal("Error", res.data.message, "error");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        swal("Error", "An error occurred while logging out.", "error");
    });
}
  
  return (
    <div class='container '>
    <div >
    <div className="fixed 	pt-20	 bg-white border-t-gray-400	shadowaRound dark:border-t-gray-400		 z-40 shadow-md right-0 py-3 px-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto  w-72 dark:bg-[#121413]">
      <div class="flex justify-between items-center mt-5  dark:text-[#9e9e9e]">
        <p class="font-semibold text-xl dark:text-gray-200"> Main Menu</p>
        <MdOutlineCancel onClick={()=>setProfile(false)} className='font-semibold cursor-pointer text-2xl dark:text-gray-200   hover:drop-shadow-xl hover:bg-light-gray'/>
      </div>
      <div class="mt-5 border-color border-b-1 pb-6">
         <div className='text-center'>
          <img className='rounded-full' style={{width:'100%',margin:'auto'}} src={ProfileImg} />
          </div>
        <div className='mt-3'>
          <p class="font-semibold text-xl dark:text-gray-200"> Username: {localStorage.getItem("auth_name")} </p>
          <p class="text-gray-500 text-sm font-semibold  dark:text-[#9e9e9e]">Email: {localStorage.getItem("email")} </p>
        </div>
      </div>
      <Link to='/profile' class="items-center mt-5 flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
          <button  style={{backgroundColor:'rgba(147, 147, 147, 0.13)'}} className=" text-xl rounded-lg p-3 hover:bg-light-gray">
          <AiOutlineUser style={{color:'rgb(3, 201, 215)'}}/>
          </button>
          <div>
          <p class="font-semibold dark:text-gray-200 ">My Profile</p>
          <p class="text-gray-500 text-sm dark:text-gray-400"> Account Settings </p>
          </div>
      </Link>
      <div class="mt-2 dark:bg-[#680813] w-full dark:text-gray-200 w-full justify-self-center text-center p-2 rounded">
        <button type='button' onClick={logoutSubmit}  >Logout</button>
        </div>
    </div>
    </div>
    </div>



  );
};

export default UserProfile;
