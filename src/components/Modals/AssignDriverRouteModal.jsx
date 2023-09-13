import React, { useEffect, useState, useCallback } from "react";
import ReactModal from "react-modal";
import { ModalContainer, ModalInput, ModalTitle, SendButton } from "..";
import BusRouteService from "../../services/BusRouteService";
const AssignDriverRouteModal = ({ isOpen, onClose, onSubmit, routeID }) => {
  const [driverID, setDriverID] = useState("");
  const [driverList, setDriverList] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(driverID);
    onClose();
  }

  const fetchDriver = useCallback(async () => {
    try {
      const response = await BusRouteService.fetchDrivers(routeID);
      setDriverList(response);
    } catch (error) {
      console.log(error);
    }
  }, [routeID]);

  useEffect(() => {
    fetchDriver();
  }, [fetchDriver]);

  return (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Przypisywanie kierowcy."
      appElement={document.getElementById("root")}
    >
      <ModalContainer onClick={onClose}>
        <ModalTitle label={"Przypisywanie kierowcy"}>
          <ModalInput grid={"driver-grid"} label={"WYBIERZ KIEROWCE"}>
            <select
              value={driverID}
              onChange={(e) => setDriverID(e.target.value)}
              className="block appearance-none w-full bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="driver-grid"
            >
              {driverList.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.profile.fullName}
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

export default AssignDriverRouteModal;
