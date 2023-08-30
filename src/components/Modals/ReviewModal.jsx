import React, { useState } from "react";
import ReactModal from "react-modal";
import DatePicker from "react-datepicker";
import { BusEditService } from "../../services/index";

import "react-datepicker/dist/react-datepicker.css";
import RegistrationType from "../Enums/BusEditEnums";
import { ModalContainer, ModalInput, ModalTitle, SendButton } from "..";

const ReviewModal = ({ isOpen, onClose, onSubmit, bus_id }) => {
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isPositive, setIsPositive] = useState(true);

  const handleSetIsPositiveChange = (event) => {
    setIsPositive(event.target.checked);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const reviewDto = BusEditService.returnReviewDto(
      isPositive,
      startDate,
      endDate,
      desc,
      bus_id
    );
    onSubmit(reviewDto, RegistrationType.REVIEW);
    onClose();
  }

  return (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Rejestracja przeglądu."
      appElement={document.getElementById("root")}
    >
      <ModalContainer onClick={onClose}>
        <ModalTitle label={"REJESTRACJA BADAŃ TECHNICZNYCH"}>
          <ModalInput grid={"startDate-grid"} label={"DATA WYSTAWIENIA"}>
            <DatePicker
              className="cursor-cell border-2 rounded-lg border-dotted border-sky-400"
              id="startDate-grid"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </ModalInput>
          <ModalInput grid={"endDate-grid"} label={"DATA WYGAŚNIĘCIA"}>
            <DatePicker
              className="cursor-cell border-2 rounded-lg border-dotted border-sky-400"
              id="endDate-grid"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </ModalInput>
          <ModalInput grid={"positive-grid"} label={"POZYTYWNY"}>
            <input
              type="checkbox"
              checked={isPositive}
              id="positive-grid"
              onChange={handleSetIsPositiveChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            ></input>
          </ModalInput>
          <ModalInput grid={"desc-grid"} label={"DODATKOWY OPIS"}>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              id="desc-grid"
              type="text-area"
              className="max-h-64 min-h-64 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Opcjonalnie"
            ></textarea>
          </ModalInput>
        </ModalTitle>
        <div className="flex justify-center mb-4 w-full mt-8">
          <SendButton onClick={handleSubmit} />
        </div>
      </ModalContainer>
    </ReactModal>
  );
};

export default ReviewModal;
