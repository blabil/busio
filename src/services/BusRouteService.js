import axios from "axios";
import ToastService from "./ToastService";
import { apiUrl } from "../data/dummy";

const BusRouteService = {
  fetchBusLineList: async () => {
    const response = await axios.get(`${apiUrl}/busline/all`, {
      withCredentials: true,
    });
    return response.data;
  },

  handleDeleteBusLine: async (id) => {
    await axios
      .delete(`${apiUrl}/busline/${id}`, { withCredentials: true })
      .then((response) => {
        return response.data.message;
      })
      .catch((error) => {
        throw new Error(
          ToastService.prepareToastMessage(error.response.data.message)
        );
      });
  },

  fetchStops: async () => {
    const response = await axios.get(`${apiUrl}/busstop/stops`, {
      withCredentials: true,
    });
    return response.data;
  },

  handleRegisterBusStop: async (address) => {
    try {
      const response = await axios.post(
        `${apiUrl}/busstop/register`,
        { address },
        { withCredentials: true }
      );
      return response.data.message;
    } catch (error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  /**
     * @typedef     { Object } BusLine
     * @property    { string } number
     * @property    { string } part
     * @property    { Array } pola
     * @property    { Array } czas
     */

    /**
     * Create a BusLine DTO.
     * @param       { BusLine } number - Numer linii autobusowej
     * @param       { BusLine } part - Odcinek na jakim znajduje sie linia
     * @param       { BusLine } pola - Tablica przystanków
     * @param       { BusLine } czas - Tablica czasu pomiędzy przystankami
     * @returns     { BusLine } BusLine DTO.
     */

  returnBusLineDto(number, part, pola, czas)
  {
    const busLineDto = {
        number: number,
        part: part,
        pola: pola,
        czas: czas,
      }
      return busLineDto;
  },

  /**
     * @typedef     { Object } Route
     * @property    { string } busLineID
     * @property    { string } startTime
     * @property    { string } time
     * @property    { string } type
     */

    /**
     * Create a Route DTO.
     * @param       { Route } busLineID - Numer linii autobusowej
     * @param       { Route } startTime - Godzina odjazdu
     * @param       { Route } time - Typ czasu trasy [HALF, FULL]
     * @param       { Route } type - Typ trasy [MONFRI, WEEK, WEEKEND, SPECIAL]
     * @returns     { Route } Route DTO.
     */

    returnRouteDto(busLineID, startTime, time, type)
    {
      const routeDto = {
        busLineID: busLineID,
        startTime: startTime,
        time: time,
        type: type,
      }
      return routeDto;
    },

  handleRegisterBusLine: async (dto) =>{
    try{
        const response = await axios.post(
            `${apiUrl}/busline/register`,
            dto ,
            { withCredentials: true }
          )
        return response.data.message;
    } catch(error) {
        throw new Error(
            ToastService.prepareToastMessage(error.response.data.message)
          );
    }
  },

  handleChangeTime: async(busStop_FromId, busStop_ToId) =>{
    const response = await axios.get(
        `${apiUrl}/busstop/${busStop_FromId}/${busStop_ToId}`,
        { withCredentials: true }
      )
    return response.data;
  },

  fetchBusLineDetails: async (id) =>{

    try{
      const response = await axios
      .get(`${apiUrl}/busline/${id}`, {
        withCredentials: true,
      })
      return response.data;
    } catch (error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  fetchBusLineRoutes: async (id) =>{

    try{
      const response = await axios
      .get(`${apiUrl}/route/getall/${id}`, {
        withCredentials: true,
      })
      return response.data.BusLineRoutes;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  handleDeleteRoute: async(routeID) =>{
    try{
      const response = await axios
      .delete(`${apiUrl}/route/route/${routeID}`, {
        withCredentials: true,
      })
      return response.data.message;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  handleCreateRoute: async (dto) =>{

    try{
      const response = await axios
      .post(
        `${apiUrl}/route/register`,
        dto,
        { withCredentials: true }
      )
      return response.data.message;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  fetchBusLineRoute: async (id) =>{
    try {
      const response = await axios
      .get(`${apiUrl}/route/getroute/${id}`, {
        withCredentials: true,
      })
      return response.data;
    } catch (error)
    {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  fetchBusLineRouteInfo: async (id) =>{

    try{
      const response = await axios
      .get(`${apiUrl}/route/getone/${id}`, {
        withCredentials: true,
      })
      return response.data;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  fetchDrivers: async (id) =>{
    try {
      const response = await axios.get(`${apiUrl}/worker/drivers/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  handleAssingDriverToRoute: async (routeID, driverID) =>{
    try{
      const response = await axios.patch(`${apiUrl}/worker/assign/${routeID}`, {driverID: driverID}, {
        withCredentials: true,
      })
      return response.data;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }

  },

  fetchBuses: async (id) =>{
    try {
      const response = await axios.get(`${apiUrl}/bus/buses/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  handleAssingBusToRoute: async (routeID, busID) =>{
    try{
      const response = await axios.patch(`${apiUrl}/bus/assign/${routeID}`, {busID: busID}, {
        withCredentials: true,
      })
      return response.data;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  fetchBusStop: async (id) =>{
    try{
      const response = await axios
      .get(`${apiUrl}/busstop/${id}`, {
        withCredentials: true,
      })
      return response.data.address;

    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  fetchBusLineByStop: async (id) =>{
    try{
      const response = await axios
      .get(`${apiUrl}/busstop/buslines/${id}`, {
        withCredentials: true,
      })
      return response.data.busLines;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  fetchStopConnections: async (id) =>{
    try{
      const response = await axios
      .get(`${apiUrl}/busstop/connections/${id}`, {
        withCredentials: true,
      })
      return response.data;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  handleUpdateBusStop: async (id, address) =>{
    try{
      const response =  await axios
      .patch(
        `${apiUrl}/busstop/${id}`,
        { address },
        { withCredentials: true }
      )
      return response.data.message;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  handleUpdateTimeConnection: async (id, connectionTime, busStopToID) =>{
    try{
      const response = await axios
      .patch(
        `${apiUrl}/busstop/updatetimeconnection/${id}`,
        { connectionTime, busStopToID},
        { withCredentials: true }
      )
      return response.data.message;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  fetchRoutesAssignedTo: async(id, type) => {
    try{
      const response = await axios.get(`${apiUrl}/route/assigned/${id}/${type}`, {withCredentials: true});
      return response.data;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  }
};
export default BusRouteService;
