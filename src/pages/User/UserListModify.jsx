import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import createdAt from "../../data/createdAt.png";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
  BasicFullPanel,
  BottomPanel,
  ButtonPanel,
  HeaderPanel,
  OpenModalPanelButton,
  PanelHeader,
  ReturnButton,
  TwoPartPanel,
  UpperPanel,
  InfoUserModal,
  BasicHeader,
  NavigatePanelButton,
} from "../../components";
import { UserService } from "../../services";

const UserListModify = () => {
  const { id, type } = useParams();
  const [title, setTitle] = useState("");
  const [panelTitle, setPanelTitle] = useState("");
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const [idToModal, setIdToModal] = useState();
  const [isInfoOpen, setIsInfo] = useState(false);
  async function handleOpenInfo(problem_id) {
    setIdToModal(problem_id);
    setIsInfo(true);
  }

  function handleCloseInfo() {
    setIsInfo(false);
  }

  const fetchUserData = useCallback(async () => {
    const response = await UserService.fetchUserModifyData(
      id,
      type.toUpperCase()
    );
    const user = await UserService.handleUserDetails(id);
    setData(response.data);
    setUser(user);
  }, [id, type]);

  useEffect(() => {
    if (type === "breakdown") {
      setTitle("LISTA MODYFIKACJI NAPRAW");
      setPanelTitle("MODIFIKACJE NAPRAW");
    }
    if (type === "issue") {
      setTitle("LISTA MODIFIKACJI USTEREK");
      setPanelTitle("MODYFIKACJE USTEREK");
    }
    fetchUserData();
  }, [type, fetchUserData]);

  return data ? (
    <div className="flex flex-col gap-3 h-screen">
      <UpperPanel>
        <HeaderPanel>
          <BasicHeader value={user?.profile?.fullName} />
          <BasicHeader label={"ROLA:"} value={user?.role} />
        </HeaderPanel>

        <ButtonPanel label={title}>
          <ReturnButton path={`/user/type/${id}`} />
        </ButtonPanel>
      </UpperPanel>

      <BottomPanel>
        <TwoPartPanel>
          <BasicFullPanel>
            <PanelHeader label={panelTitle} />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    NAZWA PROBLEMU
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    OPIS
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
                      {element.busIssue ? (
                        <h1 className="text-bold">{element.busIssue.title}</h1>
                      ) : (
                        <h1 className="text-bold">
                          {element.BusBreakDown.title}
                        </h1>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">{element.desc}</h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {new Date(element.modifyAt).toLocaleDateString("pl-PL", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {element.busIssue_id ? (
                        <OpenModalPanelButton
                          onClick={() => handleOpenInfo(element.busIssue_id)}
                        />
                      ) : (
                        <OpenModalPanelButton
                          onClick={() =>
                            handleOpenInfo(element.BusBreakDown_id)
                          }
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {element.busIssue ? (
                        <NavigatePanelButton
                          path={`/bus/edit/${element.busIssue.bus_id}`}
                        />
                      ) : (
                        <NavigatePanelButton
                          path={`/bus/edit/${element.BusBreakDown.bus_id}`}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BasicFullPanel>
        </TwoPartPanel>
      </BottomPanel>
      <InfoUserModal
        onClose={handleCloseInfo}
        isOpen={isInfoOpen}
        id={idToModal}
        type={type.toUpperCase()}
      />
    </div>
  ) : null;
};

export default UserListModify;
