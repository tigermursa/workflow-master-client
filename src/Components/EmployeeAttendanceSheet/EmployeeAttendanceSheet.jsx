import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "./EmployeeAttendanceSheet.css";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const EmployeeAttendanceSheet = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [attendanceData, setttendance] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetch(`https://workflow-master-server.vercel.app/employee/${user.email}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user]);

  const storedAttendance = JSON.parse(localStorage.getItem("attendance"));
  const [attendance, setAttendance] = useState(
    storedAttendance || Array(31).fill({ status: 4, time: "" })
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (user && user.email) {
      // Fetch user data using the user's email
      fetch(`https://workflow-master-server.vercel.app/attendance/${user.email}`)
        .then((response) => response.json())
        .then((data) => setttendance(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [user, attendance]);

  const handleChange = (index, value) => {
    const updatedAttendance = [...attendance];
    const currentTime = new Date();
    const formattedDate = formatDate(currentTime);
    updatedAttendance[index] = {
      email: user.email,
      date: formattedDate,
      time: formatTime(currentTime),
      status: value,
    };

    fetch("https://workflow-master-server.vercel.app/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAttendance[index]),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Attendance Submitted",
          text: "Your attendance has been successfully submitted.",
        }).then(() => {
          // Reload the page when the user clicks "OK"
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while submitting your attendance.",
        });
      });

    setAttendance(updatedAttendance);
  };

  const formatTime = (time) => {
    const hour = time.getHours() % 12 || 12;
    const minute = time.getMinutes().toString().padStart(2, "0");
    const second = time.getSeconds().toString().padStart(2, "0");
    const ampm = time.getHours() >= 12 ? "PM" : "AM";
    return `${hour}:${minute}:${second} ${ampm}`;
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const month = moment.months()[currentTime.getMonth()];
  const totalDays = moment(currentTime).daysInMonth();

  const presentDays = attendanceData.filter((item) => item.status === 2).length;
  const absentDays = attendanceData.filter((item) => item.status === 1).length;

  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(2); // Default: Present

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const handleAttendanceSubmit = () => {
    const index = new Date().getDate() - 1;

    // Check if attendance for the selected date already exists
    if (attendance[index].status !== 4) {
      Swal.fire({
        icon: "info",
        title: "Attendance Already Taken",
        text: `Your attendance status for ${attendance[index].date} has already been taken.`,
      }).then(() => {
        // Reload the page when the user clicks "OK"
        window.location.reload();
      });
    } else {
      handleChange(index, selectedStatus);
      setShowAttendanceDialog(false);
    }
  };
  const handleAttendanceButtonClick = () => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to submit your attendance.",
      });
    } else {
      setShowAttendanceDialog(true);
    }
  };
  return (
    <div className="office-background pb-56">
      <div className=" rounded-3xl w-full md:h-full lg:w-1/2 mx-auto md:shadow-3xl shadow-white p-5 pb-20 pt-6 mt-20 bg-white bg-opacity-10 ">
        <div className="px-4 py-8 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="text-white">
              <div className="text-4xl sm:text-6xl font-bold">
                {formatTime(currentTime)}
              </div>
              <div className="text-xl sm:text-2xl font-bold mt-2">
                {formatDate(currentTime)}
              </div>
            </div>
            <div className="mt-6 sm:mt-0 text-white text-start">
              {userData.map((user) => (
                <div key={user._id}>
                  <p className="text-lg font-bold">Name : {user.name}</p>
                  <p className="text-lg font-bold">ID : {user.eID}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <p className="text-3xl font-bold text-white border-text2 mb-4 hidden">
              Running Month {month}
            </p>
            <p className="text-xl sm:text-3xl font-bold text-white border-text2 mb-4">
              This month total working days: {totalDays - 7}
            </p>
            <div className="text-lg sm:text-xl font-extrabold flex flex-wrap justify-center gap-4 sm:gap-10 text-white border-text2">
              <p>Present: {presentDays}</p>
              <p>Absent: {absentDays}</p>
            </div>
          </div>
        </div>

        <button
          className="btn btn-outline text-white hover:bg-transparent hover:text-gray-500 mt-10"
          onClick={handleAttendanceButtonClick}
        >
          Put Attendance
        </button>
      </div>

      {showAttendanceDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="text-lg font-semibold mb-4">
              Select Attendance Status
            </p>
            <div className="flex gap-4">
              <button
                className={`btn btn-sm ${
                  selectedStatus === 2
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 hover:bg-green-500"
                }`}
                onClick={() => handleStatusSelect(2)}
              >
                Present
              </button>
              <button
                className={`btn btn-sm ${
                  selectedStatus === 1
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 hover:bg-red-500"
                }`}
                onClick={() => handleStatusSelect(1)}
              >
                Absent
              </button>
            </div>
            <div className="flex justify-center mt-10">
              <button
                className="btn btn-blue mr-2 hover:bg-white hover:text-black"
                onClick={handleAttendanceSubmit}
              >
                Submit
              </button>
              <button
                className="btn btn-gray hover:bg-white hover:text-black"
                onClick={() => setShowAttendanceDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendanceSheet;
