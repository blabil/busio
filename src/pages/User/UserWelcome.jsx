import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaBus, FaWarehouse } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiBusStop } from "react-icons/gi";
import { useLoginContext } from "../../contexts/LoginContextProvider";

const UserWelcome = () => {
  const { userName } = useLoginContext();

  return (
    <div className="flex flex-col my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-4 pr-10 lg:px-8">
      {/* Górna sekcja */}
      <div className="flex flex-col gap-8 justify-center my-2 align-middle rounded-tl-lg rounded-tr-lg inline-block w-full pt-8 overflow-hidden bg-white shadow-lg pb-4">
        <div className="flex flex-row items-center justify-center gap-4">
          <h1 className="text-5xl">Witaj</h1>
          <h1 className="text-5xl text-sky-400 underline underline-offset-4 hover:underline-offset-8 hover:text-sky-200">
            {userName}
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <h1 className="text-2xl">Twoje moduły:</h1>
        </div>
      </div>

      {/* Dolna sekcja */}
      <div className="flex flex-col h-96 gap-4 justify-center my-8 align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-8 overflow-hidden bg-white shadow-lg">
        <div className="flex w-full py-4 h-full">
          <div className="flex w-2/4 items-center justify-center">
            <Link to={`/bus/list`}>
              <div className="flex items-center flex-col bg-sky-400 shadow-sky-300 shadow-xl border-slate-600 px-32 py-4 hover:w-96 hover:border-teal-500 hover:bg-gray-200 hover:shadow-xl hover:shadow-slate-400 transition delay-300 duration-300 ease-out hover:ease-in">
                <FaBus size={60} />
                <h1>Pojazdy</h1>
              </div>
            </Link>
          </div>

          <div className="flex w-2/4 items-center justify-center">
            <Link to={`/driver/list`}>
              <div className="flex items-center flex-col bg-sky-400 shadow-sky-300 shadow-xl border-slate-600 px-32 py-4 hover:w-96 hover:border-teal-500 hover:bg-gray-200 hover:shadow-xl hover:shadow-slate-400 transition delay-300 duration-300 ease-out hover:ease-in">
                <CgProfile size={60} />
                <h1>Kierowcy</h1>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex justify-center w-full py-4 h-full">
          <div className="flex w-2/4 items-center justify-center">
            <Link to={`/busline/list`}>
              <div className="flex items-center flex-col bg-sky-400 shadow-sky-300 shadow-xl border-slate-600 px-32 py-4 hover:w-96 hover:border-teal-500 hover:bg-gray-200 hover:shadow-xl hover:shadow-slate-400 transition delay-300 duration-300 ease-out hover:ease-in">
                <GiBusStop size={60} />
                <h1>Linie</h1>
              </div>
            </Link>
          </div>

          <div className="flex w-2/4 items-center justify-center">
            <Link to={`/buslist`}>
              <div className="flex items-center flex-col bg-sky-400 shadow-sky-300 shadow-xl border-slate-600 px-32 py-4 hover:w-96 hover:border-teal-500 hover:bg-gray-200 hover:shadow-xl hover:shadow-slate-400 transition delay-300 duration-300 ease-out hover:ease-in">
                <FaWarehouse size={60} />
                <h1>Zapasy</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWelcome;
