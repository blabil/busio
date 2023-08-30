
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { useParams } from "react-router-dom";

const AssignDriverRouteModal = ({ isOpen, onClose, onSubmit }) => {
  
    const { id } = useParams();
    const [driverID, setDriverID] = useState("");
    const [routeID, setRouteID] = useState("");
    const [driverList, setDriverList] = useState([]);

    useEffect(() => {
        fetchDriver();
    }, [id]);

    const fetchDriver = async () => {
        const response = await axios.get("http://localhost:5000/driver", {
            withCredentials: true,
        });
        setDriverList(response.data);
        };

    

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(driverID, routeID);
        onClose();
      }
  
    return (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Przypisywanie kierowcy."
      appElement={document.getElementById("root")}
    >
      <div className="relative w-full max-w-md ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={onClose}
            type="button"
            className="absolute top-2 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Zamknij okno</span>
          </button>
          <div className="flex items-center flex-col gap-3 h-1/6">
            <h3 className=" mt-2 text-lg font-normal text-gray-500 dark:text-gray-400">
              Przypisz kierowcę:
            </h3>
            
            <div className="flex flex-row w-full h-36">
              <div className="flex flex-col gap-1 w-full h-full items-center justify-center mx-2 my-2">
                <h1>Wybierz kierowcę:</h1>
                <select
                value={driverID}
                onChange={(e) => setDriverID(e.target.value)}
                className="block appearance-none w-full bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-role"
              >
                {driverList.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.fullName}
                  </option>
                ))}
              </select>
              </div>
              
            </div>
            <div className="mb-5">
              <button
                onClick={handleSubmit}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-blue-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Dodaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

export default AssignDriverRouteModal