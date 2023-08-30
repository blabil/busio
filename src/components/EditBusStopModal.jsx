import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";

const EditBusStopModal = ({ isOpen, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState("");


    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
        onClose();
      }
  return (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edycja Przystanku."
      appElement={document.getElementById("root")}
    >
      <div className="relative w-full max-w-md max-h-full">
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
          <div className="flex items-center flex-col gap-3 ">
            <h3 className=" mt-2 text-lg font-normal text-gray-500 dark:text-gray-400">
              Wpisz adres przystanku
            </h3>
            <div className="relative">
            <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="ul. Kokoszy 12"
                  ></input>
            </div>
            <div className="mb-5">
              <button
                onClick={handleSubmit}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-blue-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Zmień
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

export default EditBusStopModal