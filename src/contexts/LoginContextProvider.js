import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { apiUrl } from '../data/dummy';

const LoginContext = createContext();


export const LoginContextProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const [userID, setUserID] = useState();
  const [userRole, setUserRole] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    const token = Cookies.get('token');
    if(token)
    {
      const decodedToken = jwt_decode(token);
      setLoginState(true);
      setUserID(decodedToken.id);
      setUserRole(decodedToken.role);
      setUserName(decodedToken.fullName);
    }
  }, [])
  
  const login = async (email, password) => {
    try {
    const response = await axios.post(`${apiUrl}/auth/signin`, { email, password },{ withCredentials: true });
    
    if(response.status === 201)
    {
      const decodedToken = jwt_decode(response.data.token);
      const now = new Date();
      const timeToExpire = 60 * 60 * 1000;
      const expires = new Date(now.getTime() + timeToExpire);
      setTimeout(() => {
        logout();
      }, timeToExpire);

      document.cookie = `token=${response.data.token}; path=/; expires=${expires.toUTCString()}`;
      setUserName(decodedToken.fullName);
      setUserID(decodedToken.id);
      setUserRole(decodedToken.role);
      setLoginState(true);
      
    }
    }catch(err)
    {
      return err.response.data;
    }    
  };

  const logout = async () => {
    await axios.get(`${apiUrl}/auth/logout ` ,{ withCredentials: true });
    Cookies.remove('token');
    setUserID('');
    setUserRole('');
    setUserName('');
    setLoginState(false);
  };

  return (
    <LoginContext.Provider value={{ loginState, login, logout, userID, userRole, userName}}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);