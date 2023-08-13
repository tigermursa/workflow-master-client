import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { NavLink } from "react-router-dom";
import LazyLoad from "react-lazyload";

const Salary = () => {
  const [employees, setEmployees] = useState([]);
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

  const getSalaryRangeData = () => {
    const salaryRanges = {
      "Less than $500": 0,
      "$500 - $1000": 0,
      "$1001 - $1500": 0,
      "$1501 - $2000": 0,
      "More than $2000": 0,
    };

    employees.forEach((employee) => {
      const salary = parseFloat(employee.salary);
      if (salary < 500) {
        salaryRanges["Less than $500"]++;
      } else if (salary <= 1000) {
        salaryRanges["$500 - $1000"]++;
      } else if (salary <= 1500) {
        salaryRanges["$1001 - $1500"]++;
      } else if (salary <= 2000) {
        salaryRanges["$1501 - $2000"]++;
      } else {
        salaryRanges["More than $2000"]++;
      }
    });

    const data = [];
    for (const range in salaryRanges) {
      data.push({ range, value: salaryRanges[range] });
    }
    return data;
  };
  const getPaidUnpaidData = () => {
    const paidCount = employees.filter(
      (employee) => employee.salaryStatus === "paid"
    ).length;
    const unpaidCount = employees.length - paidCount;

    return [
      { name: "Paid", value: paidCount },
      { name: "Unpaid", value: unpaidCount },
    ];
  };
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  const GREEN_COLOR = "#00C49F";
  const RED_COLOR = "#FF4040"; // Red color

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
                  <th>Salary</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .slice() // Create a copy of employees array
                  .sort((a, b) => parseFloat(b.salary) - parseFloat(a.salary)) // Sort by salary in descending order
                  .map((employee, index) => (
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
                      <td>${employee.salary}</td>
                      <td>
                        <span
                          className={
                            employee.salaryStatus === "paid"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {employee.salaryStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="border w-1/2 p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getSalaryRangeData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            {/* chart 2 */}
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={getPaidUnpaidData()}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {getPaidUnpaidData().map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.name === "Paid" ? GREEN_COLOR : RED_COLOR}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  iconType="circle"
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default Salary;
