import React, { useEffect } from 'react';
import { useStateContext } from '../context/Context';
import { Router, Link, NavLink } from 'react-router-dom';
import{MdFastfood , MdAddLocationAlt} from 'react-icons/md'
import{ImLocation} from 'react-icons/im'
import{FaShoppingCart , FaHistory} from 'react-icons/fa'
import{AiTwotoneHome , AiFillPhone} from 'react-icons/ai';
import{BsQuestionSquareFill} from 'react-icons/bs';
import NavLinks from './NavLinks';
import { FaCalendarAlt } from 'react-icons/fa'; // استيراد أيقونة التاريخ من مكتبة React Icons

const SideBar = () => {
  const { setScreenSize, screenSize ,activeMenu, setActiveMenu, setCurrentMode,currentMode  } = useStateContext();

  const activeNav = 'fixed 	pt-20	 bg-white border-t-gray-400	shadowaRound dark:border-t-gray-400		 z-40 shadow-md left-0 py-3 px-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto  w-72 dark:bg-[#121413]';
  const normalNav = ' fixed z-40 Navleft w-0 dark:bg-[#121413]';

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };



  return (
    <>
   {/* <div onClick={() => setActiveMenu(false)} style={{zIndex:'300000'}} className={activeMenu ?'h-screen fixed w-full right-0 block top-0 divNan':'hidden'}>   </div>  */}
    <nav   className={ activeMenu ? activeNav : normalNav}>
     
    <div className='text-center items-center' >
      
      <div className='pb-3'>
        <NavLinks link='/home'  icon={<AiTwotoneHome className='text-[#212245] dark:text-[#ff9800] ' />} title='Home'/>
        <NavLinks link='/foods' title='Meals' icon={<MdFastfood className='text-[#212245] dark:text-[#ff9800]' />}/>
        <NavLinks link='/cart' title='Cart' icon={<FaShoppingCart className='text-[#212245] dark:text-[#ff9800]' />}/>
        <NavLinks link='/orders' title='My Orders' icon={< FaCalendarAlt className='text-[#212245] dark:text-[#ff9800]' />}/>
        <NavLinks link='/locations' title='Restaurant locations' icon={<ImLocation className='text-[#212245] dark:text-[#ff9800]' />}/>
        <NavLinks link='/questions' title='Questions' icon={< BsQuestionSquareFill className='text-[#212245] dark:text-[#ff9800]' />}/>
        <NavLinks link='/contact' title='Contact Us' icon={<AiFillPhone className='text-[#212245] dark:text-[#ff9800]' />}/>
      </div>

    </div>
   
    </nav>
    </>
  );
};

export default SideBar;
