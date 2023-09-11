import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  BasicHeader,
  BottomPanel,
  ButtonPanel,
  HeaderPanel,
  PanelHeader,
  RegisterButton,
  ReturnButton,
  InsuranceModal,
  TwoPartPanel,
  UpperPanel,
  BasicFullPanel,
} from "../../components";
import { BusEditService } from "../../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import createdAt from "../../data/createdAt.png";
import expiresAt from "../../data/expiresAt.png";

const InsuranceList = () => {
    const { id } = useParams();
    const [insurance, setInsurance] = useState([]);
    const [bus, setBus] = useState({});
  
    const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
    function handleOpenInsurance() {
        setIsInsuranceOpen(true);
     }
    function handleCloseInsurance() {
        setIsInsuranceOpen(false);
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
      fetchInsurancesDetails();
    }
  
    const fetchInsurancesDetails = useCallback(async () => {
      const response = await BusEditService.handleInsuranceDetails(id);
      setBus(response.bus);
      setInsurance(response.busInsurances);
    }, [id]);
  
    useEffect(() => {
        fetchInsurancesDetails();
    }, [id, fetchInsurancesDetails]);
  
    return (
      <div className="flex flex-col gap-3 h-screen">
        <UpperPanel>
          <HeaderPanel>
            <BasicHeader label={"ID:"} value={bus.id} />
            <BasicHeader label={"REJSTRACJA:"} value={bus.registration} />
          </HeaderPanel>
  
          <ButtonPanel label={"LISTA UBEZPIECZEŃ"}>
            <ReturnButton path={`/bus/edit/${id}`} />
            <RegisterButton
            onClick={handleOpenInsurance}
            label={"Dodaj Ubezpiecznie"}
          />
          <InsuranceModal 
            onClose={handleCloseInsurance}
            isOpen={isInsuranceOpen}
            busID={id}
            onSubmit={handleRegister}
          />
          </ButtonPanel>
        </UpperPanel>
  
        <BottomPanel>
          <TwoPartPanel>
            <BasicFullPanel>
              <PanelHeader label={"UBEZPIECZENIA"} />
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    FIRMA
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    CENA
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
                      <TooltipComponent content="Wystawiono" position="Top">
                        <img
                          src={expiresAt}
                          alt="CreatedAt"
                          className="h-4 w-4"
                        />
                      </TooltipComponent>
                    </div>
                  </th>
                </tr>
              </thead>
                <tbody>
                  {insurance.slice(0, 5).map((insurance) => (
                    <tr
                    key={insurance.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {insurance.id}
                    </th>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">{insurance.company}</h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">{insurance.price} zł</h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {new Date(insurance.createdAt).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {new Date(insurance.expiresAt).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
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
    );
}

export default InsuranceList