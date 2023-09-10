import React, { useState } from "react";
import ReactModal from "react-modal";
import DatePicker from "react-datepicker";
import { ModalContainer, ModalInput, ModalTitle, RegistrationType, SendButton } from "..";
import { BusEditService } from "../../services";

const InsuranceModal = ({ isOpen, onClose, onSubmit, busID }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [company, setCompany] = useState("");
    const [price, setPrice] = useState(0);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const insuranceDto = BusEditService.returnInsuranceDto(company, price, startDate, endDate, busID);
        onSubmit(insuranceDto, RegistrationType.INSURANCE);
        onClose();
    }

  return (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Informacje."
      appElement={document.getElementById("root")}
    >
      <ModalContainer onClick={onClose}>
        <ModalTitle label={"Dodawanie ubezpieczenia"}>
            <ModalInput grid={"company-grid"} label={"FIRMA UBEZPIECZJĄCA"}>
                <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                type="text"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Ubezpieczenia.io"
                id="company-grid"
                ></input>
            </ModalInput>
            <ModalInput grid={"price-grid"} label={"CENA"}>
                <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Ubezpieczenia.io"
                id="price-grid"
                min="0"
                ></input>
            </ModalInput>
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
        </ModalTitle>
        <div className="flex justify-center mb-4 w-full mt-8">
          <SendButton onClick={handleSubmit} />
        </div>
      </ModalContainer>
    </ReactModal>
  );
};
export default InsuranceModal;
