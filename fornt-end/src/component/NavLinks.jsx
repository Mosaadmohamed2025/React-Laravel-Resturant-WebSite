import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useStateContext } from '../context/Context';

function NavLinks(props) {


  const { setScreenSize, screenSize ,activeMenu, setActiveMenu, setCurrentMode,currentMode  } = useStateContext();

    const handleCloseSideBar = () => {
      if (activeMenu == true) {
        setActiveMenu(false);
      }
    };

    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);
  
      window.addEventListener('resize', handleResize);
  
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const activeLink = 'flex items-center dark:bg-[#680813]  bg-[#df2020] gap-5 pl-4 pr-4 pt-3 pb-4 rounded-lg  text-white  text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pr-4 pt-3 pb-4 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:bg-black  hover:bg-[#f5f5f5] m-2';
  return (
    <NavLink
    onClick={handleCloseSideBar}
    to={props.link}
    className={({ isActive }) => (isActive ? activeLink : normalLink)}
  >
    <span className='text-4xl	'>
    {props.icon}
      </span>
    <span className="text-md">{props.title}</span>
</NavLink>
  )
}

export default NavLinks