import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../Navigationbar/Navigationbar";

const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default Layout;
