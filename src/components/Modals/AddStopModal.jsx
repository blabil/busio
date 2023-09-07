import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { BusRouteService } from "../../services/";
import { ModalContainer, ModalInput, ModalTitle, SendButton } from "..";

const BreakDownModal = ({ isOpen, onClose, onSubmit, busLineID }) => {
  const [stops, setStops] = useState([]);
  const [busLineStops, setBusLineStops] = useState([]);
  const [firstLast, setFirstLast] = useState({});
  const [dataChange, setDataChange] = useState({
    time: 1,
  });
  const [busStop, setBusStop] = useState();
  

  const fetchStops = async () => {
    await BusRouteService.fetchStops().then(async (stops) => {
      setStops(stops);
      if (busLineID) {
        await BusRouteService.fetchBusLineStops(busLineID).then(
          async (response) => {
            let temp = [];
            response.map((stop) => {
              temp.push(stop.busStop);
            });
            setBusLineStops(temp);
            setFirstLast(await BusRouteService.fetchFirstLastStop(busLineID));
          }
        );
      }
    });
  };

  const deleteAssinged = () => {
    const temp = stops.filter((stop) => {
      return !busLineStops.some((assinged) => assinged.id === stop.id);
    });
    return temp;
  };

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(dataChange, busStop);
    onClose();
  }
  
  const handleUpdateFL = (value, fieldName) =>
  {
    if(value === "FIRST") setBusStop(firstLast.firstStop.id)
    if(value === "END") setBusStop(firstLast.lastStop.id)
    handleChange(value, fieldName)
  }

  const handleChange = async (value, fieldName) => {
    let response = null;
    if (dataChange.newStopID && busStop) {
      response = await BusRouteService.handleChangeTime(
        busStop,
        dataChange.newStopID
      );
    }
    const newDataChange = { ...dataChange };
    newDataChange[fieldName] = value;
    if (response && response.isTime) newDataChange.time = response.time;
    setDataChange(newDataChange);
  };
  useEffect(() => {
    setStops(deleteAssinged());
  }, [firstLast, busLineStops]);

  useEffect(() => {
    fetchStops();
  }, [isOpen]);

  return (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Dodawanie przystanku do linii."
      appElement={document.getElementById("root")}
    >
      <ModalContainer onClick={onClose}>
        <ModalTitle label={"DODAJ PRZYSTANEK"}>
          <ModalInput grid={"new-stop-grid"} label={"NOWY PRZYSTANEK"}>
            <select
              value={dataChange.newStopID}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
              className="block appearance-none w-full bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="new-stop-grid"
              name="newStopID"
            >
              {dataChange.newStopID ? null : (
                <option value="">Wybierz przystanek</option>
              )}

              {stops.map((stop) => (
                <option key={stop.id} value={stop.id}>
                  {stop.address}
                </option>
              ))}
            </select>
          </ModalInput>

          <ModalInput grid={"time-grid"} label={"CZAS POMIĘDZY PRZYSTANKAMI"}>
            <input
              value={dataChange.time}
              onChange={(e) => 
                handleChange(e.target.value, e.target.name)}
              type="number"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="time-grid"
              min="1"
              name="time"
            ></input>
          </ModalInput>

          <ModalInput grid={"type-grid"} label={"MIEJSCE DODANIA"}>
            <select
              value={dataChange.type}
              onChange={(e) =>
                 handleUpdateFL(e.target.value, e.target.name)}
              className="block appearance-none w-full bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="type-grid"
              name="type"
            >
              {dataChange.type ? null : <option value="">Wybierz Typ</option>}
              <option value="FIRST">Pierwszy</option>
              <option value="AFTER">Po</option>
              <option value="END">Koniec</option>
            </select>
          </ModalInput>

          {dataChange.type === "AFTER" ? (
            <ModalInput grid={"new-stop-grid"} label={"PO KTÓRYM"}>
              <select
                value={busStop}
                onChange={(e) => setBusStop(e.target.value)}
                className="block appearance-none w-full bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="new-stop-grid"
              >
                {dataChange.stopFromID ? null : (
                  <option value="">Wybierz przystanek</option>
                )}
                {busLineStops.map((stop) => (
                  <option key={stop.id} value={stop.id}>
                    {stop.address}
                  </option>
                ))}
              </select>
            </ModalInput>
          ) : dataChange.type === "END" ? (
            <input
              value={firstLast.lastStop?.address}
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
              placeholder="np. Zepsuta klimatyzacja"
              id="title-grid"
              readOnly
            ></input>
          ) : dataChange.type === "FIRST" ? (
            <input
              value={firstLast.firstStop?.address}
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150"
              placeholder="np. Zepsuta klimatyzacja"
              id="title-grid"
              readOnly
            ></input>
          ) : null}
        </ModalTitle>
        <div className="flex justify-center mb-4 w-full mt-8">
          <SendButton onClick={handleSubmit} />
        </div>
      </ModalContainer>
    </ReactModal>
  );
};

export default BreakDownModal;
