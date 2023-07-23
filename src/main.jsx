import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import EmployeeAttendanceSheet from "./Components/EmployeeAttendanceSheet/EmployeeAttendanceSheet.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import ForOfor from "./Components/ForOfor/ForOfor.jsx";
import About from "./Components/About/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/attendance",
        element: <EmployeeAttendanceSheet />,
      },
      {
        path: "/about",
        element: <About />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
