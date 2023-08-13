import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";

const MyAttendance = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      // Fetch user data using the user's email
      fetch(
        `https://workflow-master-server.vercel.app/attendance/${user.email}`
      )
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user]);

  return (
    <div className="pt-14 md:w-4/5 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Your Attendance</h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200 text-white bg-opacity-50">
            <th className="p-2 border border-gray-400">Date</th>
            <th className="p-2 border border-gray-400">Time</th>
            <th className="p-2 border border-gray-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((attendance) => (
            <motion.tr
              key={attendance._id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white bg-opacity-60 text-white font-semibold"
            >
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
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAttendance;
