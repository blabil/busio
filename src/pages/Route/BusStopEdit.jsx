import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  BasicHeader,
  BasicPanel,
  BottomPanel,
  ButtonPanel,
  EditBusStopModal,
  HeaderPanel,
  NavigateHref,
  PanelHeader,
  RegisterButton,
  TwoPartPanel,
  UpperPanel,
} from "../../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusRouteService from "../../services/BusRouteService";

const BusStopEdit = () => {
  const { id } = useParams();

  const [stop, setStop] = useState();
  const [busLines, setBusLines] = useState([]);
  const [stopConnections, setStopConnections] = useState([]);

  const [isEditBusStopModalOpen, setIsEditBusStopModalOpen] = useState(false);

  function handleBusTopEditOpenModal() {
    setIsEditBusStopModalOpen(true);
  }
  function handleBusTopEditCloseModal() {
    setIsEditBusStopModalOpen(false);
  }

  async function handleUpdateBusStop(address) {
    let response = null;
    try {
      response = await BusRouteService.handleUpdateBusStop(id, address);
      setStop(address);
    } catch (error) {
      response = error.message;
    }
    triggerToast(response);
  }

  const fetchStop = async () => {
    try {
      const response = await BusRouteService.fetchBusStop(id);
      setStop(response);
    } catch (error) {
      triggerToast(error.message);
    }
  };

  const fetchBusLine = async () => {
    try {
      const response = await BusRouteService.fetchBusLineByStop(id);
      setBusLines(response);
    } catch (error) {
      triggerToast(error.message);
    }
  };

  const fetchStopConnections = async () => {
    try {
      const response = await BusRouteService.fetchStopConnections(id);
      setStopConnections(response);
    } catch (error) {
      triggerToast(error.message);
    }
  };

  const handleChangeTime = async (index, e) => {
    const connection = [...stopConnections];
    connection[index].time = e.target.value;
    setStopConnections(connection);
  };

  const updateTimeConnection = async (index) => {
    const connectionTime = stopConnections[index].time;
    const busStopToID = stopConnections[index].busStopToID;
    let response = null;
    try {
      response = await BusRouteService.handleUpdateTimeConnection(
        id,
        connectionTime,
        busStopToID
      );
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
    fetchBusLine();
    fetchStop();
    fetchStopConnections();
  }, [id]);

  return (
    <div className="flex flex-col gap-3 h-screen">
      <UpperPanel>
        <HeaderPanel>
          <BasicHeader label={"Przystanek:"} value={stop} />
        </HeaderPanel>

        <ButtonPanel label={"Edycja przystanku"}>
          <RegisterButton
            onClick={handleBusTopEditOpenModal}
            label={"Edytuj przystanek"}
          />
          <EditBusStopModal
            onClick={handleBusTopEditOpenModal}
            isOpen={isEditBusStopModalOpen}
            onClose={handleBusTopEditCloseModal}
            onSubmit={handleUpdateBusStop}
          />
        </ButtonPanel>
      </UpperPanel>
      <BottomPanel>
        <TwoPartPanel>
          <BasicPanel>
            <PanelHeader label={"Połączenia"} />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4 text-center">
                    PRZYSTANEK
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    CZAS
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    ZAPISZ
                  </th>
                </tr>
              </thead>
              <tbody>
                {stopConnections.map((connection, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">{connection.address}</h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        value={stopConnections[index].time}
                        onChange={(e) => handleChangeTime(index, e)}
                        type="number"
                        id="time"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        min="1"
                        required
                      ></input>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => updateTimeConnection(index)}
                        className="bg-transparent hover:bg-teal-500 text-sm text-black-400 hover:text-white py-2 px-4 border border-sky-400 hover:border-transparent rounded-lg"
                      >
                        Zapisz
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BasicPanel>
          <BasicPanel>
            <PanelHeader label={"Linie"}/>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4 text-center">
                    Linia
                  </th>
                </tr>
              </thead>
              <tbody>
              {busLines.map((busLine, index) => (
              <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left">
                  <NavigateHref label={busLine.number} path={`/busline/edit/${busLine.id}`}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </BasicPanel>
        </TwoPartPanel>
      </BottomPanel>
      <ToastContainer />
    </div>
  );
};

export default BusStopEdit;
