import React, { useEffect, useState } from "react";
import {
  AssignDriverRouteModal,
  ChooseRouteModal,
} from "../components";
import { useNavigate, Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLoginContext } from "../contexts/LoginContextProvider";

const DriverMain = () => {
  const { userID } = useLoginContext();

  const [isBusModalOpen, setIsBusModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [route, setRoute] = useState([]);

  function handleBusOpenModal() {
    setIsBusModalOpen(true);
  }
  function handleBusCloseModal() {
    setIsBusModalOpen(false);
  }

  function handleRouteOpenModal() {
    setIsRouteModalOpen(true);
  }
  function handleRouteCloseModal() {
    setIsRouteModalOpen(false);
  }

  function test(id) {
    console.log(id);
  }

  async function handleShowRoute(id)
  {
    const response = await axios
    .get(`http://localhost:5000/route/getroute/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      setRoute(response.data);
    })
    .catch((error) => {
      //navigate("/buslinelist");
    });
    console.log(route);
  }

  return (
    <div className="flex flex-col gap-3 h-screen">
      {/* Górna sekcja */}
      <div className="flex  justify-between mx-8 mb-6 shadow-lg rounded-lg bg-white border-0">
        <div className="flex justify-center gap-3 flex-col w-3/6 px-6 py-6">
          <h1> </h1>
        </div>

        <div className="bg-white flex justify-center items-center p-4 w-3/4 rounded-lg"></div>

        <div className="bg-white flex justify-center items-center p-4 w-3/4">
          <button
            onClick={handleBusOpenModal}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 mr-2 hover:bg-gray-700 focus:bg-gray-700"
          >
            Wybierz Busa
          </button>
          <button
            onClick={handleRouteOpenModal}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 mr-2 hover:bg-gray-700 focus:bg-gray-700"
          >
            Wybierz trase
          </button>
          <ChooseRouteModal
            onClick={handleRouteOpenModal}
            isOpen={isRouteModalOpen}
            onClose={handleRouteCloseModal}
            onSubmit={handleShowRoute}
            userID={userID}
          />
        </div>
      </div>

      {/* Dolna sekcja */}
      <div className="flex-1 flex-col bg-white items-center mx-8 break-words mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="flex flex-col  w-full h-full">
          <div className="flex w-full flex-col ">
          <div className="flex w-full flex-col justify-center">
            <h1>Autobus: {}</h1>
            {route.map((element, index) =>(
              <div key={index} className='flex w-1/2 justify-center items-center'>
              <h1 className="w-1/2 mx-8 my-4">{element.busstop}   : </h1>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"> {element.time} </span>
              </div>
            ))}
          
          </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DriverMain;
