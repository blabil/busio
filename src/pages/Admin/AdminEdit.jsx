import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AdminEdit = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [user, setUser] = useState({});

    const { id } = useParams();




    useEffect(async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`, {withCredentials : true})
        setUser(response.data);

        const fullNameSepareted = response.data.fullName.split(' ');
        setName(fullNameSepareted[0]);
        setSurname(fullNameSepareted[1]);
        setEmail(response.data.email);
        setPhone(response.data.phone); 
        setRole(response.data.role);
    }, []);

    
    const handleEdit = async () => {
        const fullName = name + " " + surname;
        const response = await axios.patch(`http://localhost:5000/users/${id}`, { email, fullName, phone, password, role },{ withCredentials: true })
        .then(response =>{
        toast(response.data.message, {
            autoClose: 5000, 
            hideProgressBar: false, 
            position: toast.POSITION.BOTTOM_RIGHT 
        });
        }).catch(error =>{
        let message = '';
        if(Array.isArray(error.response.data.message)) message = error.response.data.message[0];
        else message = error.response.data.message;
        toast(message, {
            autoClose: 5000, 
            hideProgressBar: false, 
            position: toast.POSITION.BOTTOM_RIGHT // pozycja powiadomienia
        });
        }); 
    }

  return (
    <div className='flex justify-center items-center h-screen w-full bg-blue-400"'>
    <div className="w-full max-w-lg">
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhttp="grid-first-name">
        Imie
      </label>
      <input value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Kamil"></input>
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhttp="grid-last-name">
        Nazwisko
      </label>
      <input value={surname} onChange={(e) => setSurname(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Majoch"></input>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhttp="grid-email">
        Email
      </label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="example@example.com"></input>
      <p className="text-gray-600 text-xs italic">Email po którym użytkownik powinien się logować.</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhttp="grid-password">
        Password
      </label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"></input>
      <p className="text-gray-600 text-xs italic">Hasło powinno składać sie od 8 do 20 znaków.</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhttp="grid-telephone">
        Telefon
      </label>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-telephone" type="text" placeholder="123456789"></input>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" forhttp="grid-role">
        Uprawnienia
      </label>
      <div className="relative">
        <select value={role} onChange={(e) => setRole(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-role">
          <option value='user'>Dyspozytor</option>
          <option value='driver'>Kierowca</option>
          <option value='admin'>Admin</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
    <button onClick={handleEdit} className="block bg-blue-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Edytuj Użytkownika</button>
</div>
  </div>
</div>
<ToastContainer />
</div>
  )
}

export default AdminEdit