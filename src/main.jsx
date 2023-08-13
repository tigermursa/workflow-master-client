import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import EmployeeAttendanceSheet from "./Components/EmployeeAttendanceSheet/EmployeeAttendanceSheet.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import ForOfor from "./Components/ForOfor/ForOfor.jsx";
import About from "./Components/About/About.jsx";
import Home from "./Components/Home/Home.jsx";
import AuthProvider from "./Components/Provider/AuthProvider.jsx";
import LogIn from "./Components/Login/Login.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import MyProfile from "./Components/MyProfile/MyProfile.jsx";
import MyAttendance from "./Components/MyAttendance/MyAttendance.jsx";
import Dashboard from "./Components/DashBoard/Dashboard.jsx";
import AllEmployees from "./Components/DashBoard/Dcomponents/AllEmployees/AllEmployees.jsx";
import Salary from "./Components/DashBoard/Dcomponents/Salary/Salary.jsx";
import TopAttendance from "./Components/DashBoard/Dcomponents/TopAttendance/TopAttendance.jsx";
import EmployeeDetails from "./Components/DashBoard/Dcomponents/AllEmployees/EmployeeDetails.jsx";
import UpdateEmployeInfo from "./Components/DashBoard/Dcomponents/UpdateEmployeInfo/UpdateEmployeInfo.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminRoute from "./Components/Private/AdminRoute.jsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/attendance",
        element: <EmployeeAttendanceSheet />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
      },

      {
        path: "/myattendance",
        element: <MyAttendance />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        path: "/dashboard/allemployees",
        element: <AllEmployees />,
      },
      {
        path: "/dashboard/salary",
        element: <Salary />,
      },
      {
        path: "/dashboard/topattendance",
        element: <TopAttendance />,
      },
      {
        path: "/dashboard/updateinfo/:id",
        element: <UpdateEmployeInfo />,
      },
      {
        path: "/dashboard/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/*",
    element: <ForOfor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
