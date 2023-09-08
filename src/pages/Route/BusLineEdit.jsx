import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AddStopModal,
  BasicHeader,
  BasicPanelFull,
  BottomPanel,
  ButtonPanel,
  CreateRouteModal,
  HeaderPanel,
  NavigateHref,
  PanelHeader,
  RegisterButton,
  ReturnButton,
  TwoPartPanel,
  UpperPanel,
} from "../../components";
import { Link, useParams } from "react-router-dom";
import BusRouteService from "../../services/BusRouteService";
import { AiFillDelete } from 'react-icons/ai'

const BusLineEdit = () => {
  const { id } = useParams();

  const [busLine, setBusLine] = useState({});
  const [connections, setConnections] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isAddStopOpen, setIsAddStopOpen] = useState(false)

  function handleRouteOpenModal() {
    setIsRouteModalOpen(true);
  }
  function handleRouteCloseModal() {
    setIsRouteModalOpen(false);
  }

  function handleOpenAddStopModal() {
    setIsAddStopOpen(true);
  }
  function handleCloseAddStopModal() {
    setIsAddStopOpen(false);
  }

  const handleAddBusTop = async (data, busStop) =>{
    data.busStop = busStop;
    data.busLineID = id;
    let response = null;
    try{
      response = await BusRouteService.handleAddNewStopToBusLine(data);
      fetchBusLineDetails();
    } catch(error)
    {
      response = error.message;
    }
    triggerToast(response)
  }

  const handleDeleteStop = async (busStop) =>
  {
    let response = null;
    try{
      response = await BusRouteService.handleDeleteStopFromBusLine(busStop, id);
      fetchBusLineDetails();
    } catch (error)
    {
      response = error.message;
    }
    triggerToast(response);
  }


  async function handleCreateRoute(dto) {
    let response = null;
    try {
      response = await BusRouteService.handleCreateRoute(dto);
      fetchBusLineRoutes();
    } catch (error) {
      response = error.message;
    }
    triggerToast(response);
  }

  const fetchBusLineRoutes = useCallback(async () => {
    try {
      const response = await BusRouteService.fetchBusLineRoutes(id);
      setRoutes(response);
    } catch (error) {
      triggerToast(error.message);
    }
  }, [id]);

  const fetchBusLineDetails = useCallback(async () => {
    try {
      const response = await BusRouteService.fetchBusLineDetails(id);
      setBusLine(response.busLine);
      setConnections(response.connections);
    } catch (error) {
      triggerToast(error.message);
    }
  }, [id]);

  const handleDeleteRoute = async (routeID) => {
    let response = null;
    try {
      response = await BusRouteService.handleDeleteRoute(routeID);
      fetchBusLineRoutes();
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

  useEffect(() => {
    fetchBusLineDetails();
    fetchBusLineRoutes();
  }, [fetchBusLineDetails, fetchBusLineRoutes]);

  return (
    <div className="flex flex-col gap-3 h-screen">
      <UpperPanel>
        <HeaderPanel>
          <BasicHeader label={"LINIA:"} value={busLine.number} />
          <BasicHeader
            label={"CZAS PRZEJAZDU:"}
            value={`${busLine.fullTime} min`}
          />
          <BasicHeader label={"ODCINEK:"} value={busLine.part} />
        </HeaderPanel>
        <ButtonPanel label={"EDYCJA LINII AUTOBUSOWEJ"}>
          <ReturnButton path={"/busline/list"} />
          <RegisterButton
            onClick={handleRouteOpenModal}
            label={"Dodaj trase"}
          />
          <RegisterButton
            onClick={handleOpenAddStopModal}
            label={"Dodaj przystanek"}
          />
          <CreateRouteModal
            onClose={handleRouteCloseModal}
            isOpen={isRouteModalOpen}
            onSubmit={handleCreateRoute}
            busLineID={id}
          />
          <AddStopModal 
          onClose={handleCloseAddStopModal}
          isOpen={isAddStopOpen}
          busLineID={id}
          onSubmit={handleAddBusTop}
          />
        </ButtonPanel>
      </UpperPanel>

      <BottomPanel>
        <TwoPartPanel>
          <BasicPanelFull>
            <PanelHeader label={"PRZYSTANKI"} />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4 text-center">
                    START
                  </th>
                  <th scope="col" className="px-2 py-2 text-center">
    
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    CZAS
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    CEL
                  </th>
                  <th scope="col" className="px-2 py-2 text-center">
    
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {connections.map((connection, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={index}
                  >
                    <td className="px-6 py-4 text-center">
                      <NavigateHref
                        label={connection.busStopFromAddress}
                        path={`/busstop/edit/${connection.busStopFromID}`}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleDeleteStop(connection.busStopFromID)}>
                        <AiFillDelete/>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="min-w-3  /6 bg-green-500 font-bold text-white text-center py-1 px-2 my-2 text-xs rounded">
                        {connection.time} min.
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <NavigateHref
                        label={connection.busStopToAddress}
                        path={`/busstop/edit/${connection.busStopToID}`}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleDeleteStop(connection.busStopToID)}>
                        <AiFillDelete/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-4 mt-8"></div>
          </BasicPanelFull>
        </TwoPartPanel>
        <TwoPartPanel>
          <BasicPanelFull>
            <PanelHeader label={"TRASY"}></PanelHeader>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    START
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    2-STRONNA
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
                {routes.map((route) => (
                  <tr
                    key={route.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      #{route.id}
                    </th>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">{route.startTime}</h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {route.fullRoute === true ? (
                        <h1 className="text-bold">Tak</h1>
                      ) : (
                        <h1 className="text-bold">Nie</h1>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDeleteRoute(`${route.id}`)}
                        className="px-5 py-2 border-red-500 border text-sky-400 rounded transition duration-300 hover:bg-teal-500 hover:text-white focus:outline-none"
                      >
                        Usuń
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link to={`/busroute/edit/${route.id}`}>
                        <button className="px-5 py-2 border-sky-400 border text-sky-400 rounded transition duration-300 hover:bg-teal-500 hover:text-white focus:outline-none">
                          Szczegóły
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BasicPanelFull>
        </TwoPartPanel>
      </BottomPanel>
      <ToastContainer />
    </div>
  );
};

export default BusLineEdit;
