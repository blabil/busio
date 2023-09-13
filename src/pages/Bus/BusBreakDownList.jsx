import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BasicFullPanel,
  BasicHeader,
  BottomPanel,
  BreakDownModal,
  ButtonPanel,
  HeaderPanel,
  InfoBreakDownModal,
  OpenModalPanelButton,
  PanelHeader,
  RegisterButton,
  ReturnButton,
  TwoPartPanel,
  UpperPanel,
} from "../../components";
import { BusEditService, UserService } from "../../services";
import createdAt from "../../data/createdAt.png";
import { AiFillEdit } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";

const BusBreakDownList = () => {
  const { id } = useParams();
  const [bus, setBus] = useState({});
  const [breakDowns, setBreakDowns] = useState([]);
  const [isBreakDownOpen, setIsBreakDownOpen] = useState(false);
  const [confirmedId, setConfirmedId] = useState(null);

  const handleConfirmButton = async (id) => {
    if (confirmedId === id) {
      await BusEditService.handleSolveBreakDown(id);
      fetchBreakDownsDetails();
      setConfirmedId(null);
      setConfirmedId(null);
    } else {
      setConfirmedId(id);
    }
  };

  function handleOpenBreakDown() {
    setIsBreakDownOpen(true);
  }
  function handleCloseBreakDown() {
    setIsBreakDownOpen(false);
  }

  const [isBreakDownInfoOpen, setIsBreakDownInfo] = useState(false);
  const [activeBreakDown, setActiveBreakDown] = useState(null);
  const [userToModal, setUserToModal] = useState({});

  async function handleOpenInfoBreakDown(breakDown) {
    try {
      const user = await UserService.handleUserDetails(breakDown.user_id);
      setUserToModal(user);
      setActiveBreakDown(breakDown);
      setIsBreakDownInfo(true);
    } catch (error) {
      triggerToast(error.message);
    }
  }
  function handleCloseInfoBreakDown() {
    setIsBreakDownInfo(false);
    setActiveBreakDown(null);
    fetchBreakDownsDetails();
  }

  const triggerToast = (message) => {
    toast(message, {
      autoClose: 5000,
      hideProgressBar: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  async function handleRegister(dto, type) {
    try {
      const response = await BusEditService.handleRegister(
        dto,
        type,
        BusEditService.getEndpointByTitle(type),
        BusEditService.checkMonthsDifference
      );
      triggerToast(response);
    } catch (error) {
      triggerToast(error.message);
    }
    fetchBreakDownsDetails();
  }

  const fetchBreakDownsDetails = useCallback(async () => {
    try {
      const response = await BusEditService.handleBusDetails(id);
      setBus(response.bus);
      setBreakDowns(response.busBreakDowns);
    } catch (error) {
      triggerToast(error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchBreakDownsDetails();
  }, [id, fetchBreakDownsDetails]);

  return (
    <div className="flex flex-col gap-3 h-screen">
      <UpperPanel>
        <HeaderPanel>
          <BasicHeader label={"ID:"} value={bus.id} />
          <BasicHeader label={"REJSTRACJA:"} value={bus.registration} />
        </HeaderPanel>

        <ButtonPanel label={"LISTA NAPRAW"}>
          <ReturnButton path={`/bus/edit/${id}`} />
          <RegisterButton
            onClick={handleOpenBreakDown}
            label={"Dodaj naprawę"}
          />
          <BreakDownModal
            onClick={handleOpenBreakDown}
            isOpen={isBreakDownOpen}
            onClose={handleCloseBreakDown}
            onSubmit={handleRegister}
            bus_id={id}
          />
        </ButtonPanel>
      </UpperPanel>

      <BottomPanel>
        <TwoPartPanel>
          <BasicFullPanel>
            <PanelHeader label={"NAPRAWY"} />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    NAZWA
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    STAN
                  </th>
                  <th scope="col" className="flex-1 px-4 py-4">
                    <div className="flex items-center justify-center">
                      <TooltipComponent content="Wystawiono" position="Top">
                        <img
                          src={createdAt}
                          alt="CreatedAt"
                          className="h-4 w-4"
                        />
                      </TooltipComponent>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    AKTUALIZACJA
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    INFO
                  </th>
                </tr>
              </thead>
              <tbody>
                {breakDowns.map((breakDown) => (
                  <tr
                    key={breakDown.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {breakDown.id}
                    </th>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">{breakDown.title}</h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {breakDown.state === "UNSOLVED" ? (
                        <h1>NIE NAPRAWIONO</h1>
                      ) : (
                        <h1>NAPRAWIONO</h1>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {new Date(breakDown.createdAt).toLocaleDateString(
                        "pl-PL",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                    {breakDown.state === "UNSOLVED" ? (
                        <button onClick={() => handleConfirmButton(breakDown.id)}>
                        {confirmedId === breakDown.id ? (
                          <GiConfirmed />
                        ) : (
                          <AiFillEdit />
                        )}
                        </button>
                      ) : (
                        <button disabled>
                        {confirmedId === breakDown.id ? (
                          <GiConfirmed />
                        ) : (
                          <AiFillEdit />
                        )}
                      </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <OpenModalPanelButton
                        onClick={() => handleOpenInfoBreakDown(breakDown)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <InfoBreakDownModal
              user={userToModal}
              onClose={handleCloseInfoBreakDown}
              isOpen={isBreakDownInfoOpen}
              data={activeBreakDown}
              registration={bus.registration}
            />
          </BasicFullPanel>
        </TwoPartPanel>
      </BottomPanel>
      <ToastContainer />
    </div>
  );
};

export default BusBreakDownList;
