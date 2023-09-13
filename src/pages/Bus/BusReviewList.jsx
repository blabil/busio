import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  BasicHeader,
  BottomPanel,
  ButtonPanel,
  HeaderPanel,
  ReviewInfoModal,
  OpenModalPanelButton,
  PanelHeader,
  RegisterButton,
  ReturnButton,
  ReviewModal,
  TwoPartPanel,
  UpperPanel,
  BasicFullPanel,
} from "../../components";
import { BusEditService, UserService } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import createdAt from "../../data/createdAt.png";
import expiresAt from "../../data/expiresAt.png";
import positive from "../../data/positive.png";
import actual from "../../data/actual.png";

const BusReviewList = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [bus, setBus] = useState({});
  const [isReviewOpen, setIsReview] = useState(false);

  function handleOpenReview() {
    setIsReview(true);
  }
  function handleCloseReview() {
    setIsReview(false);
  }

  const [isReviewInfoOpen, setIsReviewInfo] = useState(false);
  const [activeReview, setActiveReview] = useState(null);
  const [userToModal, setUserToModal] = useState({});
  async function handleOpenInfoReview(review) {
    try {
      const user = await UserService.handleUserDetails(review.user_id);
      setUserToModal(user);
      setActiveReview(review);
      setIsReviewInfo(true);
    } catch (error) {
      triggerToast(error.message);
    }
  }
  function handleCloseInfoReview() {
    setIsReviewInfo(false);
    setActiveReview(null);
  }
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
    fetchReviewsDetails();
  }

  const fetchReviewsDetails = useCallback(async () => {
    const response = await BusEditService.handleReviewsDetails(id);
    setBus(response.bus);
    setReviews(response.busReviews);
  }, [id]);

  useEffect(() => {
    fetchReviewsDetails();
  }, [id, fetchReviewsDetails]);

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
        </HeaderPanel>

        <ButtonPanel label={"LISTA PRZEGLĄDÓW"}>
          <ReturnButton path={`/bus/edit/${id}`} />
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
        </ButtonPanel>
      </UpperPanel>

      <BottomPanel>
        <TwoPartPanel>
          <BasicFullPanel>
            <PanelHeader label={"PRZEGLĄDY"} />
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
          </BasicFullPanel>
        </TwoPartPanel>
      </BottomPanel>
      <ToastContainer />
    </div>
  );
};

export default BusReviewList;
