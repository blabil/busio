import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BasicFullPanel,
  BasicHeader,
  BottomPanel,
  ButtonPanel,
  HeaderPanel,
  NavigateHref,
  PanelHeader,
  ReturnButton,
  TwoPartPanel,
  UpperPanel,
} from "../../components";
import { BusEditService, UserService } from "../../services";
import BusRouteService from "../../services/BusRouteService";

const RouteList = () => {
  const { id, type } = useParams();
  const [data, setData] = useState({});
  const [routeList, setRouteList] = useState([]);

  const returnHeaderByType = () => {
    if (type === "bus")
      return <BasicHeader label={"BUS:"} value={data.registration} />;
    if (type === "user")
      return <BasicHeader label={"UŻTYKOWNIK:"} value={data.profile?.fullName} />

  };

  const returnButtonByType = () => {
    if (type === "bus") return <ReturnButton path={`/bus/edit/${data.id}`} />;
    if (type === "user") return <ReturnButton path={`/user/type/${data.id}`} />;
  };

  const returnTypeValue = (type) => {
    switch (type) {
      case "MONFRI":
        return <h1 className="text-bold">PON - PIĄ</h1>;
      case "WEEK":
        return <h1 className="text-bold">PON - NIE</h1>;
      case "WEEKEND":
        return <h1 className="text-bold">SOB - NIE</h1>;
      case "SPECIAL":
        return <h1 className="text-bold">SPECJALNA</h1>;
      default:
        return "NIEWIEM";
    }
  };

  const fetchObjectData = useCallback(async () => {
    let response = null;
    try {
      if (type === "bus") {
        response = await BusEditService.fetchBusProfile(id);
      } else {
        response = await UserService.handleUserDetails(id);
      }
      setData(response);
    } catch (error) {
      triggerToast(error.message);
    }
  }, [id]);

  const fetchRoutes = useCallback(async () => {
    try {
      const response = await BusRouteService.fetchRoutesAssignedTo(id, type);
      setRouteList(response);
    } catch (error) {
      triggerToast(error.message);
    }
  }, [id, type]);

  const triggerToast = (message) => {
    toast(message, {
      autoClose: 5000,
      hideProgressBar: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  useEffect(() => {
    fetchObjectData();
    fetchRoutes();
  }, [fetchObjectData, fetchRoutes]);

  return routeList && data ? (
    <div className="flex flex-col gap-3 h-screen">
      <UpperPanel>
        <HeaderPanel>{returnHeaderByType()}</HeaderPanel>
        <ButtonPanel label={"LISTA TRAS"}>{returnButtonByType()}</ButtonPanel>
      </UpperPanel>
      <BottomPanel>
        <TwoPartPanel>
          <BasicFullPanel>
            <PanelHeader label={"TRASY"} />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-4 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    LINIA
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    TRASA
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    START
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    TYP
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    2-STRONNA
                  </th>

                </tr>
              </thead>
              <tbody>
                {routeList.map(( route) => (
                  <tr
                    key={route.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        #{route.id}
                      </th>
                    <td className="px-6 py-4 text-center">
                        <NavigateHref label={route.busLine.number} path={`/busline/edit/${route.busLine_id}`}/>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <NavigateHref label={'klik'} path={`/busroute/edit/${route.id}`}/>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <h1 className="text-bold">{route.startTime}</h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                    {returnTypeValue(route.type)}
                    </td>
                    <td className="px-6 py-4 text-center">
                    {route.time === "FULL" ? (<h1 className="text-bold">TAK</h1>) : (<h1 className="text-bold">NIE</h1>)}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </BasicFullPanel>
        </TwoPartPanel>
      </BottomPanel>
      <ToastContainer />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default RouteList;
