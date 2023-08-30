import React, { useEffect, useState, useCallback } from "react";
import ReactModal from "react-modal";
import { ModalContainer, SendButton } from "..";
import { Link } from "react-router-dom";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { BusEditService } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const InfoBreakDownModal = ({ onClose, isOpen, data, user, registration }) => {
  const [confirmedId, setConfirmedId] = useState(null);
  const [isRegisterModify, setIsRegisterModify] = useState(false);
  const [desc, setDesc] = useState("");
  const [modify, setModify] = useState([]);

  const handleModifyClick = () => {
    setIsRegisterModify((prevValue) => !prevValue);
  };

  const handleConfirmButton = async (id) => {
    if (confirmedId === id) {
      await BusEditService.handleSolveBreakDown(data.id);
      handleModifyBreakDownList(data.id);
      data.solvedAt = new Date();
      setConfirmedId(null);
    } else {
      setConfirmedId(id);
    }
  };

  const handleRegisterBreakDownModify = async () => {
    let response = null;
    try {
      response = await BusEditService.handleRegisterBreakDownModify(
        BusEditService.returnBreakDownModifyDto(desc, data.id)
      );
    } catch (err) {
      response = err;
    }
    triggerToast(response);
    handleModifyBreakDownList(data.id);
  };

  const handleModifyBreakDownList = useCallback(async (id) => {
    const response = await BusEditService.handleModifyBreakDownsList(id);
    setModify(response);
  }, []);

  const triggerToast = (message) => {
    toast(message, {
      autoClose: 5000,
      hideProgressBar: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  useEffect(() => {
    if (data) handleModifyBreakDownList(data.id);
  }, [data, user, handleModifyBreakDownList]);

  return data ? (
    <ReactModal
      className="flex items-center justify-center h-screen"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Informacje."
      appElement={document.getElementById("root")}
    >
      <ModalContainer onClick={onClose} label={`${data.title}`}>
        <div className="flex gap-8 items-center justify-center">
          <textarea className="py-2 px-2" readOnly value={data.desc}></textarea>
        </div>
        <div className="flex gap-8 items-center justify-center">
          <Link to={`/bus/edit/${data.bus_id}`}>
            <h1 className="uppercase font-bold border-b-4 border-black border-dotted hover:border-teal-400 hover:text-teal-400">
              {registration}
            </h1>
          </Link>
          {data.solvedAt ? (
            <h1 className="uppercase font-bold">
              Naprawiono:{" "}
              {new Date(data.solvedAt).toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h1>
          ) : (
            <div className="flex justify-center items-center gap-8">
              <button
                className="hover:color-teal-400"
                onClick={() => handleConfirmButton(data.id)}
              >
                {confirmedId === data.id ? <GiConfirmed /> : <AiFillEdit />}
              </button>

              <button onClick={handleModifyClick}>
                <AiOutlinePlus />
              </button>
            </div>
          )}
        </div>
        {isRegisterModify && (
          <div className="my-2 flex flex-col">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mx-4 mt-4 border-4 border-black"
            ></textarea>
            <div className="flex items-center justify-center my-2">
              <SendButton
                onClick={handleRegisterBreakDownModify}
                className="hover:color-teal-400"
              ></SendButton>
            </div>
          </div>
        )}
        <div>
          <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-4 text-center">
                  WYSTAWIŁ
                </th>
                <th scope="col" className="px-4 py-4 text-center">
                  OPIS
                </th>
              </tr>
            </thead>
            <tbody>
              {modify.map((element, index) => (
                <tr key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white w-2/6"
                  >
                    <TooltipComponent
                      content={new Date(element.modifyAt).toLocaleDateString(
                        "pl-PL",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                      position="Top"
                    >
                      <h1>
                        {element.user &&
                          element.user.profile &&
                          element.user.profile.fullName}
                      </h1>
                    </TooltipComponent>
                  </th>
                  <td className="px-6 py-4 text-center">
                    <h1>{element.desc}</h1>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </ModalContainer>
    </ReactModal>
  ) : null;
};

export default InfoBreakDownModal;
