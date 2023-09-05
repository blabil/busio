import React, { useState } from "react";
import ReactModal from "react-modal";
import { ModalContainer, ModalInput, ModalTitle, SendButton } from "..";

const EditBusStopModal = ({ isOpen, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
    onClose();
  }
  return (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edycja Przystanku."
      appElement={document.getElementById("root")}
    >
      <ModalContainer onClick={onClose}>
        <ModalTitle label={"Zmiana adresu"}>
          <ModalInput grid={"address-grid"} label={"NOWY ADRES PRZYSTANKU"}>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="ul. Kokoszy 12"
            ></input>
          </ModalInput>
        </ModalTitle>
        <div className="flex justify-center mb-4 w-full mt-8">
          <SendButton onClick={handleSubmit} />
        </div>
      </ModalContainer>
    </ReactModal>
  );
};

export default EditBusStopModal;
