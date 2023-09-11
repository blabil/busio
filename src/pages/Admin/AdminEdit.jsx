import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserService } from "../../services";

const AdminEdit = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();

  const fetchUserDetail = useCallback (async () => {
    try {
      const response = await UserService.adminFetchUser(id);
      const fullNameSepareted = response.profile.fullName.split(" ");
      setName(fullNameSepareted[0]);
      setSurname(fullNameSepareted[1]);
      setEmail(response.email);
      setPhone(response.profile.phone);
      setRole(response.role);
      setAddress(response.profile.address);
    } catch (error) {
      triggerToast(error.message);
    }
  },[id]);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  const handleEdit = async () => {
    const fullName = name + " " + surname;
    const userDto = UserService.returnUserDto(email, fullName, phone, password, role, address);
    let response = null;
    try{
      response = await UserService.adminEditUser(userDto, id);
    } catch(error)
    {
      response = error.message;
    }
    triggerToast(response);
  };

  const triggerToast = (message) => {
    toast(message, {
      autoClose: 5000,
      hideProgressBar: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  return (
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Edytowanie użytkownika
              </h6>
              <div className="text-center flex justify-between">
                <Link to={`/`}>
                  <button
                    className="bg-sky-400 text-white font-bold uppercase text-xs px-4 py-2 rounded hover:bg-teal-500 ease-linear transition-all duration-150 mx-2"
                    type="button"
                  >
                    Powrót
                  </button>
                </Link>
                <button
                  onClick={handleEdit}
                  className="bg-sky-400 text-white font-bold uppercase text-xs px-4 py-2 rounded hover:bg-teal-500 ease-linear transition-all duration-150 mx-2"
                  type="button"
                >
                  Dodaj
                </button>
              </div>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Podstawowe informacje
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-name"
                  >
                    Imie
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="Kamil"
                  ></input>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-surname"
                  >
                    Nazwisko
                  </label>
                  <input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="Majoch"
                  ></input>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-email"
                  >
                    E-mail
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="email@email.com"
                  ></input>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Hasło
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="***"
                  ></input>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-number"
                  >
                    Numer Telefonu
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="123456789"
                  ></input>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-address"
                  >
                    Address
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="Nysa 2"
                  ></input>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-role"
                  >
                    Rola
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block appearance-none w-full bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                    id="grid-role"
                  >
                    <option value="ADMIN">Administrator</option>
                    <option value="USER">Dyspozytor</option>
                    <option value="DRIVER">Kierowca</option>
                    <option value="MECHANIC">Mechanik</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300"></hr>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default AdminEdit;
