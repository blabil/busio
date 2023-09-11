import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { MechanicSidebar, Navbar } from "../components";
import {
  BusEdit,
  BusList,
  BusRegister,
  BusIssuesList,
  BusBreakDownList,
  BusReviewList,
  MechanicWelcome,
} from "../pages";
import "../App.css";
import { useStateContext } from "../contexts/ContextProvider";

const MechanicDashboard = () => {
    const { activeMenu } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-x1 hover:bg-light-gray text-white"
                style={{ background: "blue", borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-64 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <MechanicSidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <MechanicSidebar />
            </div>
          )}

          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full 
                ${activeMenu ? "md:ml-64" : "flex-2"}`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              <Routes>
                {/* Głwówna */}
                <Route path="/" element={<MechanicWelcome />} />

                {/* Bus */}
                <Route path="/bus/list" element={<BusList />} />
                <Route path="/bus/register" element={<BusRegister />} />
                <Route path="/bus/edit/:id" element={<BusEdit />} />
                <Route
                  path="/bus/edit/issue/list/:id"
                  element={<BusIssuesList />}
                />
                <Route
                  path="/bus/edit/breakdown/list/:id"
                  element={<BusBreakDownList />}
                />
                <Route
                  path="/bus/edit/review/list/:id"
                  element={<BusReviewList />}
                />

                <Route path="*" element={<MechanicWelcome/>} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default MechanicDashboard