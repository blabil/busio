import React, { useState, useEffect } from "react";
import {
  UpperPanel,
  HeaderPanel,
  BasicHeader,
  ButtonPanel,
  ReturnButton,
  BottomPanel,
  TwoPartPanel,
  BasicPanel,
  PanelHeader,
  NavigatePanelButton,
  InfoUserModal,
  OpenModalPanelButton,
} from "../../components";

const MechanicEdit = ({ mechanic }) => {
  const [type, setType] = useState();
  const [idToModal, setIdToModal] = useState();

  const [isInfoOpen, setIsInfo] = useState(false);

  async function handleOpenInfo(type, id) {
    setIdToModal(id);
    setType(type);
    setIsInfo(true);
  }

  function handleCloseInfo() {
    setIsInfo(false);
  }

  useEffect(() => {
    console.log(mechanic);
  }, [mechanic]);

  return (
    <div className="flex flex-col gap-3 h-screen">
      <UpperPanel>
        <HeaderPanel>
          <BasicHeader value={mechanic.profile.fullName} />
          <BasicHeader label={"EMAIL:"} value={mechanic.email} />
          <BasicHeader label={"ROLA:"} value={mechanic.role} />
          <BasicHeader label={"ADRES:"} value={mechanic.profile.address} />
          <BasicHeader label={"TELEFON:"} value={mechanic.profile.phone} />
        </HeaderPanel>

        <ButtonPanel label={"INFORMACJE UŻYTKOWNIKA"}>
          <ReturnButton path={"/user/list"} />
        </ButtonPanel>
      </UpperPanel>
      <BottomPanel>
        <TwoPartPanel>
          <BasicPanel>
            <PanelHeader
              label={"ZGŁOSZONE NAPRAWY"}
              path={`/user/list/problems/${mechanic.id}/breakdown`}
            />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    NAZWA
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    WYSTAWIONE
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    BUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {mechanic.busBreakDown.slice(0, 5).map((breakDown) => (
                  <tr
                    key={breakDown.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {breakDown.id}
                    </th>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">{breakDown.title}</h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">
                        {new Date(breakDown.createdAt).toLocaleDateString(
                          "pl-PL",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <NavigatePanelButton
                        path={`/bus/edit/${breakDown.bus_id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BasicPanel>
          <BasicPanel>
            <PanelHeader
              label={"MODYFIKACJE NAPRAW UŻTYTKOWNIKA"}
              path={`/user/list/modify/${mechanic.id}/breakdown`}
            />
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
                    NAPRAWA
                  </th>
                </tr>
              </thead>
              <tbody>
                {mechanic.busBreakDownModify
                  .slice(0, 5)
                  .map((breakDownModify) => (
                    <tr
                      key={breakDownModify.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {breakDownModify.id}
                      </th>
                      <td className="px-6 py-4 text-center">
                        <h1 className="text-bold">
                          {new Date(
                            breakDownModify.modifyAt
                          ).toLocaleDateString("pl-PL", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </h1>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <OpenModalPanelButton
                          onClick={() =>
                            handleOpenInfo(
                              "BREAKDOWN",
                              breakDownModify.BusBreakDown_id
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </BasicPanel>
        </TwoPartPanel>
        <TwoPartPanel>
          <BasicPanel>
            <PanelHeader
              label={"ZGŁOSZONE USTERKI"}
              path={`/user/list/problems/${mechanic.id}/issue`}
            />
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase border-1 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    NAZWA
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    WYSTAWIONE
                  </th>
                  <th scope="col" className="px-4 py-4 text-center">
                    BUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {mechanic.busIssue.slice(0, 5).map((issue) => (
                  <tr
                    key={issue.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {issue.id}
                    </th>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">{issue.title}</h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">
                        {new Date(issue.createdAt).toLocaleDateString("pl-PL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <NavigatePanelButton path={`/bus/edit/${issue.bus_id}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BasicPanel>
          <BasicPanel>
            <PanelHeader
              label={"MODYFIKACJA USTEREK UŻYTKOWINKA"}
              path={`/user/list/modify/${mechanic.id}/issue`}
            />
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
                    USTERKA
                  </th>
                </tr>
              </thead>
              <tbody>
                {mechanic.busIssueModify.slice(0, 5).map((issueModify) => (
                  <tr
                    key={issueModify.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {issueModify.id}
                    </th>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">
                        {new Date(issueModify.modifyAt).toLocaleDateString(
                          "pl-PL",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <OpenModalPanelButton
                        onClick={() =>
                          handleOpenInfo("ISSUE", issueModify.busIssue_id)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BasicPanel>
        </TwoPartPanel>
        <TwoPartPanel>
          <BasicPanel>
            <PanelHeader
              label={"WYSTAWIONE BADANIA TECHNICZNE"}
              path={`/user/list/review/${mechanic.id}`}
            />
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
                {mechanic.busReview.slice(0, 5).map((review) => (
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
                      <h1 className="text-bold">
                        {new Date(review.createdAt).toLocaleDateString(
                          "pl-PL",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <h1 className="text-bold">
                        {new Date(review.expiresAt).toLocaleDateString(
                          "pl-PL",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </h1>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {review.isActuall ? (
                        <h1 className="text-bold text-green-600">TAK</h1>
                      ) : (
                        <h1 className="text-bold text-red-600">NIE</h1>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {review.isPositive ? (
                        <h1 className="text-bold text-green-600">TAK</h1>
                      ) : (
                        <h1 className="text-bold text-red-600">NIE</h1>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <NavigatePanelButton
                        path={`/bus/edit/${review.bus_id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BasicPanel>
        </TwoPartPanel>
      </BottomPanel>
      <InfoUserModal
        onClose={handleCloseInfo}
        isOpen={isInfoOpen}
        id={idToModal}
        type={type}
      />
    </div>
  );
};

export default MechanicEdit;
