import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import {Navbar, AdminSidebar, } from '../components';
import { AdminRegister, AdminList, AdminEdit } from '../pages';
import '../App.css';
import { useStateContext } from '../contexts/ContextProvider';

const AdminDashboard = () => {


    const {activeMenu} = useStateContext();

    return (
    <div>
        <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
            {activeMenu ? (
                <div  className='w-64 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                    <AdminSidebar/>
                </div>
            ) : (
                <div className='w-0 dark:bg-secondary-dark-bg'>
                    <AdminSidebar/>
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
                    {/* test */}
                    <Route  path='/' element={(<AdminList/>)}/>
                    <Route  path='/register' element={(<AdminRegister/>)}/>
                    <Route  path='/edit/:id' element={(<AdminEdit/>)}/>
                </Routes>
            </div>
            </div>
        </div>
        </BrowserRouter>
    </div>
  )
}

export default AdminDashboard