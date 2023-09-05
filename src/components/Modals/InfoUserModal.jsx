import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactModal from "react-modal";
import { ModalContainer } from "..";
import { Link } from "react-router-dom";
import { UserService } from "../../services";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const InfoUserModal = ({ onClose, isOpen, id, type }) => {
  const [data, setData] = useState([]);
  const [bus, setBus] = useState({});
  const [modify, setModify] = useState([]);

  const abortController = useMemo(() => new AbortController(), []);

  const fetchData = useCallback(async () => {
    try {
      const response = await UserService.fetchMechanicInfoData(
        id,
        type,
        abortController.signal
      );
      setData(response.data);
      setBus(response.data.bus);
      setModify(response.modifyList);
    } catch (error) {}
  }, [id, type, abortController.signal]);

  useEffect(() => {
    if (id) fetchData();

    return () => {
      abortController.abort();
    };
  }, [id, abortController, fetchData]);

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
          <Link to={`/bus/edit/${bus.id}`}>
            <h1 className="uppercase font-bold border-b-4 border-black border-dotted hover:border-teal-400 hover:text-teal-400">
              {bus.registration}
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
            <h1 className="uppercase font-bold">Nie naprawiono:</h1>
          )}
        </div>
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
      </ModalContainer>
    </ReactModal>
  ) : null;
};

export default InfoUserModal;
