import React from "react";
import "./ForOfor.css";
import { NavLink } from "react-router-dom";

const ForOfor = () => {
  return (
    <div className="forofor-background">
      <h1 className="big-404-text">404</h1>
      <p className="text-3xl text-white">
        Oops! The page you are looking for is currently not available or under
        development.
      </p>
      <NavLink to="/" className="back-to-home-button">
        Back to Home
      </NavLink>
    </div>
  );
};

export default ForOfor;
