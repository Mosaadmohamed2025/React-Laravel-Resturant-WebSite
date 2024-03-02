import React, { useEffect, useRef } from 'react'
import logo2 from "../assets/images/logo-2.png";
import ProfileImg from "../assets/images/profile.png";
import {  Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {AiOutlineShoppingCart , AiOutlineUser} from 'react-icons/ai';
import{AiOutlineMenu} from 'react-icons/ai'
import {useStateContext } from '../context/Context';
import  {cartUiActions}  from "../store/shopping-cart/cartUiSlice";
import axios from "axios";
import swal from 'sweetalert';
import { cartActions } from '../store/shopping-cart/cartSlice';
import mosaad from '../assets/images/mosaad.jpeg'


const Header = () => {
  const { user , profile, screenSize ,activeMenu,setProfile , setActiveMenu, setCurrentMode,currentMode  } = useStateContext();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveAll = () => {
      dispatch(cartActions.removeAll());
    };
    
  const toggleCart = () =>{
    dispatch(cartUiActions.toggle());
    setActiveMenu(false);
    setProfile(false);
  }

  const logoutSubmit = (e) => {
      e.preventDefault();
      
      axios.post(`/api/logout`)
      .then(res => {
          if (res.data.status === 200) {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('auth_name');
              swal("Success", res.data.message, "success");
              handleRemoveAll();
              navigate('/');
          } else {
              swal("Error", res.data.message, "error");
          }
      })
      .catch(error => {
          console.error('Error:', error);
          swal("Error", "An error occurred while logging out.", "error");
      });
  }
  

    var AuthButtons = '';
    if(!localStorage.getItem('auth_token'))
    {
        AuthButtons = (
          <Link to='/login' className='text-xl rounded-full p-3 hover:bg-[#f5f5f5]  dark:hover:bg-[#ffffff1a]'>
            <AiOutlineUser className='text-2xl cursor-pointer font-bold dark:text-[#ffffff91] text-[#212245]' />
          </Link>
        );
    }
    else
    {
        AuthButtons = (
            <div onClick={()=>{
              setProfile(!profile);
              setActiveMenu(false);
            }} className='flex cursor-pointer flex-col gap-1'>
              <img src={ProfileImg}  class="w-10 rounded-full h-10" />
            </div>
        );
    }


  return (
    
    <header style={{zIndex:'9000' }} className='w-full h-20 navbar fixed bg-white shadow-md dark:bg-[#0a0a0a] border-[#e9e9e9] dark:border-[#323232]' >
      <div className='  flex justify-between container mx-auto h-full items-center'>
      <div className="flex gap-1  items-center justify-center ">
            <div onClick={() =>{
              setActiveMenu(!activeMenu);
              setProfile(false);
            } } className='text-xl rounded-full menu p-3 hover:bg-[#f5f5f5] dark:hover:bg-[#ffffff1a]'> 
            <AiOutlineMenu className='text-2xl cursor-pointer dark:text-[#ffffff91] font-bold text-[#212245]' />
            </div>
            <Link className='hidden sm:block' to='/home'>
            <img src={logo2} alt="logo" className='w-14 h-14' />
            </Link>
          </div>
          <div className='flex items-center justify-center gap-1 '> 
           
            <div onClick={toggleCart} className='text-xl rounded-full p-3 hover:bg-[#f5f5f5]  dark:hover:bg-[#ffffff1a] relative'> 
                  <AiOutlineShoppingCart className='cursor-pointer text-2xl dark:text-[#ffffff91] font-bold text-[#212245]' />
                  <span className="cart__badge">{totalQuantity}</span>
            </div>
            {AuthButtons}
          </div>
      </div>
    </header>
    )
}

export default Header