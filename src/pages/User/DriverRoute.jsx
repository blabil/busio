import React, { useState, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom";
import { BusRouteService } from '../../services';
import { useLoginContext } from '../../contexts/LoginContextProvider';

const DriverRoute = () => {
    const [routeList, setRouteList] = useState([]);
    const { userID } = useLoginContext()


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

    const fetchDriverRoutes = useCallback(async () => {
        try{
            const response = await BusRouteService.fetchRoutesAssignedTo(userID, "user");
            setRouteList(response);
        } catch(error) {
            console.log(error.message)
        }
    },[userID])

    useEffect(() => {
      fetchDriverRoutes()
    }, [fetchDriverRoutes])
    

    useEffect(() =>{
        console.log(routeList)
    },[routeList]);
return (
    <div className="-my-2 py-2 overflow-x-auto w-full lg:-mx-2 pr-10 lg:px-8">
    <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block h-full w-full py-4 overflow-hidden bg-white px-12">
      <div className="flex justify-between items-center">
      </div>
    </div>
    <div className="align-middle inline-block min-w-full bg-white px-8 pt-3 rounded-bl-lg rounded-br-lg py-2">
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
              ODCINEK
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
            <th scope="col" className="px-4 py-4 text-center">
              SCZEGÓŁY
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {routeList?.map((route) => (
            <tr
              key={route.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {route.id}
              </th>
              <td className="px-6 py-4 text-center">
                <h1 className="text-bold">{route.busLine.number}</h1>
              </td>
              <td className="px-6 py-4 text-center">
                <h1 className="text-bold">{route.busLine.part}</h1>
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
              <td className="px-6 py-4 text-center">
              <Link to={`/driver/route/${route.id}`}>
                    <button className="px-5 py-2 border-sky-400 border text-sky-400 rounded transition duration-300 hover:bg-teal-500 hover:text-white">
                      Szczegóły
                    </button>
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}
export default DriverRoute;
