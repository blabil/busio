import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusRouteService from "../../services/BusRouteService";

const BusLine = () => {
  const [busLineList, setBusLineList] = useState([]);

  useEffect(() => {
    fetchBusLine();
  }, []);

  const fetchBusLine = async () => {
    const response = await BusRouteService.fetchBusLineList();
    setBusLineList(response);
  };

  const handleDelete = async (id) => {
    let response = null;
    try {
      response = await BusRouteService.handleDeleteBusLine(id);
      fetchBusLine();
    } catch (error) {
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
    <div className="-my-2 py-2 overflow-x-auto lg:-mx-2 pr-10 lg:px-8">
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block h-full w-full py-4 overflow-hidden bg-white px-12">
        <div className="flex justify-between items-center">
          <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
            <div className="flex flex-wrap items-stretch w-full h-full mb-6">
              <div className="flex">
                <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                  <svg
                    width="18"
                    height="18"
                    className="w-4 lg:w-auto"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                      stroke="#455A64"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.9993 16.9993L13.1328 13.1328"
                      stroke="#455A64"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <input
                type="text"
                className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                placeholder="Search"
              ></input>
            </div>
          </div>

          <div className="w-auto h-full">
            <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Dodaj Linie
            </h2>
            <Link to={`/busline/register`}>
              <div className="flex-1 h-full">
                <div className="flex items-center justify-center flex-1 h-full w-full p-2 border border-sky-400 rounded-full ho hover:bg-teal-500 hover:text-white">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="align-middle inline-block min-w-full bg-white px-8 py-2 rounded-bl-lg rounded-br-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-4">
                ID
              </th>
              <th scope="col" className="px-4 py-4 text-center">
                NUMER LINII
              </th>
              <th scope="col" className="px-4 py-4 text-center">
                ODCINEK
              </th>
              <th scope="col" className="px-4 py-4 text-center">
                USUŃ
              </th>
              <th scope="col" className="px-4 py-4 text-center">
                SCZEGÓŁY
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {busLineList.map((busLine) => (
              <tr
                key={busLine.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  #{busLine.id}
                </th>
                <td className="px-6 py-4 text-center">
                  {busLine.number}
                </td>
                <td className="px-6 py-4 text-center">
                  {busLine.part}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(busLine.id)}
                    className="px-5 py-2 border-red-500 border text-sky-400 rounded transition duration-300 hover:bg-teal-500 hover:text-white focus:outline-none"
                  >
                    Usuń
                  </button>
                </td>

                <td className="px-6 py-4 text-center">
                  <Link to={`/busline/edit/${busLine.id}`}>
                    <button className="px-5 py-2 border-sky-400 border text-sky-400 rounded transition duration-300 hover:bg-teal-500 hover:text-white">
                      Szczegóły
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BusLine;
