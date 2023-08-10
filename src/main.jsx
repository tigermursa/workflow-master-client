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
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <MyProfile />,
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
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
