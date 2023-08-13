import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import EmployeeAttendanceSheet from "../EmployeeAttendanceSheet/EmployeeAttendanceSheet";
import MyAttendance from "../MyAttendance/MyAttendance";
import "./MyProfile.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const MyProfile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://workflow-master-server.vercel.app/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [id]);
  useEffect(() => {
    if (user && user.email) {
      // Fetch user data using the user's email
      fetch(`https://workflow-master-server.vercel.app/employee/${user.email}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user]);

  return (
    <div className="pt-20 h-full office-background">
      {userData.length > 0 ? (
        <div className="flex flex-col  w-full justify-around  h-full ">
          {userData.map((user) => (
            <div
              key={user._id}
              className="bg-white bg-opacity-20 rounded-lg shadow-2xl p-6   id-card"
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
                <p className="text-gray-100">Address : {user.fullAddress}</p>
                <p className="text-gray-100 pb-4">
                  My Salary : $ {user.salary}
                </p>
              </div>
            </div>
          ))}
          <div className=" attendance-card">
            <MyAttendance />
          </div>
        </div>
      ) : (
        <span className="loading loading-bars loading-lg text-white"></span>
      )}
    </div>
  );
};

export default MyProfile;
