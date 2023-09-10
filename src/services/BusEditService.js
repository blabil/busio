import axios from 'axios';
import ToastService from './ToastService';
import { apiUrl } from '../data/dummy';

const BusEditService = {
  endpointMap: {
    ISSUE: `${apiUrl}/issue`,
    BREAKDOWN: `${apiUrl}/breakdown`,
    REVIEW: `${apiUrl}/review`,
    INSURANCE: `${apiUrl}/insurance`,
  },

  getEndpointByTitle(title) {
    return this.endpointMap[title] || null;
  },



  /**
     * @typedef     { Object } Bus
     * @property    { string } registration
     * @property    { string } state
     * @property    { string } brand
     * @property    { string } model
     * @property    { string } productionYear
     * @property    { string } seats
     * @property    { string } engine
     */

    /**
     * Create a Bus DTO.
     * @param       { Bus } registration - Rejestracja
     * @param       { Bus } state - Stan pojazdu
     * @param       { Bus } brand - Marka pojazdu
     * @param       { Bus } model - Model pojazdu
     * @param       { Bus } productionYear - Rok produkcji
     * @param       { Bus } seats - Ilośc miejssc
     * @param       { Bus } engine - Typ silnika
     * @returns     { Bus } The Bus DTO.
     */

    returnBusDto(registration, state, brand, model, productionYear, seats, engine)
    {
      const busDto = {
        registration: registration,
        state: state,
        brand: brand,
        model: model,
        productionYear: productionYear,
        seats: seats,
        engine: engine,
      }
      return busDto;
    },

    handleRegisterBus: async (busDto) => {
        try{
          const response =  await axios
          .post(
            `${apiUrl}/bus/register`,
            busDto,
            { withCredentials: true }
          )
          return response.data.message;
        }catch(error)
        {
          throw new Error(
            ToastService.prepareToastMessage(error.response.data.message)
          );
        }
    },





  /**
   * @typedef     { Object } Review
   * @property    { boolean } isPositive
   * @property    { string } createdAt
   * @property    { string | undefined } expiresAt
   * @property    { string | undefined } additionalInfo
   * @property    { string } bus_id
   */

  /**
   * Create a Review DTO.
   * @param       { Review } review - The review data.
   * @returns     { Review } The review DTO.
   */

  returnReviewDto(isPositive, createdAt, expiresAt, additionalInfo, bus_id) {
    const reviewData = {
      isPositive: isPositive,
      createdAt: createdAt,
      bus_id: bus_id,
    };

    const reviewDto = this.createReviewDto(
      reviewData,
      expiresAt,
      additionalInfo
    );
    return reviewDto;
  },

  createReviewDto(review, expiresAt, additionalInfo) {
    const dto = {
      ...review,
      expiresAt: review.isPositive ? expiresAt : undefined,
      additionalInfo: review.isPositive ? undefined : additionalInfo,
    };
    return dto;
  },

  checkMonthsDifference(createdAt, expiresAt) {
    const monthDifference =
      (expiresAt.getFullYear() - createdAt.getFullYear()) * 12 +
      (expiresAt.getMonth() - createdAt.getMonth());
    return monthDifference >= 12 && monthDifference <= 13;
  },

  /**
   * @typedef     { Object } Issue
   * @property    { string } title
   * @property    { string } desc
   * @property    { string } bus_id
   */

  /**
   * Create a Issue DTO.
   * @returns     { Issue } The Issue DTO.
   */

  returnIssueDto(title, desc, bus_id) {
    const issueDto = {
      title: title,
      desc: desc,
      bus_id: bus_id,
    };
    return issueDto;
  },


  /**
   * @typedef     { Object } Insurance
   * @property    { string } company
   * @property    { number } price
   * @property    { string | undefined } createdAt
   * @property    { string | undefined } expiresAt
   * @property    { string } bus_id
   */

  /**
   * Create a Insurance DTO.
   * @returns     { Insurance } The Insurance DTO.
   * @param       { Insurance } company - Firma ubezpieczająca
   * @param       { Insurance } state - Cena ubezpieczenia
   * @param       { Insurance } createdAt - Data wystawienia
   * @param       { Insurance } expiresAt - Data wygaśnięcia
   * @param       { Insurance } bus_id - ID busa
   */

  returnInsuranceDto(company, price, createdAt, expiresAt, bus_id) {
    const insuranceDto = {
      company: company,
      price: price,
      createdAt: createdAt,
      expiresAt: expiresAt,
      bus_id: bus_id
    };
    return insuranceDto;
  },

  /**
   * @typedef     { Object } BreakDownModify
   * @property    { string } desc
   * @property    { number } issue_id
   */

  /**
   * Create a IssueModify DTO.
   * @returns     { BreakDownModify } The IssueModify DTO.
   */

  returnBreakDownModifyDto(desc, breakDown_id) {
    const breakDownModifyDto = {
      desc: desc,
      breakDown_id: breakDown_id,
    };
    return breakDownModifyDto;
  },

  /**
   * @typedef     { Object } IssueModify
   * @property    { string } desc
   * @property    { number } issue_id
   */

  /**
   * Create a IssueModify DTO.
   * @returns     { IssueModify } The IssueModify DTO.
   */

  returnIssueModifyDto(desc, issue_id) {
    const issueModifyDto = {
      desc: desc,
      issue_id: issue_id,
    };
    return issueModifyDto;
  },

  /**
   * @typedef     { Object } BreakDown
   * @property    { string } title
   * @property    { string } desc
   * @property    { string } bus_id
   */

  /**
   * Create a BreakDown DTO.
   * @returns     { BreakDown } The BreakDown DTO.
   */

  returnBreakDownDto(title, desc, bus_id) {
    const BreakDownDto = {
      title: title,
      desc: desc,
      bus_id: bus_id,
    };
    return BreakDownDto;
  },

  handleRegister: async (dto, type, endpoint, checkMonthsDifference) => {
    if (type === `REVIEW`)
      if (dto.isPositive)
        if (!checkMonthsDifference(dto.createdAt, dto.expiresAt))
          throw new Error(`Niezgodność daty przeglądu.`);
    try {
      const response = await axios.post(endpoint, dto, {
        withCredentials: true,
      });
      return response.data.message;
    } catch (error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  handleBusDetails: async (id) => {
    const response = await axios.get(`${apiUrl}/bus/${id}`, {
      withCredentials: true,
    });
    return {
      bus: response.data,
      busProfile: response.data.busProfile,
      busIssues: response.data.busIssues,
      busBreakDowns: response.data.busBreakDowns,
      busReviews: response.data.busReview,
      busRoutes: response.data.busLineRoute,
    };
  },

  fetchBusProfile: async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/bus/profile/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch(error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },


  handleRegisterIssueModify: async (dto) => {
    try {
      const response = await axios.post(
        `${apiUrl}/issue/modify`,
        dto,
        { withCredentials: true }
      );
      return response.data.message;
    } catch (error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  handleModifyIssuesList: async (id) => {
    const response = await axios.get(
      `${apiUrl}/issue/bus/modify/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },

  handleSolveIssue: async (id) => {
    await axios.patch(`${apiUrl}/issue/solve/${id}`, null, {
      withCredentials: true,
    });
  },

  handleRegisterBreakDownModify: async (dto) => {
    try {
      const response = await axios.post(
        `${apiUrl}/breakdown/modify`,
        dto,
        { withCredentials: true }
      );
      return response.data.message;
    } catch (error) {
      throw new Error(
        ToastService.prepareToastMessage(error.response.data.message)
      );
    }
  },

  handleModifyBreakDownsList: async (id) => {
    const response = await axios.get(
      `${apiUrl}/breakdown/bus/modify/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },

  handleSolveBreakDown: async (id) => {
    await axios.patch(`${apiUrl}/breakdown/solve/${id}`, null, {
      withCredentials: true,
    });
  },

  handleReviewsDetails: async (id) => {
    const response = await axios.get(`${apiUrl}/review/bus/${id}`, {
      withCredentials: true,
    });
    return { busReviews: response.data.reviews, bus: response.data.bus };
  },

  handleIssuesDetails: async (id) => {
    const response = await axios.get(`${apiUrl}/issue/${id}`, {
      withCredentials: true,
    });
    return { bus: response.data.bus, busIssues: response.data.issues };
  },

  handleBreakDownsDetails: async (id) => {
    const response = await axios.get(`${apiUrl}/breakdown/${id}`, {
      withCredentials: true,
    });
    return { bus: response.data, busBreakDowns: response.data.breakdowns };
  },

  fetchBusList: async () => {
    const response = await axios.get(`${apiUrl}/bus`, {
      withCredentials: true,
    });
    return response.data;
  },
};

export default BusEditService;
