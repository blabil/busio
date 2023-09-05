import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import BusRouteService from "../../services/BusRouteService";
import { RegisterBusStopModal } from "../../components";

const RegisterBusLine = () => {
  const [pola, setPola] = useState([]);
  const [czas, setCzas] = useState([]);
  const [stops, setStops] = useState([]);
  const [number, setNumber] = useState("");
  const [part, setPart] = useState("");

  useEffect(() => {
    fetchStops();
  }, []);

  const fetchStops = async () => {
    const response = await BusRouteService.fetchStops();
    setStops(response);
  };

  const handleRegisterLineBus = async () => {
    let response = null;
    try {
      response = await BusRouteService.handleRegisterBusLine(
        BusRouteService.returnBusLineDto(number, part, pola, czas)
      );
    } catch (error) {
      response = error.message;
    }
    triggerToast(response);
  };

  const handleChange = (index, e) => {
    const nowePola = [...pola];
    nowePola[index] = e.target.value;
    const nowyCzas = [...czas];

    if (index === 0) {
      if (czas.length !== 0) nowyCzas[index].time = "";
    } else if (index === pola.length - 1) {
      nowyCzas[index - 1].time = "";
    } else {
      nowyCzas[index].time = "";
      nowyCzas[index - 1].time = "";
    }
    console.log(index + "<index  length>" + pola.length);

    setPola(nowePola);
  };

  const handleChangeTime = async (index, e) => {
    const nowyCzas = [...czas];
    nowyCzas[index - 1].bustopid_1 = pola[index - 1];
    nowyCzas[index - 1].bustopid_2 = pola[index];
    nowyCzas[index - 1].time = e.target.value;
    nowyCzas[index - 1].order = index - 1;

    if (pola[index - 1].id !== "" && pola[index].id !== "") {
      const busStop1 = pola[index - 1];
      const busStop2 = pola[index];
      console.log(busStop1, busStop2);

      const response = await BusRouteService.handleChangeTime(
        busStop1,
        busStop2
      );
      if (response.isTime) {
        nowyCzas[index - 1].time = response.time;
      }
    }
    setCzas(nowyCzas);
  };

  const dodajPole = () => {
    setPola([...pola, { id: "" }]);
    if (pola.length > 0) {
      setCzas([
        ...czas,
        { bustopid_1: "", bustopid_2: "", time: "", order: "" },
      ]);
    }
  };

  const usunPole = (index) => {
    const nowePola = [...pola];
    nowePola.splice(index, 1);
    setPola(nowePola);

    if (index !== 0) {
      const nowyCzas = [...czas];
      nowyCzas.splice(index - 1, 1);
      setCzas(nowyCzas);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleRegisterBusStop(address) {
    let response = null;
    try {
      response = await BusRouteService.handleRegisterBusStop(address);
      fetchStops();
    } catch (error) {
      response = error.message;
    }
    triggerToast(response);
  }

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
                Tworzenie Linii Autobusowej
              </h6>
              <div className="text-center flex flex-col w-5/6">
                <div className="flex px-2 py-2 justify-end">
                  <Link to={`/busline/list`}>
                    <button
                      className="bg-sky-400 text-white font-bold uppercase text-xs px-4 py-2 rounded hover:bg-teal-500 ease-linear transition-all duration-150 mx-2"
                      type="button"
                    >
                      Powrót
                    </button>
                  </Link>
                  <button
                    onClick={handleRegisterLineBus}
                    className="bg-sky-400 text-white font-bold uppercase text-xs px-4 py-2 rounded hover:bg-teal-500 ease-linear transition-all duration-150 mx-2"
                    type="button"
                  >
                    Dodaj
                  </button>
                </div>
                <div className="flex">
                  <button
                    onClick={dodajPole}
                    className="bg-sky-400 text-white font-bold uppercase text-xs px-4 py-2 rounded hover:bg-teal-500 ease-linear transition-all duration-150 mx-2"
                    type="button"
                  >
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
                  </button>

                  <button
                    onClick={handleOpenModal}
                    className="bg-sky-400 text-white font-bold uppercase text-xs px-4 py-2 rounded hover:bg-teal-500 ease-linear transition-all duration-150 mx-2"
                    type="button"
                  >
                    Zarejestruj przystanek
                  </button>
                  <RegisterBusStopModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleRegisterBusStop}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 px-4 lg:px-10 py-10 pt-0">
            <div className="flex-1 flex-wrap">
              <div className="w-full px-4">
                <div className="relative w-full mb-3 mt-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-brand"
                  >
                    Numer Linii
                  </label>
                  <input
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="405"
                  ></input>
                </div>

                <div className="relative w-full mb-3 mt-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-brand"
                  >
                    Odcinek
                  </label>
                  <input
                    value={part}
                    onChange={(e) => setPart(e.target.value)}
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nysa - Otmuchów"
                  ></input>
                </div>
              </div>
            </div>
            {pola.map((pole, index) => (
              <div key={index} className="flex flex-col">
                {index >= 1 && (
                  <div className="flex w-3/6 flex-row">
                    <div className="my-2 mx-4">
                      <label
                        htmlFor="time"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Czas pomiędzy przystankami (z postojem)
                      </label>
                      <input
                        value={czas[index - 1].time}
                        onChange={(e) => handleChangeTime(index, e)}
                        type="number"
                        id="time"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        min="1"
                        required
                      ></input>
                    </div>
                  </div>
                )}

                <div className="flex flex-row">
                  <div className="w-5/6 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-brand"
                      >
                        #{index + 1} Przystanek
                      </label>
                      <div className="relative">
                        <select
                          key={index}
                          value={pole.id}
                          onChange={(e) => handleChange(index, e)}
                          className="block appearance-none w-full bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-role"
                        >
                          <option defaultValue="0" disabled hidden>
                            Wybierz przystanek...
                          </option>
                          {stops.map((stop) => (
                            <option key={stop.id} value={stop.id}>
                              {stop.address}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-1/6">
                    <div className="w-2 h-2">
                      <div className="flex-1 h-full">
                        <div className="flex items-center justify-center flex-1 h-full p-2 border border-gray-400 rounded-full">
                          <div className="relative">
                            <button
                              onClick={() => usunPole(index)}
                              type="button"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="3"
                                  d="M19 15H6"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <hr className="mt-6 border-b-1 border-blueGray-300"></hr>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default RegisterBusLine;
