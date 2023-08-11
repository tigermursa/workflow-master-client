import React from "react";
import AllEmployees from "./Dcomponents/AllEmployees/AllEmployees";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
const Dashboard = () => {
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
          {/* Page content here */} <Outlet />
        </div>
        <div className="side-drawer-navigation">
          <label htmlFor="my-drawer" className=""></label>
          <ul className="menu p-4 w-80 h-full bg-blue-950 text-white">
            {/* Sidebar content here */}
            <li>
              <NavLink to="/dashboard/allemployees">All Employees</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/salary">Salary</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/topattendance">Top Attendance</NavLink>
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
