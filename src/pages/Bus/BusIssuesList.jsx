import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BasicFullPanel,
  BasicHeader,
  BottomPanel,
  IssueModal,
  ButtonPanel,
  HeaderPanel,
  OpenModalPanelButton,
  PanelHeader,
  RegisterButton,
  ReturnButton,
  TwoPartPanel,
  UpperPanel,
  InfoIssueModal,
} from "../../components";
import { BusEditService, UserService } from "../../services";
import createdAt from "../../data/createdAt.png";
import { AiFillEdit } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";

const BusIssuesList = () => {
  const { id } = useParams();
  const [bus, setBus] = useState({});
  const [issues, setIssues] = useState([]);
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [confirmedId, setConfirmedId] = useState(null);

  const handleConfirmButton = async (id) => {
    if (confirmedId === id) {
      await BusEditService.handleSolveIssue(id);
      fetchIssuesDetails();
      setConfirmedId(null);
    } else {
      setConfirmedId(id);
    }
  };

  function handleOpenIssue() {
    setIsIssueOpen(true);
  }
  function handleCloseIssue() {
    setIsIssueOpen(false);
  }

  const [isIssueInfoOpen, setIsIssueInfo] = useState(false);
  const [activeIssue, setActiveIssue] = useState(null);
  const [userToModal, setUserToModal] = useState({});

  async function handleOpenInfoIssue(issue) {
    const user = await UserService.handleUserDetails(issue.user_id);
    setUserToModal(user);
    try {
      setActiveIssue(issue);
      setIsIssueInfo(true);
    } catch (error) {}
  }
  function handleCloseInfoIssue() {
    setIsIssueInfo(false);
    setActiveIssue(null);
    fetchIssuesDetails();
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
    fetchIssuesDetails();
  }

  const fetchIssuesDetails = useCallback(async () => {
    const response = await BusEditService.handleIssuesDetails(id);
    setBus(response.bus);
    setIssues(response.busIssues);
  }, [id]);

  useEffect(() => {
    fetchIssuesDetails();
  }, [id, fetchIssuesDetails]);

  return (
    <div className="flex flex-col gap-3 h-screen">
      <UpperPanel>
        <HeaderPanel>
          <BasicHeader label={"ID:"} value={bus.id} />
          <BasicHeader label={"REJSTRACJA:"} value={bus.registration} />
        </HeaderPanel>

        <ButtonPanel label={"LISTA USTEREK"}>
          <ReturnButton path={`/bus/edit/${id}`} />
          <RegisterButton onClick={handleOpenIssue} label={"Dodaj usterkę"} />
          <IssueModal
            onClick={handleOpenIssue}
            isOpen={isIssueOpen}
            onClose={handleCloseIssue}
            onSubmit={handleRegister}
            bus_id={id}
          />
        </ButtonPanel>
      </UpperPanel>

      <BottomPanel>
        <TwoPartPanel>
          <BasicFullPanel>
            <PanelHeader label={"USTERKI"} />
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
                {issues.map((issue) => (
                  <tr
                    key={issue.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {issue.id}
                    </th>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">{issue.title}</h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {issue.state === "UNSOLVED" ? (
                        <h1>NIE NAPRAWIONO</h1>
                      ) : (
                        <h1>NAPRAWIONO</h1>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {new Date(issue.createdAt).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleConfirmButton(issue.id)}>
                        {confirmedId === issue.id ? (
                          <GiConfirmed />
                        ) : (
                          <AiFillEdit />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <OpenModalPanelButton
                        onClick={() => handleOpenInfoIssue(issue)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <InfoIssueModal
              user={userToModal}
              onClose={handleCloseInfoIssue}
              isOpen={isIssueInfoOpen}
              data={activeIssue}
              registration={bus.registration}
            />
          </BasicFullPanel>
        </TwoPartPanel>
      </BottomPanel>
      <ToastContainer />
    </div>
  );
};
export default BusIssuesList;
