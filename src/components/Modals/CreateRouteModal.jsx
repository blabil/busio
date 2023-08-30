import React, { useState } from "react";
import ReactModal from "react-modal";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { ModalContainer, ModalInput, ModalTitle, SendButton } from "..";
import BusRouteService from "../../services/BusRouteService";

const CreateRouteModal = ({ isOpen, onClose, onSubmit, busLineID }) => {
  const [time, setTime] = useState("10:00");
  const [routeType, setRouteType] = useState("WEEK");
  const [routeTimeType, setRouteTimeType] = useState("FULL");

  function handleSubmit(event) {
    event.preventDefault();
    const dto = BusRouteService.returnRouteDto(
      busLineID,
      time,
      routeTimeType,
      routeType
    );
    onSubmit(dto);
    onClose();
  }

  return (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Rejestracja trasy."
      appElement={document.getElementById("root")}
    >
      <ModalContainer onClick={onClose}>
        <ModalTitle label={"Rejestracja trasy"}>
          <ModalInput grid={"time-grid"} label={"GODZINA STARTU"}>
            <TimePicker id="time-grid" onChange={setTime} value={time} />
          </ModalInput>

          <ModalInput grid={"routeTimeType-grid"} label={"TYP CZASU TRASY"}>
            <select
              value={routeTimeType}
              onChange={(e) => setRouteTimeType(e.target.value)}
              className="block appearance-none bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="routeTimeType-grid"
            >
              <option value="FULL">PEŁNA</option>
              <option value="HALF">1-STRONNA</option>
            </select>
          </ModalInput>

          <ModalInput grid={"routeType-grid"} label={"TYP TRASY"}>
            <select
              value={routeType}
              onChange={(e) => setRouteType(e.target.value)}
              className="block appearance-none bg-gray-200 border border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="routeType-grid"
            >
              <option value="MONFRI">PON - PIĄ</option>
              <option value="WEEK">CAŁY TYDZIEŃ</option>
              <option value="WEEKEND">WEEKENDOWY</option>
              <option value="SPECIAL">SPECJALNY</option>
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

export default CreateRouteModal;
