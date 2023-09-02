import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BusRouteService from '../../services/BusRouteService';
import { AssignBusRouteModal ,AssignDriverRouteModal, BasicFullPanel, BasicHeader, BasicPanel, BottomPanel, ButtonPanel, HeaderPanel, NavigateHref, PanelHeader, RegisterButton, ReturnButton, TwoPartPanel, UpperPanel } from '../../components';
const BusRouteEdit = () => {

    const { id } = useParams();
    const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
    const [isBusModalOpen, setIsBusModalOpen] = useState(false);
    const [routeInfo, setRouteInfo] = useState({});
    const [route, setRoute] = useState([]);

    function handleDriverOpenModal() {
      setIsDriverModalOpen(true);
    }
    function handleDriverCloseModal() {
      setIsDriverModalOpen(false);
    }

    const handleAssignDriverRoute = async (driverID) =>{
      let response = null;
      try{
        const temp = await BusRouteService.handleAssingDriverToRoute(id, driverID);
        setRouteInfo({
          ...routeInfo,
          driver: temp.driver
        })
        response = temp.message;
      } catch (error){
        response = error.message;
      }
      triggerToast(response);
    }


    function handleBusOpenModal() {
      setIsBusModalOpen(true);
    }
    function handleBusCloseModal() {
      setIsBusModalOpen(false);
    }

    const handleAssignBusRoute = async (busID) =>{
      let response = null;
      try{
        const temp =  await BusRouteService.handleAssingBusToRoute(id, busID);
        setRouteInfo({
          ...routeInfo,
          bus: temp.bus
        })
        response = temp.message;
      } catch (error){
        response = error.message;
      }
      triggerToast(response);
    }

    const returnTypeValue = (type) =>{
      switch(type)
      {
        case "MONFRI":
          return <BasicHeader label={"TYP:"} value={"PON - PIĄ"} />
        case "WEEK":
            return <BasicHeader label={"TYP:"} value={"PON - NIE"} />
        case "WEEKEND":
          return <BasicHeader label={"TYP:"} value={"SOB - NIE"} />
        case "SPECIAL":
          return <BasicHeader label={"TYP:"} value={"SPECJALNA"} />
        default:
          return "NIEWIEM"
      }
    }

    const returnTimeTypeValue = (type) =>{
      switch(type)
      {
        case "FULL":
          return <BasicHeader label={"DŁUGOŚĆ:"} value={"2-STRONNA"} />
        case "HALF":
            return <BasicHeader label={"DŁUGOŚĆ:"} value={"1-STRONNA"} />
        default:
          return "NIEWIEM"
      }
    }

    useEffect(() => {
      console.log(routeInfo.driver, routeInfo.bus)
    }, [routeInfo])
    
  const fetchBuslineRouteInfo = useCallback(async () => {
     try{
      const response = await BusRouteService.fetchBusLineRouteInfo(id);
      setRouteInfo(response);
     } catch(error) {
      triggerToast(error.message)
     }
  }, [id]);

  const fetchBusLineRoute = useCallback(async () => {
   try{
    const response = await BusRouteService.fetchBusLineRoute(id);
    setRoute(response);
   } catch(error) {
    triggerToast(error.message);
   }
  },[id]);

  const triggerToast = (message) => {
    toast(message, {
      autoClose: 5000,
      hideProgressBar: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  useEffect(() =>{
    fetchBuslineRouteInfo();
    fetchBusLineRoute();
  },[fetchBuslineRouteInfo, fetchBusLineRoute])
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
          <ReturnButton  path={`/busline/edit/${routeInfo.busLineID}`}/>
          <RegisterButton label={"Przypisz kierowce"} onClick={handleDriverOpenModal}/>
          <AssignDriverRouteModal
            onClose={handleDriverCloseModal}
            isOpen={isDriverModalOpen}
            onSubmit={handleAssignDriverRoute}
            routeID={id}
          />
          <RegisterButton label={"Przypisz busa"} onClick={handleBusOpenModal}/>
          <AssignBusRouteModal
            onClose={handleBusCloseModal}
            isOpen={isBusModalOpen}
            onSubmit={handleAssignBusRoute}
            routeID={id}
          />
        </ButtonPanel>
      </UpperPanel>
      <BottomPanel>
        <TwoPartPanel>
          <BasicPanel>
            <PanelHeader label={"INFORMACJE O KIEROWCY"} />
            {routeInfo.driver ? (
            <div className='flex flex-col justify-content items-center'>
              <NavigateHref label={`Kierowca: ${routeInfo.driver.profile.fullName}`} path={`/user/type/${routeInfo.driver.id}`}></NavigateHref>
              <BasicHeader label={"Telefon:"} value={routeInfo.driver.profile.phone}/>
              <BasicHeader label={"Email:"} value={routeInfo.driver.email}/>
            </div>
            ) : (<div className='flex items-center justify-center'> Nie przypisano. </div>)}
            
          </BasicPanel>
          <BasicPanel>
            <PanelHeader label={"INFORMACJE O BUSIE"} />
            {routeInfo.bus ? (
            <div className='flex flex-col justify-content items-center'>
              <NavigateHref label={`Rejestracja: ${routeInfo.bus.registration}`} path={`/bus/edit/${routeInfo.bus.id}`}></NavigateHref>
              <BasicHeader label={"Pojazd:"} value={routeInfo.bus.busProfile.brand +" "+ routeInfo.bus.busProfile.model} />
              <BasicHeader label={"Ilość miejsca:"} value={routeInfo.bus.busProfile.seats} />

            </div>
            ) : (<div className='flex items-center justify-center'> Nie przypisano. </div>)}
          </BasicPanel>
        </TwoPartPanel>
        <TwoPartPanel>
          <BasicFullPanel>
            <PanelHeader label={"PRZYSTANKI"}/>
            <div className="flex flex-col justify-center">
            {route.map((element, index) =>(
              <div key={index} className='flex w-1/2 justify-center items-center'>
              <h1 className="w-1/2 mx-8 my-4">{element.busStop}   : </h1>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"> {element.time} </span>
              </div>
            ))}
          </div>
          </BasicFullPanel>
        </TwoPartPanel>
      </BottomPanel>
      <ToastContainer />
    </div>
  )
}

export default BusRouteEdit