import React from "react";
import "tailwindcss/tailwind.css";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="spinner-border text-red-500" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
