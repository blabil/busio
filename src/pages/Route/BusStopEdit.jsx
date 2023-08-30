import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { EditBusStopModal } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BusStopEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stop, setStop] = useState();
  const [busLines, setBusLines] = useState([]);
  const [czas, setCzas] = useState([]);
  const [stopConnections, setStopConnections] = useState([]);

  const [isEditBusStopModalOpen, setIsEditBusStopModalOpen] = useState(false);

  function handleBusTopEditOpenModal() {
    setIsEditBusStopModalOpen(true);
  }
  function handleBusTopEditCloseModal() {
    setIsEditBusStopModalOpen(false);
  }

  useEffect(() => {
    fetchBusLine();
    fetchStop();
    fetchStopConnections();
  }, [id]);

  async function handleUpdateBusStop(address) {
    await axios
      .patch(
        `http://localhost:5000/busstop/${id}`,
        { address },
        { withCredentials: true }
      )
      .then((response) => {
        toast(response.data.message, {
          autoClose: 5000,
          hideProgressBar: false,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        let message = "";
        if (Array.isArray(error.response.data.message))
          message = error.response.data.message[0];
        else message = error.response.data.message;
        toast(message, {
          autoClose: 5000,
          hideProgressBar: false,
          position: toast.POSITION.BOTTOM_RIGHT, // pozycja powiadomienia
        });
      });
    setStop(address);
  }

  const fetchStop = async () => {
    await axios
      .get(`http://localhost:5000/busstop/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setStop(response.data.address);
      })
      .catch((error) => {
        navigate("/");
      });
  };

  const fetchBusLine = async () => {
    await axios
      .get(`http://localhost:5000/busstop/buslines/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.busLines);
        setBusLines(response.data.busLines);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchStopConnections = async () => {
    await axios
      .get(`http://localhost:5000/busstop/connections/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setStopConnections(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeTime = async (index, e) => {

    const connection = [...stopConnections];
    connection[index].time = e.target.value;
    setStopConnections(connection);
  };

  const updateTimeConnection = async(index) => {
    const connectionTime = stopConnections[index].time;
    const busStopToID = stopConnections[index].busStopToID;
    await axios
      .patch(
        `http://localhost:5000/busstop/updatetimeconnection/${id}`,
        { connectionTime, busStopToID},
        { withCredentials: true }
      )
      .then((response) => {
        toast(response.data.message, {
          autoClose: 5000,
          hideProgressBar: false,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        let message = "";
        if (Array.isArray(error.response.data.message))
          message = error.response.data.message[0];
        else message = error.response.data.message;
        toast(message, {
          autoClose: 5000,
          hideProgressBar: false,
          position: toast.POSITION.BOTTOM_RIGHT, // pozycja powiadomienia
        });
      });
  }

  return (
    <div className="flex flex-col gap-3 h-screen">
      {/* Górna sekcja */}
      <div className="flex  justify-between mx-8 mb-6 shadow-lg rounded-lg bg-white border-0">
        <div className="flex justify-center gap-3 flex-col w-2/6 px-6 py-6">
          <h1>Przystanek: {stop}</h1>
        </div>

        <div className="bg-white flex justify-center items-center p-4 w-3/4 rounded-lg"></div>

        <div className="bg-white flex justify-center items-center p-4 w-3/4">
          <button
            onClick={handleBusTopEditOpenModal}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 mr-2 hover:bg-gray-700 focus:bg-gray-700"
          >
            Zmień adres
          </button>

          <EditBusStopModal
            onClick={handleBusTopEditOpenModal}
            isOpen={isEditBusStopModalOpen}
            onClose={handleBusTopEditCloseModal}
            onSubmit={handleUpdateBusStop}
          />
        </div>
      </div>

      {/* Dolna sekcja */}
      <div className="flex-1 flex-col bg-white items-center mx-8 break-words mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="flex justify-around w-full h-1/6">
          <div className="flex w-2/4">
            <table className="w-full mt-4 px-4">
              <thead>
                <tr>
                  <th className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left">
                    Przystanek
                  </th>
                  <th className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left">
                    Czas
                  </th>
                  <th className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {stopConnections.map((connection, index) => (
                  <tr key={index}>
                    <td className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left">
                      {connection.address}
                    </td>
                    <td className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left">
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
                    <td className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left">
                      <button onClick={() => updateTimeConnection(index)} className="bg-transparent hover:bg-cyan-400 text-sm text-black-400 hover:text-white font-semibold py-2 px-4 border border-blue-400 hover:border-transparent rounded-lg">
                        Zapisz
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex w-2/4">
            <table className="w-full mt-4 px-4">
              <thead>
                <tr>
                  <th className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left">
                    Numer Linii
                  </th>
                  <th className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {busLines.map((busLine, index) => (
                  <tr key={index}>
                    <td className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left">
                      {busLine.number}
                    </td>
                    <td className="px-6 py-3  leading-4 text-blue-500 tracking-wider text-left">
                      <Link to={`/busline/edit/${busLine.id}`}>
                        <button className="bg-transparent hover:bg-cyan-400 text-sm text-black-400 hover:text-white font-semibold py-2 px-4 border border-blue-400 hover:border-transparent rounded-lg">
                          Przejdź
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BusStopEdit;
