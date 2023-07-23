import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { NavLink, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Set this state based on user login status

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Animation for smooth opening of navigation items
  const navItemsAnimation = useSpring({
    height: isOpen ? "auto" : 0,
    opacity: isOpen ? 1 : 0,
  });

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setIsUserLoggedIn(false);
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <span className="text-xl font-bold">WorlFlow-Master</span>
        </div>
        <div className="hidden md:flex space-x-6">
          {/* Use NavLink instead of "a" tags for active class handling */}
          <NavLink
            to="/home"
            className="hover:text-gray-300"
            activeClassName="text-green-500"
          >
            Home
          </NavLink>
          <NavLink
            to="/attendance"
            className="hover:text-gray-300"
            activeClassName="text-green-500"
          >
            Attendance
          </NavLink>
          <NavLink
            to="/noticeboard"
            className="hover:text-gray-300"
            activeClassName="text-green-500"
          >
            Noticeboard
          </NavLink>
          <NavLink
            to="/dashboard"
            className="hover:text-gray-300"
            activeClassName="text-green-500"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-gray-300"
            activeClassName="text-green-500"
          >
            About
          </NavLink>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={handleToggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
            <svg
              className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Navigation items for mobile */}
      <animated.div style={navItemsAnimation} className="md:hidden px-4 pb-4">
        <NavLink
          to="/home"
          className="block py-2 text-gray-300 hover:text-white"
          activeClassName="text-green-500"
        >
          Home
        </NavLink>
        <NavLink
          to="/attendance"
          className="block py-2 text-gray-300 hover:text-white"
          activeClassName="text-green-500"
        >
          Attendance
        </NavLink>
        <NavLink
          to="/noticeboard"
          className="block py-2 text-gray-300 hover:text-white"
          activeClassName="text-green-500"
        >
          Noticeboard
        </NavLink>
        <NavLink
          to="/dashboard"
          className="block py-2 text-gray-300 hover:text-white"
          activeClassName="text-green-500"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/about"
          className="block py-2 text-gray-300 hover:text-white"
          activeClassName="text-green-500"
        >
          About
        </NavLink>
      </animated.div>
      {/* Conditional rendering of login/logout button */}
      <div className="container mx-auto px-4 py-3 flex justify-end items-center hidden">
        {isUserLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold"
          >
            Logout
          </button>
        ) : (
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
