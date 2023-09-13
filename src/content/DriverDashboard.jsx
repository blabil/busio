import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {Navbar, DriverSidebar} from '../components';
import { DriverRoute, DriverRouteInfo, DriverWelcome } from '../pages';
import '../App.css';
import { useStateContext } from '../contexts/ContextProvider';

const DriverDashboard = () => {

    const {activeMenu} = useStateContext();
  
    return (
    <div>
        <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
            {activeMenu ? (
                <div  className='w-64 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                    <DriverSidebar/>
                </div>
            ) : (
                <div className='w-0 dark:bg-secondary-dark-bg'>
                    <DriverSidebar/>
                </div>
            )}

            <div className={
                `dark:bg-main-bg bg-main-bg min-h-screen w-full 
                ${activeMenu ? 'md:ml-64' :
                'flex-2'}`
            }>
                <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                    <Navbar/>
                </div>
            

            <div>
                <Routes>
                    <Route  path='/' element={<DriverWelcome/>}/>

                    <Route  path='/driver/route' element={<DriverRoute/>}/>
                    <Route  path='/driver/route/:id' element={<DriverRouteInfo/>}/>
                </Routes>
            </div>
            </div>
        </div>
        </BrowserRouter>
    </div>
  )
}

export default DriverDashboard