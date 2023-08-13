import React, { useState, useEffect } from "react";
import axios from "axios";
import LazyLoad from "react-lazyload";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { NavLink } from "react-router-dom";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setEmployees(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  const getPositionData = () => {
    const positions = {};
    employees.forEach((employee) => {
      positions[employee.position] = (positions[employee.position] || 0) + 1;
    });

    const data = [];
    for (const position in positions) {
      data.push({ name: position, value: positions[position] });
    }
    return data;
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="flex bg-gradient-to-br from-blue-900 to-gray-700 employee-bg text-white">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <span className="loading loading-bars loading-lg "></span>
        </div>
      ) : (
        <>
          <div className="w-6/12 border">
            <table className="table">
              <thead>
                <tr className=" text-white">
                  <th>Index</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <LazyLoad height={100} offset={100} once>
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={employee.image} alt="Avatar" />
                          </div>
                        </LazyLoad>
                      </div>
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>
                      <button className="btn btn-outline btn-xs text-white" onClick={() => openModal(employee)}>
                        details
                      </button>
                      <NavLink to={`/dashboard/updateinfo/${employee._id}`} className="btn btn-outline btn-xs ms-4 text-white">
                        Update info
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border w-1/2 p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart animationDuration={1000}>
                <Pie dataKey="value" data={getPositionData()} cx="50%" cy="50%" outerRadius={80} label>
                  {getPositionData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "white", color: "#fff", borderRadius: "2px" }} />
                <Legend iconType="circle" iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <EmployeeDetailsModal employee={selectedEmployee} isOpen={isModalOpen} onClose={closeModal} />
        </>
      )}
    </div>
  );
};

export default AllEmployees;
