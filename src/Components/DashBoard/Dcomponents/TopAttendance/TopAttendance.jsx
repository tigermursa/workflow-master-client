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
      .get(`http://localhost:3000/attendance/${email}`)
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
    <div className=" text-start text-white the-background ">
      <div className="">
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-2xl me-6 w-1/2 mt-20 ms-40 "
        />
        <button
          className="btn btn-outline  bg-green-400 text-black "
          onClick={handleFetchAttendance}
        >
          Search
        </button>
      </div>
      <div>
        {/* Display attendance data here */}
        {attendanceData.map((attendance) => (
          <div
            className="border p-5 w-5/12 mb-3 ms-40 mt-6 bg-black bg-opacity-60 rounded-lg"
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
