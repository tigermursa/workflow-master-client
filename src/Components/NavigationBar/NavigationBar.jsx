import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserCircle, FaAlignJustify, FaRegWindowClose } from "react-icons/fa";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useSpring, animated } from "react-spring";
import "./NavigationBar.css";
const NavigationBar = () => {
  // from another site
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuAnimation = useSpring({
    width: isMenuOpen ? "85%" : "0%",
    opacity: isMenuOpen ? 1 : 0,
  });

  const [activeNavItem, setActiveNavItem] = useState("home");

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    toggleMenu(); // Close the menu
  };

  const { user, signOutUser } = useContext(AuthContext);
  console.log(user);
  const signOutHandler = () => {
    signOutUser()
      .then((result) => {
        // Reload the page after successful sign out
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
      <div>
        <nav className="flex items-center justify-between p-4 md:p-0 md:pt-0  absolute">
          {/* Logo */}
          <div className=" items-center md:ms-32 ms-0 hidden">
            <img
              className="w-20 mr-2 rounded-full border-2 border-gray-200"
              src="logo.png"
              alt="Logo"
            />
            {/* <span className="font-bold text-lg">Your Logo</span> */}
          </div>

          {/* Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              onClick={toggleMenu}
            >
              <FaAlignJustify className="me-7 text-2xl text-white" />
            </button>

            <NavLink to="/">
              <div
                className="btn btn-ghost normal-case text-white text-xl  md:hidden"
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="flex items-center gap-2 justify-center">
                  <BsFillBriefcaseFill /> WorkFlow Master
                </div>
              </div>
            </NavLink>

            <div className="dropdown dropdown-end md:hidden">
              <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow flex justify-center items-center">
                <div className="card-body">
                  <span className="text-green-600 font-bold text-xl"></span>
                  <div className="card-actions">
                    <NavLink to="/cart">
                      <button className="btn btn-primary btn-block ">
                        View cart
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Drawer code */}
          <animated.div
            className="md:hidden absolute top-0 left-0 h-screen w-3/4 background py-4 px-8"
            style={{ ...menuAnimation, zIndex: 2 }} // Add zIndex: 2 to ensure the drawer is below the slider
          >
            <div className="flex justify-end  mb-4">
              <button
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                onClick={toggleMenu}
              >
                <FaRegWindowClose className="text-3xl text-white " />
              </button>
            </div>
            <div className="flex flex-col justify-start items-start">
              <div>
                <div className="dropdown dropdown-end ">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full flex justify-center items-center">
                      {user ? (
                        <img
                          title={user.displayName}
                          src={user.photoURL}
                          alt="Avatar"
                        />
                      ) : (
                        <FaUserCircle className="text-4xl" />
                      )}
                    </div>
                  </label>
                </div>
              </div>
              <Link
                to="/"
                className={`block mt-4 ${
                  activeNavItem === "home"
                    ? "text-gray-500 font-semibold"
                    : "text-white font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("home")}
              >
                Home
              </Link>
              <Link
                to="/attendance"
                className={`block mt-4 ${
                  activeNavItem === "attendance"
                    ? "text-gray-700 font-semibold"
                    : "text-white font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("attendance")}
              >
                Attendance
              </Link>
              <Link
                to="/dashboard/allemployees"
                className={`block mt-4 ${
                  activeNavItem === "dashboard"
                    ? "text-gray-700 font-semibold"
                    : "text-white font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("dashboard")}
              >
                Dashboard
              </Link>
              <Link
                to="/dashboard/allemployees"
                className={`block mt-4 ${
                  activeNavItem === "todo"
                    ? "text-gray-700 font-semibold"
                    : "text-white font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("todo")}
              >
                TO Do
              </Link>
              <Link
                to="/about"
                className={`block mt-4 ${
                  activeNavItem === "about"
                    ? "text-gray-700 font-semibold"
                    : "text-white font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("about")}
              >
                About
              </Link>

              <div
                href="#logout"
                className={`block mt-4 ${
                  activeNavItem === "home"
                    ? " text-gray-700 font-semibold"
                    : " text-white font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("logout")}
              >
                {user ? (
                  <NavLink onClick={signOutHandler}>Logout</NavLink>
                ) : (
                  " "
                )}
              </div>
              <div
                href="#logout"
                className={`block mt-4 ${
                  activeNavItem === "home"
                    ? " text-gray-700 font-semibold"
                    : " text-white font-semibold"
                } hover:text-gray-300`}
                onClick={() => handleNavItemClick("logout")}
              >
                {!user ? (
                  <NavLink
                    to="/login"
                    className="text-white font-semibold me-4 text-xl "
                  >
                    Log in
                  </NavLink>
                ) : (
                  ""
                )}
              </div>
            </div>
          </animated.div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:hidden  md:items-center md:justify-end w-full md:w-auto mt-4 md:mt-0 font-semibold me-6  ">
            <div
              href="#home"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "home" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("home")}
            >
              Home
            </div>
            <div
              href="#about"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "about" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("about")}
            >
              About Us
            </div>
            <div
              href="#services"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "services" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("services")}
            >
              Services
            </div>
            <div
              href="#clients"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "clients" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("clients")}
            >
              Clients
            </div>
            <div
              href="#careers"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "careers" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("careers")}
            >
              Careers
            </div>
            <div
              href="#blogs"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "blogs" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("blogs")}
            >
              Blogs
            </div>
            <div
              href="#contact"
              className={`block md:inline-block mt-4 md:mt-0 mr-4 ${
                activeNavItem === "contact" ? "text-gray-700" : "text-black"
              } hover:text-gray-700 me-6`}
              onClick={() => handleNavItemClick("contact")}
            >
              Contact Us
            </div>
          </div>
        </nav>
      </div>
      {/* main nav */}
      <div className="navbar absolute w-full">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-white text-3xl font-mono hidden md:block"
          >
            <div className="flex items-center gap-2">
              <BsFillBriefcaseFill /> Workflow Master
            </div>
          </Link>
        </div>
        <div>
          <NavLink
            to="/"
            className="text-white hover:text-gray-400 font-semibold me-4 text-xl hidden md:block"
          >
            Home
          </NavLink>
          <NavLink
            to="/attendance"
            className="text-white hover:text-gray-400  font-semibold me-4 text-xl hidden md:block"
          >
            Attendance
          </NavLink>
          <NavLink
            to="/dashboard/allemployees"
            className="text-white hover:text-gray-400  font-semibold me-4 text-xl hidden md:block"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/about"
            className="text-white hover:text-gray-400  font-semibold me-4 text-xl hidden md:block"
          >
            About
          </NavLink>
          {!user ? (
            <NavLink
              to="/login"
              className="text-white  hover:text-gray-400 font-semibold me-4 text-xl hidden md:block "
            >
              Log in
            </NavLink>
          ) : (
            <div className="flex items-center">
              <NavLink
                className="text-white hover:text-gray-400  font-semibold me-4 text-xl hidden md:block "
                to="/profile"
              >
                Profile
              </NavLink>{" "}
              <NavLink
                className="text-white hover:text-gray-900    hidden md:block btn btn-outline btn-sm pt-2  "
                onClick={signOutHandler}
              >
                Logout
              </NavLink>{" "}
            </div>
          )}
        </div>
        <div className="flex-none me-10">
          <div className="dropdown dropdown-end hidden md:block">
            <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow flex justify-center items-center">
              <div className="card-body">
                <span className="text-green-600 font-bold text-xl"></span>
                <div className="card-actions">
                  <NavLink to="/cart">
                    <button className="btn btn-primary btn-block ">
                      View cart
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end ms-7 hidden md:block">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full flex justify-center items-center">
                {user ? (
                  <img
                    title={user.displayName}
                    src={user.photoURL}
                    alt="Avatar"
                  />
                ) : (
                  <FaUserCircle className="text-4xl" />
                )}
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
