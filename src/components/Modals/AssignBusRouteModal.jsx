import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import BusRouteService from "../../services/BusRouteService";
import { ModalContainer, ModalInput, ModalTitle, SendButton } from "..";

const AssignBusRouteModal = ({ isOpen, onClose, onSubmit, routeID }) => {
  const [busList, setBusList] = useState([]);
  const [busID, setBusID] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(busID);
    onClose();
  }

  const fetchBus = async () => {
    try {
      const response = await BusRouteService.fetchBuses(routeID);
      setBusList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBus();
  }, []);

  return (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Przypisywanie kierowcy."
      appElement={document.getElementById("root")}
    >
      <ModalContainer onClick={onClose}>
        <ModalTitle label={"Przypisz busa"}>
          <ModalInput grid={"bus-grid"} label={"WYBIERZ BUSA"}>
            <select
              value={busID}
              onChange={(e) => setBusID(e.target.value)}
              className="block appearance-none w-full bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="bus-grid"
            >
              {busList.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.registration}
                </option>
              ))}
            </select>
          </ModalInput>
        </ModalTitle>
        <div className="flex justify-center mb-4 w-full mt-8">
          <SendButton onClick={handleSubmit} />
        </div>
      </ModalContainer>
    </ReactModal>
  );
};

export default AssignBusRouteModal;
