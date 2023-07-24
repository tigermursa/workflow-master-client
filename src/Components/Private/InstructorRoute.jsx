import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useInstructor from "../../hooks/useInstructor";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "./Spiner";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const {isInstructor, isInstructorLoading} = useInstructor;
  const location = useLocation();

  if (loading || isInstructorLoading) {
    return <Spinner></Spinner>;
  }

  if (!isInstructor) {
    return children;
  }
  // TODO: MAKE a route and compo for them who wanted to go through url
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
