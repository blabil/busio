import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BasicHeader,
  BasicPanel,
  BottomPanel,
  BreakDownModal,
  ButtonPanel,
  HeaderAvaiable,
  HeaderBroken,
  HeaderPanel,
  HeaderUnavaiable,
  InfoBreakDownModal,
  InfoIssueModal,
  IssueModal,
  OpenModalPanelButton,
  PanelHeader,
  RegisterButton,
  ReturnButton,
  ReviewInfoModal,
  ReviewModal,
  StatePanel,
  TwoPartPanel,
  UpperPanel,
} from "../../components";
import { BusEditService, UserService } from "../../services";
import createdAt from "../../data/createdAt.png";
import expiresAt from "../../data/expiresAt.png";
import positive from "../../data/positive.png";
import actual from "../../data/actual.png";

const BusEdit = () => {
  const { id } = useParams();
  const [bus, setBus] = useState({});
  const [busProfile, setBusProfile] = useState([]);
  const [issues, setIssues] = useState([]);
  const [breakDowns, setBreakDowns] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userToModal, setUserToModal] = useState({});

  const [isIssueOpen, setIsIssueOpen] = useState(false);
  function handleOpenIssue() {
    setIsIssueOpen(true);
  }
  function handleCloseIssue() {
    setIsIssueOpen(false);
  }

  const fetchDetails = async (type) => {
    if (type === "ISSUE") {
      const response = await BusEditService.handleIssuesDetails(id);
      setIssues(response.busIssues);
    }
    if (type === "BREAKDOWN") {
      const response = await BusEditService.handleBreakDownsDetails(id);
      setBreakDowns(response.busBreakDowns);
    }
    if (type === "REVIEW") {
      const response = await BusEditService.handleReviewsDetails(id);
      setReviews(response.busReviews);
    }
  };

  const [isBreakDownOpen, setIsBreakDownOpen] = useState(false);
  function handleOpenBreakDown() {
    setIsBreakDownOpen(true);
  }
  function handleCloseBreakDown() {
    setIsBreakDownOpen(false);
  }

  const [isReviewOpen, setIsReview] = useState(false);
  function handleOpenReview() {
    setIsReview(true);
  }
  function handleCloseReview() {
    setIsReview(false);
  }

  const [isReviewInfoOpen, setIsReviewInfo] = useState(false);
  const [activeReview, setActiveReview] = useState(null);
  async function handleOpenInfoReview(review) {
    const user = await UserService.handleUserDetails(review.user_id);
    setUserToModal(user);
    try {
      setActiveReview(review);
      setIsReviewInfo(true);
    } catch (error) {}
  }
  function handleCloseInfoReview() {
    setIsReviewInfo(false);
    setActiveReview(null);
  }

  const [isIssueInfoOpen, setIsIssueInfo] = useState(false);
  const [activeIssue, setActiveIssue] = useState(null);

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
    fetchDetails("ISSUE");
  }

  const [isBreakDownInfoOpen, setIsBreakDownInfo] = useState(false);
  const [activeBreakDown, setActiveBreakDown] = useState(null);

  async function handleOpenInfoBreakDown(breakDown) {
    const user = await UserService.handleUserDetails(breakDown.user_id);
    setUserToModal(user);
    try {
      setActiveBreakDown(breakDown);
      setIsBreakDownInfo(true);
    } catch (error) {}
  }
  function handleCloseInfoBreakDown() {
    setIsBreakDownInfo(false);
    setActiveBreakDown(null);
    fetchDetails("BREAKDOWN");
  }

  async function handleRegister(dto, type) {
    let response = null;
    try {
      response = await BusEditService.handleRegister(
        dto,
        type,
        BusEditService.getEndpointByTitle(type),
        BusEditService.checkMonthsDifference
      );
    } catch (error) {
      response = error.message;
    }
    triggerToast(response);
    if (type === "ISSUE") fetchDetails(type);
    if (type === "BREAKDOWN") fetchDetails(type);
    if (type === "REVIEW") fetchDetails(type);
  }

  const fetchBusDetails = useCallback(async () => {
    const response = await BusEditService.handleBusDetails(id);
    setBus(response.bus);
    setBusProfile(response.busProfile);
    setIssues(response.busIssues);
    setBreakDowns(response.busBreakDowns);
    setReviews(response.busReviews);
  }, [id]);

  useEffect(() => {
    fetchBusDetails();
  }, [id, fetchBusDetails]);

  const triggerToast = (message) => {
    toast(message, {
      autoClose: 5000,
      hideProgressBar: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <div className="flex flex-col gap-3 h-screen">
      <UpperPanel>
        <HeaderPanel>
          <BasicHeader label={"ID:"} value={bus.id} />
          <BasicHeader label={"REJSTRACJA:"} value={bus.registration} />
          <BasicHeader label={"SILNIK:"} value={busProfile.engine} />
          <BasicHeader label={"MARKA:"} value={busProfile.brand} />
          <BasicHeader label={"MODEL:"} value={busProfile.model} />
          <StatePanel>
            {bus.state === "AVAIABLE" ? (
              <HeaderAvaiable value={"DOSTĘPNY"} />
            ) : bus.state === "UNAVAIABLE" ? (
              <HeaderUnavaiable value={"NIEDOSTĘPNY"} />
            ) : bus.state === "BROKEN" ? (
              <HeaderBroken value={"ZEPSUTY"} />
            ) : (
              <HeaderUnavaiable value={"NIEDOSTĘPNY"} />
            )}
          </StatePanel>
        </HeaderPanel>

        <ButtonPanel label={"EDYCJA BUSA"}>
          <ReturnButton path={"/bus/list"} />
          <RegisterButton
            onClick={handleOpenReview}
            label={"Zarejestruj Przegląd"}
          />
          <ReviewModal
            onClick={handleOpenReview}
            isOpen={isReviewOpen}
            onClose={handleCloseReview}
            onSubmit={handleRegister}
            bus_id={id}
          />
          <RegisterButton onClick={handleOpenIssue} label={"Dodaj Usterkę"} />
          <IssueModal
            onClick={handleOpenIssue}
            isOpen={isIssueOpen}
            onClose={handleCloseIssue}
            onSubmit={handleRegister}
            bus_id={id}
          />
          <RegisterButton
            onClick={handleOpenBreakDown}
            label={"Dodaj Naprawę"}
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
          <BasicPanel>
            <PanelHeader
              label={"NAPRAWY"}
              path={`/bus/edit/breakdown/list/${id}`}
            />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    NAZWA
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
                    INFO
                  </th>
                </tr>
              </thead>
              <tbody>
                {breakDowns
                  .filter((breakDown) => breakDown.state === "UNSOLVED")
                  .slice(0, 5)
                  .map((breakDown) => (
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
                        {new Date(breakDown.createdAt).toLocaleDateString(
                          "pl-PL",
                          { day: "numeric", month: "long", year: "numeric" }
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
          </BasicPanel>

          <BasicPanel>
            <PanelHeader
              label={"Usterki"}
              path={`/bus/edit/issue/list/${id}`}
            />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    NAZWA
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
                    INFO
                  </th>
                </tr>
              </thead>
              <tbody>
                {issues
                  .filter((issue) => issue.state === "UNSOLVED")
                  .slice(0, 5)
                  .map((issue) => (
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
                        {new Date(issue.createdAt).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
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
          </BasicPanel>
        </TwoPartPanel>

        <TwoPartPanel>
          <BasicPanel>
            <PanelHeader
              label={"BADANIA TECHNICZNE"}
              path={`/bus/edit/review/list/${id}`}
            />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    ID
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
                  <th scope="col" className="flex-1 px-4 py-4">
                    <div className="flex items-center justify-center">
                      <TooltipComponent content="Wygasa" position="Top-center">
                        <img
                          src={expiresAt}
                          alt="ExpiresAt"
                          className="h-4 w-4"
                        />
                      </TooltipComponent>
                    </div>
                  </th>
                  <th scope="col" className="flex-1 px-4 py-4">
                    <div className="flex items-center justify-center">
                      <TooltipComponent content="Poyzytywny" position="Top">
                        <img
                          src={positive}
                          alt="IsPositve"
                          className="h-4 w-4"
                        />
                      </TooltipComponent>
                    </div>
                  </th>
                  <th scope="col" className="flex-1 px-4 py-4">
                    <div className="flex items-center justify-center">
                      <TooltipComponent content="Aktualny" position="Top">
                        <img src={actual} alt="Actual" className="h-4 w-4" />
                      </TooltipComponent>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    INFO
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.slice(0, 5).map((review) => (
                  <tr
                    key={review.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {review.id}
                    </th>
                    <td className="px-6 py-4 text-center">
                      {new Date(review.createdAt).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {new Date(review.expiresAt).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {review.isPositive ? (
                        <h1 className="text-bold text-green-600">TAK</h1>
                      ) : (
                        <h1 className="text-bold text-red-600">NIE</h1>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {review.isActuall ? (
                        <h1 className="text-bold text-green-600">TAK</h1>
                      ) : (
                        <h1 className="text-bold text-red-600">NIE</h1>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <OpenModalPanelButton
                        onClick={() => handleOpenInfoReview(review)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReviewInfoModal
              user={userToModal}
              onClose={handleCloseInfoReview}
              isOpen={isReviewInfoOpen}
              data={activeReview}
            />
          </BasicPanel>

          <BasicPanel>
            <PanelHeader label={"ubezpieczenie"} />
          </BasicPanel>
        </TwoPartPanel>
      </BottomPanel>
      <ToastContainer />
    </div>
  );
};

export default BusEdit;
