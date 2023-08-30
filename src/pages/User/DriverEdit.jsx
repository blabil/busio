import React from 'react'
import { UpperPanel, HeaderPanel, BasicHeader, ButtonPanel, ReturnButton, BottomPanel, TwoPartPanel, BasicPanel, PanelHeader, NavigatePanelButton } from '../../components'

const DriverEdit = ({driver}) => {

  return (
    <div className="flex flex-col gap-3 h-screen">
      <UpperPanel>
        <HeaderPanel>
          <BasicHeader value={driver.profile.fullName} />
          <BasicHeader label={"EMAIL:"} value={driver.email} />
          <BasicHeader label={"ROLA:"} value={driver.role} />
          <BasicHeader label={"ADRES:"} value={driver.profile.address} />
          <BasicHeader label={"TELEFON:"} value={driver.profile.phone} />
        </HeaderPanel>

        <ButtonPanel label={"INFORMACJE UŻYTKOWNIKA"}>
          <ReturnButton path={"/user/list"} />
        </ButtonPanel>



        </UpperPanel>
        <BottomPanel>
          <TwoPartPanel>
            <BasicPanel>
              <PanelHeader label={"ZGŁOSZONE NAPRAWY"} path={`/user/list/problems/${driver.id}/breakdown`}/>
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
                {driver.busBreakDown.slice(0, 5).map((breakDown)=> (
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
                        <h1 className="text-bold">{new Date(breakDown.createdAt).toLocaleDateString(
                          "pl-PL",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}</h1>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <NavigatePanelButton path={`/bus/edit/${breakDown.bus_id}`}/>
                  </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </BasicPanel>
            <BasicPanel>
              <PanelHeader label={"ZGŁOSZONE USTERKI"} path={`/user/list/problems/${driver.id}/issue`}/>
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
                {driver.busIssue.slice(0, 5).map((issue)=> (
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
                        <h1 className="text-bold">{new Date(issue.createdAt).toLocaleDateString(
                          "pl-PL",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}</h1>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <NavigatePanelButton path={`/bus/edit/${issue.bus_id}`}/>
                  </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </BasicPanel>
          </TwoPartPanel>
          <TwoPartPanel>
            <BasicPanel>
              <PanelHeader label={"TRASY UŻYTKOWNIKA"} path={'/'}></PanelHeader>
            </BasicPanel>
          </TwoPartPanel>
        </BottomPanel>


    </div>
  )
}

export default DriverEdit