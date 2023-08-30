import React, { useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginContext } from '../contexts/LoginContextProvider'


const Login = () => {
    
    const {login} = useLoginContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
      const response = await login(username, password);
      try
      {
        triggerToast(response.message);
      }catch(err)
      {
        triggerToast("Zalogowano pomyślnie");
      }
      

    };
    const triggerToast = (message) => {
      toast(message, {
        autoClose: 5000,
        hideProgressBar: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

  return (
    <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
    <div className="relative py-3 sm:w-96 mx-auto text-center">
      <span className="text-2xl font-light ">Logowanie do panelu Bus.IO</span>
      <div className="mt-4 bg-white shadow-md rounded-lg text-left">
        <div className="h-2 bg-blue-400 rounded-t-md"></div>
        <div className="px-8 py-6 ">
          <label className="block font-semibold"> Email </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"></input>
          <label className="block mt-3 font-semibold"> Hasło </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"></input>
            <div className="flex justify-between items-baseline">
            <button
      className={`mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-purple-600`}
      onClick={handleLogin}
    >
        Zaloguj
    </button>
              <a href="#" className="text-sm hover:underline">Zapomniałaś/eś hasła?</a>
            </div>
        </div>
        
    </div>
  </div>
  <ToastContainer />
  </div>

    
  )
}

export default Login