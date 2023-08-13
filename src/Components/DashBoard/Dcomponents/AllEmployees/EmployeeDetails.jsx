import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get(`https://workflow-master-server.vercel.app/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(user);
  return (
    <div className="pt-20 bg-black text-white">
      <h2>User Details</h2>
      <div>
        <p>Name: {user.name}</p>
        <p>Position: {user.position}</p>
        {/* Display other user details */}
      </div>
    </div>
  );
};

export default EmployeeDetails;
