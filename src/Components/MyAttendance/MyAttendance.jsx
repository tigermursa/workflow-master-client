import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyAttendance = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      // Fetch user data using the user's email
      fetch(`http://localhost:3000/attendance/${user.email}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user]);

  return (
    <div className="pt-14">
      <h2 className="text-2xl font-bold mb-4 text-white">Your Attendance</h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-400">Date</th>
            <th className="p-2 border border-gray-400">Time</th>
            <th className="p-2 border border-gray-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((attendance) => (
            <tr key={attendance._id} className="bg-white">
              <td className="p-2 border border-gray-400">{attendance.date}</td>
              <td className="p-2 border border-gray-400">{attendance.time}</td>
              <td className="p-2 border border-gray-400">
                {attendance.status === 1 && (
                  <span className="text-red-600">Absent</span>
                )}
                {attendance.status === 2 && (
                  <span className="text-green-600">Present</span>
                )}
                {attendance.status === 3 && (
                  <span className="text-orange-600">Vacation</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAttendance;
