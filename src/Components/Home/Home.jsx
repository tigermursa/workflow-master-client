import React, { useContext } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Home = () => {
  const { user } = useContext(AuthContext);

  // Check if user is defined before accessing displayName
  const userName = user?.displayName || "Dear";

  // Get the current time in user's local time zone
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const ampm = currentHour >= 12 ? "PM" : "AM";

  // Convert the hour to 12-hour format
  const twelveHourFormat = currentHour % 12 || 12;

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
