import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  BasicFullPanel,
  BottomPanel,
  ButtonPanel,
  HeaderPanel,
  PanelHeader,
  ReturnButton,
  TwoPartPanel,
  UpperPanel,
  BasicHeader,
  NavigatePanelButton,
} from "../../components";
import { UserService } from "../../services";

const UserListReview = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const fetchUserData = useCallback(async () => {
    try{
      const response = await UserService.fetchUserReviewsData(id);
      const user = await UserService.handleUserDetails(id);
      setData(response.data);
      setUser(user);
    } catch(error)
    {
      console.log(error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return data ? (
    <div className="flex flex-col gap-3 h-screen">
      <UpperPanel>
        <HeaderPanel>
          <BasicHeader value={user?.profile?.fullName} />
          <BasicHeader label={"ROLA:"} value={user?.role} />
        </HeaderPanel>

        <ButtonPanel label={"LISTA BADAŃ TECHNICZNYCH"}>
          <ReturnButton path={`/user/type/${id}`} />
        </ButtonPanel>
      </UpperPanel>

      <BottomPanel>
        <TwoPartPanel>
          <BasicFullPanel>
            <PanelHeader label="BADANIA TECHNICZNE" />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    WYSTAWIONE
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    WYGASA
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    AKTUALNY
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    POZYTYWNY
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    BUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((element) => (
                  <tr
                    key={element.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {element.id}
                    </th>
                    <td className="px-6 py-4 text-center">
                      {new Date(element.createdAt).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {new Date(element.expiresAt).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {element.isActuall ? (
                        <h1 className="text-bold text-green-600">TAK</h1>
                      ) : (
                        <h1 className="text-bold text-red-600">NIE</h1>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {element.isPositive ? (
                        <h1 className="text-bold text-green-600">TAK</h1>
                      ) : (
                        <h1 className="text-bold text-red-600">NIE</h1>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <NavigatePanelButton
                        path={`/bus/edit/${element.bus_id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BasicFullPanel>
        </TwoPartPanel>
      </BottomPanel>
    </div>
  ) : null;
};

export default UserListReview;
