import axios from "axios";
import ToastService from "./ToastService";
import { apiUrl } from "../data/dummy";

const UserService = {
  /**
   * @typedef     { Object } User
   * @property    { string } email
   * @property    { string } password
   * @property    { string } name
   * @property    { string } surname
   * @property    { string } phone
   * @property    { string } address
   * @property    { string } role
   */

  /**
   * Create a User DTO.
   * @returns     { User } The user DTO.
   */

  returnUserDto(email, fullName, phone, password, role, address) {
    const userDto = {
      email: email,
      fullName: fullName,
      phone: phone,
      password: password,
      role: role,
      address: address,
    };
    return userDto;
  },

  handleUserDetails: async (id) => {
    const response = await axios.get(`${apiUrl}/users/${id}`, {
      withCredentials: true,
    });
    return response.data;
  },

  handleWorkerDetails: async (id) => {
    const response = await axios.get(`${apiUrl}/worker/${id}`, {
      withCredentials: true,
    });
    return response.data;
  },

  getWorkers: async () => {
    const response = await axios.get(`${apiUrl}/worker`, {
      withCredentials: true,
    });
    return response.data;
  },

  handleRegisterUser: async (dto) => {
    try{
        const response = await axios.post(
            `${apiUrl}/auth/signup`,
            dto,
            { withCredentials: true }
          );
          return response.data.message;
    }catch(error){
        throw new Error(
            ToastService.prepareToastMessage(error.response.data.message)
          );
    }
  },

  fetchMechanicInfoData: async (id, type, signal) =>{
    if(type === "BREAKDOWN")
    {
        const response = await axios.get(`${apiUrl}/breakdown/mechanic/${id}`, 
        { withCredentials: true, signal });
        return response.data;
    }
    if(type === "ISSUE")
    {
        const response = await axios.get(`${apiUrl}/issue/mechanic/${id}`, 
        { withCredentials: true, signal });
        return response.data;
    }
  },

  fetchUserProblemsData: async (id, type) =>{
    if(type === "BREAKDOWN")
    {
        const response = await axios.get(`${apiUrl}/breakdown/user/${id}`, 
        { withCredentials: true });
        return response.data;
    }
    if(type === "ISSUE")
    {
        const response = await axios.get(`${apiUrl}/issue/user/${id}`, 
        { withCredentials: true });
        return response.data;
    }
  },

  fetchUserModifyData: async (id, type) =>{
    if(type === "BREAKDOWN")
    {
        const response = await axios.get(`${apiUrl}/breakdown/user/modify/${id}`, 
        { withCredentials: true });
        return response.data;
    }
    if(type === "ISSUE")
    {
        const response = await axios.get(`${apiUrl}/issue/user/modify/${id}`, 
        { withCredentials: true });
        return response.data;
    }
  },

  fetchUserReviewsData: async (id) =>{
    const response = await axios.get(`${apiUrl}/review/user/${id}`, 
    { withCredentials: true });
    return response.data;
  }
};

export default UserService;
