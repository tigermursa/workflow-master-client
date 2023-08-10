import React from "react";
import MyAttendance from "../MyAttendance/MyAttendance";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="pt-12">
      <div className="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={true}
        />
        <div className="drawer-content bg-white">
          {/* Your content here */}
          <MyAttendance />
        </div>
        <div className="drawer-side bg-white">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-white text-base-content">
            {/* Sidebar content here */}
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
