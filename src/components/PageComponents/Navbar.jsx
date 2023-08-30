import React, { useEffect } from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {RiNotification3Line} from 'react-icons/ri';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import {UserProfile, Notification} from '..';
import { useStateContext } from '../../contexts/ContextProvider';
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useLoginContext } from '../../contexts/LoginContextProvider';


const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {logout, userName} = useLoginContext();

  const  {activeMenu, setActiveMenu, isClicked, handleClick, setScreenSize, screenSize} = useStateContext();

  useEffect(() => {
    
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
    
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      {!activeMenu && <NavButton title="Menu" customFunc={() => setActiveMenu((prev) => !prev)} color="blue" icon={<AiOutlineMenu/>}/>}
      

      <div className='flex w-full flex-row-reverse'>
        <NavButton title="Profil" customFunc={() => handleClick('userProfile')} color="#38bdf8" icon={<FaUserAlt/>}/>
        <NavButton title="Powiadomienia" customFunc={() => handleClick('notification')} color="#38bdf8" dotColor="#03C9D7" icon={<RiNotification3Line/>}/>
        <NavButton title="Wyloguj" customFunc={() => { logout() }} color="#38bdf8" icon={<AiOutlineLogout/>}/>
        <div className='flex items-center'>
        <h1>{userName}</h1>
        </div>
        {isClicked.userProfile && <UserProfile/>}
        {isClicked.notification && <Notification/>}

      </div>
    </div>
  )
}

export default Navbar