import React from "react";
import ReactModal from "react-modal";
import { BasicHeader, ModalContainer, ModalElement } from "..";

import { Link } from "react-router-dom";

const ReviewInfoModal = ({ onClose, isOpen, data, user }) => {
  return data ? (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Informacje o przeglądzie."
      appElement={document.getElementById("root")}
    >
      <ModalContainer onClick={onClose} label={"Informacje o przeglądzie:"}>
        <ModalElement label={"ID: "} htmlFor={"Review-grid"}>
          <BasicHeader label={data.id} />
        </ModalElement>
        <ModalElement label={"Wyystawiono: "} htmlFor={"createdAt-grid"}>
          <BasicHeader
            label={new Date(data.createdAt).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
        </ModalElement>
        <ModalElement label={"Wygasa: "} htmlFor={"expiresAt-grid"}>
          <BasicHeader
            label={new Date(data.expiresAt).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
        </ModalElement>
        <ModalElement label={"Poyztywny: "} htmlFor={"positive-grid"}>
          {data.isPositive ? (
            <BasicHeader label={"TAK"} />
          ) : (
            <BasicHeader label={"NIE"} />
          )}
        </ModalElement>
        <ModalElement label={"Aktualny: "} htmlFor={"actual-grid"}>
          {data.isActuall ? (
            <BasicHeader label={"TAK"} />
          ) : (
            <BasicHeader label={"NIE"} />
          )}
        </ModalElement>
        <ModalElement label={"Wystawiający: "} htmlFor={"user-grid"}>
          <Link to={`/user/edit/${user.id}`}>
            <div className="flex w-auto">
              <h1 className="border-b-4 border-black border-dotted font-serif block uppercase text-blueGray-600 text-md font-bold w-auto hover:border-teal-400 hover:text-teal-400">
                {user.profile.fullName}
              </h1>
            </div>
          </Link>
        </ModalElement>
        <div className="w-full flex justify-center items-center">
          {data.additionalInfo && (
            <textarea
              className="w-full min-h-32 mx-4 my-4 border-4 px-4 py-2"
              value={data.additionalInfo}
              readOnly
            >
              {data.aditionalInfo}
            </textarea>
          )}
        </div>
      </ModalContainer>
    </ReactModal>
  ) : null;
};

export default ReviewInfoModal;
