import { Navigate, useLocation } from "react-router";
import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import Spinner from "./Spiner";
import useAdmin from "../hooks/useAdmin";
import { AuthContext } from "../Provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (loading || isAdminLoading) {
      return; // Wait until loading is done
    }

    if (!user || !isAdmin) {
      // Show SweetAlert2 confirmation dialog when user is not an admin
      Swal.fire({
        icon: "warning",
        title: "Access Restricted",
        text: "Sorry, Dashboard is only accessible for Admins.",
        confirmButtonText: "OK",
      }).then(() => {
        // User confirmed, set shouldRedirect to true and trigger the redirection
        setShouldRedirect(true);
      });
    }
  }, [loading, isAdminLoading, user, isAdmin]);

  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center mt-96 mb-96">
        <span className="loading loading-bars loading-lg "></span>
      </div>
    );
  }

  if (shouldRedirect) {
    // Redirect the user to the home page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user && isAdmin) {
    return children;
  }

  return null; // Return null temporarily while waiting for user input
};

export default AdminRoute;
