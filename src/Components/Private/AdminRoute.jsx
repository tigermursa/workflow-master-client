import { Navigate, useLocation } from "react-router";
import useAdmin from "../../hooks/useAdmin";
import Spinner from "./Spiner";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Spinner></Spinner>;
  }

  if (user && isAdmin) {
    return children;
  }
  // TODO: MAKE a route and compo for them who wanted to go through url
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
