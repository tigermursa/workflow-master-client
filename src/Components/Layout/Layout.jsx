import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "../Navigationbar/Navigationbar";
import Dashboard from "../DashBoard/Dashboard";

const Layout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup") ||
    location.pathname.includes("/dashboard");

  const [isLoading, setIsLoading] = useState(false); // State to track loading

  useEffect(() => {
    // Simulate loading delay for demonstration
    setIsLoading(true);
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <div>
      {noHeaderFooter ? null : <NavigationBar />}
      
      {/* {noHeaderFooter ? null : <Dashboard />} */}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Layout;
