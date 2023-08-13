import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Make sure you have imported SweetAlert properly
import "./TopAttendamce.css";

const TopAttendance = () => {
  const [email, setEmail] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  const handleFetchAttendance = () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Empty Email",
        text: "Please enter an email to fetch attendance.",
      });
      return;
    }

    axios
      .get(`https://workflow-master-server.vercel.app/attendance/${email}`)
      .then((response) => {
        if (response.data.length === 0) {
          Swal.fire({
            icon: "error",
            title: "No User Found",
            text: "No user found with the provided email.",
          });
        } else {
          setAttendanceData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
        setAttendanceData([]);
      });
  };

  return (
    <div className="text-white the-background p-4">
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4">
        <input
          type="text"
          placeholder="Enter email address to see attendance history"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-2xl w-full md:w-1/2 mt-4 md:mt-0"
        />
        <button
          className="btn btn-outline bg-green-400 text-black mt-4 md:mt-0"
          onClick={handleFetchAttendance}
        >
          Search
        </button>
      </div>
      <div className="mt-4">
        {/* Display attendance data here */}
        {attendanceData.map((attendance) => (
          <div
            className="border text-start p-4 md:p-5 w-full md:w-5/12 mb-3 md:mb-0 mt-6 md:mt-4 bg-black bg-opacity-60 rounded-lg mx-auto"
            key={attendance._id}
          >
            <p>Date: {attendance.date}</p>
            <p>Time: {attendance.time}</p>
            <p>
              Status:{" "}
              <span
                style={{
                  color: attendance.status === 2 ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {attendance.status === 2 ? "Present" : "Absent"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAttendance;
