import React, {} from 'react';


import { Login } from './pages';
import './App.css';
import { useLoginContext } from './contexts/LoginContextProvider';
import { UserDashboard, AdminDashboard, DriverDashboard } from './content';

const App = () => {
  const {loginState, userRole} = useLoginContext();
  if(loginState){
    if(userRole==='ADMIN') return(<AdminDashboard/>);
    if(userRole==='USER') return(<UserDashboard/>);
    if(userRole==='DRIVER') return(<DriverDashboard/>);
  }
  return (<Login/>);
}

export default App