import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "../Navigationbar/Navigationbar";

const Layout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup");
  return (
    <div>
      {noHeaderFooter || <NavigationBar></NavigationBar>}
      <Outlet></Outlet>
      {/* {noHeaderFooter || <Footer></Footer>} */}
    </div>
  );
};

export default Layout;
