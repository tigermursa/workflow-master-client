import React from "react";
import "./About.css";
const About = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center about-background">
      <div className=" p-8 rounded-lg text-white">
        <h1 className="text-4xl font-bold mb-6">About Work Flow Master</h1>
        <p className="text-lg mb-4">
          The main target features are to manage employee attendance, salary,
          and store employee information. There will be three panels: Admin,
          Manager, and Employee.
        </p>
        <p className="text-lg mb-4">
          Admin can assign an employee as a manager. All the site will be
          managed by the manager. Both manager and admin will be able to create
          accounts for employees.
        </p>
        <p className="text-lg mb-4">
          Employees will use this app to submit their daily attendance in the
          attendance sheet.
        </p>
      </div>
    </div>
  );
};

export default About;
