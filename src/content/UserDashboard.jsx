import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Sidebar } from "../components";
import {
  BusLineList,
  UserRegister,
  UserList,
  BusEdit,
  BusList,
  BusRegister,
  BusLineRegister,
  BusLineEdit,
  BusStopEdit,
  BusRouteEdit,
  UserWelcome,
  BusIssuesList,
  BusBreakDownList,
  BusReviewList,
  UserType,
  UserListProblems,
  UserListModify,
  UserListReview,
  RouteList,
  StopList,
} from "../pages";
import "../App.css";
import { useStateContext } from "../contexts/ContextProvider";

const UserDashboard = () => {
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
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
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
                <Route path="/" element={<UserWelcome />} />

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

                {/* Kierowca */}
                <Route path="/user/list" element={<UserList />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/type/:id" element={<UserType />} />
                <Route path="/user/list/problems/:id/:type" element={<UserListProblems />} />
                <Route path="/user/list/modify/:id/:type" element={<UserListModify />} />
                <Route path="/user/list/review/:id" element={<UserListReview />} />

                {/* Linia Autobusowa */}
                <Route path="/busline/list" element={<BusLineList />} />
                <Route path="/busstop/list" element={<StopList />} />
                <Route path="/busline/register" element={<BusLineRegister />} />
                <Route path="/busline/edit/:id" element={<BusLineEdit />} />
                <Route path="/busstop/edit/:id" element={<BusStopEdit />} />
                <Route path="/busroute/edit/:id" element={<BusRouteEdit />} />

                <Route path="/route/list/:id/:type" element={<RouteList />} />
                {/*<Route path="*" element={<UserWelcome />} />*/}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default UserDashboard;
