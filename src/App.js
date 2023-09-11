import React, { useEffect } from 'react';


import { Login } from './pages';
import './App.css';
import { useLoginContext } from './contexts/LoginContextProvider';
import { UserDashboard, AdminDashboard, DriverDashboard, MechanicDashboard } from './content';

const App = () => {
  const {loginState, userRole} = useLoginContext();

  useEffect(() => {
    console.log(userRole);
  }, [userRole])
  
  if(loginState){
    if(userRole==='ADMIN') return(<AdminDashboard/>);
    if(userRole==='USER') return(<UserDashboard/>);
    if(userRole==='DRIVER') return(<DriverDashboard/>);
    if(userRole==='MECHANIC') return(<MechanicDashboard/>);
  }
  return (<Login/>);
}

export default App