import React, { useState } from "react";
import ReactModal from "react-modal";
import { BusEditService } from "../../services";
import RegistrationType from "../Enums/BusEditEnums";
import { ModalContainer, ModalInput, ModalTitle, SendButton } from "..";

const IssueModal = ({ isOpen, onClose, onSubmit, bus_id }) => {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const issueDto = BusEditService.returnIssueDto(title, desc, bus_id);
    onSubmit(issueDto, RegistrationType.ISSUE);
    onClose();
  }

  return (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Zgłaszanie usterki."
      appElement={document.getElementById("root")}
    >
      <ModalContainer onClick={onClose}>
        <ModalTitle label={"DODAJ NOWĄ USTERKĘ:"}>
          <ModalInput grid={"title-grid"} label={"USTERKA"}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="np. Rozerwana poszewka na krześle"
              id="title-grid"
            ></input>
          </ModalInput>
          <ModalInput grid={"desc-grid"} label={"OPIS"}>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              type="text-area"
              className="max-h-64 min-h-64 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder=""
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

export default IssueModal;
