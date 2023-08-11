import React, { useState, useEffect } from "react";
import axios from "axios";
import LazyLoad from "react-lazyload";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employee data when the component mounts
    axios
      .get("http://localhost:3000/users")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Process employee positions to create data for the pie chart
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
    <div className="flex">
      <div className="w-6/12 border">
        <table className="table">
          <thead>
            <tr>
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
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border">
        <PieChart width={400} height={300}>
          <Pie
            dataKey="value"
            data={getPositionData()}
            cx={200}
            cy={150}
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {getPositionData().map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default AllEmployees;
