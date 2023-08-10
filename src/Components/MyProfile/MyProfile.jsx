import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import EmployeeAttendanceSheet from "../EmployeeAttendanceSheet/EmployeeAttendanceSheet";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      // Fetch user data using the user's email
      fetch(`http://localhost:3000/employee/${user.email}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user]);

  return (
    <div className="pt-10 office-background">
      {userData.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userData.map((user) => (
            <div
              key={user._id}
              className="bg-white bg-opacity-20 rounded-lg shadow-2xl p-6"
            >
              <img
                className="mx-auto h-40 w-40 rounded-2xl"
                src={user.image}
                alt="employee photo"
              />
              <p className="text-gray-100 text-xs font-semibold">
                {" "}
                Employee ID : {user.eID}
              </p>
              <p className="text-gray-100 text-xl font-semibold">
                {user.position}
              </p>
              <div className="mt-4 text-start">
                <p className="text-lg font-semibold text-gray-100">
                  Name : {user.name}
                </p>

                <p className="text-gray-100">Email: {user.email}</p>
                <p className="text-gray-100">Sex : {user.gender}</p>
                <p className="text-gray-100">
                  Phone Number : {user.phoneNumber}
                </p>
                <p className="text-gray-100">Address :{user.fullAddress}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyProfile;
