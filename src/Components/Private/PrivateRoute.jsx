import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import "./Private.css";
import Spinner from "./Spiner";
import Swal from "sweetalert2";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-96 mb-96 font-semibold text-4xl text-white">
        Loading{" "}
        <div className="ms-5">
          <Spinner></Spinner>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  } else {
    Swal.fire("You have to log in first to view details");
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

export default PrivateRoute;
