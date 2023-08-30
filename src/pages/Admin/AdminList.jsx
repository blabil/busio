import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { useLoginContext } from '../../contexts/LoginContextProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteModal } from '../../components';

const AdminList = () => {

    const { userID } = useLoginContext();
    const [userList, setUserList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [uuidDelete, setUuidDelete] = useState('null');

    useEffect(() => {
        const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/users', {
            withCredentials: true,
        });
        setUserList(response.data.filter((user) => user.id !== userID));
        };
        fetchUsers();
    }, [userID, userList, showModal]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/users/${uuidDelete}`,{ withCredentials: true })
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
          position: toast.POSITION.BOTTOM_RIGHT 
        });
      }); 


      setUserList.map((prevState) => 
      prevState.filter((user) => user.id !== uuidDelete)
      );

  };
      return (
        <div className="overflow-x-auto">
        <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full lg:w-5/6">
                <div className="bg-white shadow-md rounded my-6">
                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">UUID</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-center">Dane</th>
                                <th className="py-3 px-6 text-center">Rola</th>
                                <th className="py-3 px-6 text-center">Akcje</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">


                            {userList.map((user) => ( 
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="mr-2">
                                  
                                    </div>
                                    <span className="font-medium">{user.id}</span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                                <div className="flex items-center">
                                    <span>{user.email}</span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex items-center justify-center">
                                    <span>{user.fullName}</span>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{user.role}</span>
                            </td>
                            <td className="py-3 px-6 text-center">
                                <div className="flex item-center justify-center">
                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <Link to={`/edit/${user.id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        </Link>
                                    </div>
                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <Link
                                            key={user.id}
                                            onClick={() => {
                                                setUuidDelete(user.id)
                                                setShowModal(true);
                                            }}
                                        
                                        >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                      </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>))}
                            
                        </tbody>
                    </table>
                    <DeleteModal
                        isOpen={showModal}
                        closeModal={() => setShowModal(false)}
                        handleDelete={() => handleDelete()}
                    />
                </div>
            </div>
        </div>
                    <ToastContainer />
    </div>
      )
}

export default AdminList