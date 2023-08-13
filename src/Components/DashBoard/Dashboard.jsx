import React, { useEffect, useState } from "react";
import AllEmployees from "./Dcomponents/AllEmployees/AllEmployees";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { FaUserShield, FaUserTie, FaSpinner } from "react-icons/fa";
import {
  MdOutlineAttachMoney,
  MdArrowCircleUp,
  MdManageAccounts,
} from "react-icons/md";
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating content loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the time as needed
  }, []);
  return (
    <div className="">
      <div className="drawer">
        {/* Add the 'checked' attribute to keep the sidebar open */}
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked
        />
        <div className="drawer-content">
          {isLoading ? (
            <div className="flex justify-center items-center mt-96 mb-96">
              <span className="loading loading-bars loading-lg "></span>
            </div>
          ) : (
            <Outlet />
          )}
          {/* Page content here */}
        </div>
        <div className="side-drawer-navigation">
          <label htmlFor="my-drawer" className=""></label>
          <ul className="menu p-4 w-80 h-full bg-blue-950 text-white">
            <h1 className="font-bold text-2xl flex items-center gap-2">
              <FaUserShield />
              Admin Dashboard
            </h1>
            <br />
            {/* Sidebar content here */}
            <li>
              <NavLink to="/dashboard/allemployees">
                <FaUserTie />
                All Employees
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/salary">
                <MdOutlineAttachMoney className="text-xl" />
                Salary
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/topattendance">
                <MdArrowCircleUp className="text-xl" />
                Attendance
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/signup">
                <MdManageAccounts className="text-xl" />
                Create Account
              </NavLink>
            </li>
            <div className="divider text-white"></div>
            <hr />
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
