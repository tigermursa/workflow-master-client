import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaCrown } from "react-icons/fa";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [isAdminEmail, setIsAdminEmail] = useState(false);

  // Check if user is defined before accessing displayName
  const userName = user?.displayName || "Dear";

  // List of admin emails
  const adminEmails = ["mursalinhossain377@gmail.com", "demo@gmail.com", ""];

  useEffect(() => {
    // Check if the user's email matches any of the admin emails
    if (user && adminEmails.includes(user.email) && !isAdminEmail) {
      setIsAdminEmail(true);
    }
  }, [user, isAdminEmail]);

  // Get the current time in user's local time zone
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  // Determine the appropriate greeting based on the current time
  let greeting;
  if (currentHour >= 6 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  return (
    <div className="mx-auto p-4 home-background">
      <div className="flex flex-col justify-start items-start">
        <h1 className="md:text-6xl text-3xl text-white font-bold mb-4">
          {greeting}, {userName}
        </h1>
        <p className="text-stone-50 text-2xl">
          Hopefully, you are using your time well, remember, time is money!
        </p>
        {isAdminEmail && (
          <p className="text-stone-50 text-xl flex items-center gap-2 mt-3">
            You are Admin <FaCrown className="text-yellow-400 text-2xl" />
          </p>
        )}
        <h2 className="text-xl text-white font-semibold"></h2>
        {!user ? (
          <NavLink
            to={"/login"}
            className="px-6 py-3 btn btn-outline text-white rounded-md shadow-lg mt-5"
          >
            Login
          </NavLink>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default Home;
