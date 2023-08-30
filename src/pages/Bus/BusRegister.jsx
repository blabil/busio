import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { BusEditService } from "../../services";

const BusRegister = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [registration, setRegistration] = useState("");
  const [productionYear, setProductionYear] = useState("");
  const [engine, setEngine] = useState("DIESEL");
  const [seats, setSeats] = useState(0);
  const state  = "AVAIABLE";

  const handleRegister = async () => {
    const busDto = BusEditService.returnBusDto(registration, state, brand, model, productionYear, seats, engine);
      try{
        const response = await BusEditService.handleRegisterBus(busDto);
        triggerToast(response);
      }catch(error)
      {
        triggerToast(error.message);
      }
      resetForms();
  };


  const resetForms = () =>{
    setBrand('');
    setModel('');
    setRegistration('');
    setProductionYear('');
    setEngine('DIESEL');
    setSeats(0);
  }

  const triggerToast = (message) => {
    toast(message, {
      autoClose: 5000,
      hideProgressBar: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  return (
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                Dodawanie busa
              </h6>
              <div className="text-center flex justify-between">
                <Link to={`/bus/list`}>
                  <button
                    className="bg-sky-400 text-white font-bold uppercase text-xs px-4 py-2 rounded hover:bg-teal-500 ease-linear transition-all duration-150 mx-2"
                    type="button"
                  >
                    Powrót
                  </button>
                </Link>
                <button
                  onClick={handleRegister}
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
                    htmlFor="grid-brand"
                  >
                    Marka
                  </label>
                  <input
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="Man"
                  ></input>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-model"
                  >
                    Model
                  </label>
                  <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="Lion's City"
                  ></input>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-register"
                  >
                    Rejestracja
                  </label>
                  <input
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value)}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="ONY 1234"
                  ></input>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-register"
                  >
                    Rok Produkcji
                  </label>
                  <input
                    value={productionYear}
                    onChange={(e) => setProductionYear(e.target.value)}
                    type="date"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="10"
                  ></input>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-type"
                  >
                    Typ
                  </label>
                  <select
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}
                    className="block appearance-none w-full bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                    id="grid-role"
                  >
                    <option value="ELECTRIC">Elektryczny</option>
                    <option value="DIESEL">Spalinowy</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-register"
                  >
                    Ilość miejsc
                  </label>
                  <input
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:ring-teal-500 w-full ease-linear transition-all duration-150"
                    placeholder="10"
                  ></input>
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

export default BusRegister;
