import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusRouteService from "../../services/BusRouteService";
import {
  IssueModal,
  BreakDownModal,
  BasicFullPanel,
  BasicHeader,
  BasicPanel,
  BottomPanel,
  ButtonPanel,
  HeaderPanel,
  PanelHeader,
  RegisterButton,
  ReturnButton,
  TwoPartPanel,
  UpperPanel,
} from "../../components";
import { BusEditService } from "../../services";

const DriverRouteInfo = () => {
    const { id } = useParams();
    const [routeInfo, setRouteInfo] = useState({});
    const [route, setRoute] = useState([]);
  
    const [isBreakDownOpen, setIsBreakDownOpen] = useState(false);
    function handleOpenBreakDown() {
        setIsBreakDownOpen(true);
    }
    function handleCloseBreakDown() {
        setIsBreakDownOpen(false);
    }

    const [isIssueOpen, setIsIssueOpen] = useState(false);
    function handleOpenIssue() {
      setIsIssueOpen(true);
    }
    function handleCloseIssue() {
      setIsIssueOpen(false);
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
      }
  
    const returnTypeValue = (type) => {
      switch (type) {
        case "MONFRI":
          return <BasicHeader label={"TYP:"} value={"PON - PIĄ"} />;
        case "WEEK":
          return <BasicHeader label={"TYP:"} value={"PON - NIE"} />;
        case "WEEKEND":
          return <BasicHeader label={"TYP:"} value={"SOB - NIE"} />;
        case "SPECIAL":
          return <BasicHeader label={"TYP:"} value={"SPECJALNA"} />;
        default:
          return "NIEWIEM";
      }
    };
  
    const returnTimeTypeValue = (type) => {
      switch (type) {
        case "FULL":
          return <BasicHeader label={"DŁUGOŚĆ:"} value={"2-STRONNA"} />;
        case "HALF":
          return <BasicHeader label={"DŁUGOŚĆ:"} value={"1-STRONNA"} />;
        default:
          return "NIEWIEM";
      }
    };
  
    const fetchBuslineRouteInfo = useCallback(async () => {
      try {
        const response = await BusRouteService.fetchBusLineRouteInfo(id);
        setRouteInfo(response);
      } catch (error) {
        triggerToast(error.message);
      }
    }, [id]);
  
    const fetchBusLineRoute = useCallback(async () => {
      try {
        const response = await BusRouteService.fetchBusLineRoute(id);
        setRoute(response);
      } catch (error) {
        triggerToast(error.message);
      }
    }, [id]);
  
    const triggerToast = (message) => {
      toast(message, {
        autoClose: 5000,
        hideProgressBar: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    };
  
    useEffect(() => {
      fetchBuslineRouteInfo();
      fetchBusLineRoute();
    }, [fetchBuslineRouteInfo, fetchBusLineRoute]);
    return (
      <div className="flex flex-col gap-3 h-screen">
        <UpperPanel>
          <HeaderPanel>
            <BasicHeader label={"LINIA:"} value={routeInfo.busLineNumber} />
            <BasicHeader label={"START:"} value={routeInfo.startTime} />
            {returnTypeValue(routeInfo.routeType)}
            {returnTimeTypeValue(routeInfo.routetime)}
          </HeaderPanel>
          <ButtonPanel label={"INFORMACJE O TRASIE"}>
            <ReturnButton path={`/driver/route/`} />
            {routeInfo.bus ? (
                <div>
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
                </div>
            ) : null}
            
          </ButtonPanel>
        </UpperPanel>
        <BottomPanel>
          <TwoPartPanel>
            <BasicPanel>
              <PanelHeader label={"INFORMACJE O KIEROWCY"} />
              {routeInfo.driver ? (
                <div className="flex flex-col justify-content items-center">
                    <BasicHeader label={"Kierowca:"} value={routeInfo.driver.profile.fullName} />
                  <BasicHeader
                    label={"Telefon:"}
                    value={routeInfo.driver.profile.phone}
                  />
                  <BasicHeader label={"Email:"} value={routeInfo.driver.email} />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {" "}
                  Nie przypisano.{" "}
                </div>
              )}
            </BasicPanel>
            <BasicPanel>
              <PanelHeader label={"INFORMACJE O BUSIE"} />
              {routeInfo.bus ? (
                <div className="flex flex-col justify-content items-center">
                    <BasicHeader label={"Rejestracja:"} value={routeInfo.bus.registration}/>
                    <BasicHeader
                        label={"Pojazd:"}
                        value={
                        routeInfo.bus.busProfile.brand +
                        " " +
                        routeInfo.bus.busProfile.model
                        }
                    />
                    <BasicHeader
                        label={"Ilość miejsca:"}
                        value={routeInfo.bus.busProfile.seats}
                    />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {" "}
                  Nie przypisano.{" "}
                </div>
              )}
            </BasicPanel>
          </TwoPartPanel>
          <TwoPartPanel>
            <BasicFullPanel>
              <PanelHeader label={"PRZYSTANKI"} />
              <div className="flex flex-col justify-center">
                {route.map((element, index) => (
                  <div
                    key={index}
                    className="flex w-1/2 justify-center items-center"
                  >
                    <h1 className="w-1/2 mx-8 my-4">{element.busStop} : </h1>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {" "}
                      {element.time}{" "}
                    </span>
                  </div>
                ))}
              </div>
            </BasicFullPanel>
          </TwoPartPanel>
        </BottomPanel>
        <ToastContainer />
      </div>
    );
}

export default DriverRouteInfo