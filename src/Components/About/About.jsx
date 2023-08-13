import React from "react";
import "./About.css";
import { FaCheckCircle } from "react-icons/fa";
import { useTrail, animated } from "react-spring";

const About = () => {
  const points = [
    "Dashboard is accessible only for administrators.",
    "Only administrators can create employee accounts.",
    "Only one attendance record is acceptable for each day.",
    "Employees can view their attendance history in their profile.",
    "Administrators can view the list of paid or pending employee salaries.",
  ];

  const trail = useTrail(points.length, {
    from: { opacity: 0, transform: "translateX(-10px)" },
    to: { opacity: 1, transform: "translateX(0px)" },
  });

  return (
    <div className="min-h-screen flex items-center justify-center about-background">
      <div className="p-8 rounded-lg text-white text-start mt-12 ">
        <h1 className="text-4xl font-bold mb-6">About Work Flow Master</h1>
        <p className="text-2xl mb-4 font-bold">
          The main target features are to manage employee attendance, salary,
          and store employee information.
        </p>
        <ul className="list-disc pl-6 text-2xl">
          {trail.map((animation, index) => (
            <animated.li
              key={index}
              style={animation}
              className="flex items-center mb-2"
            >
              <FaCheckCircle className="mr-2 text-green-500" />
              {points[index]}
            </animated.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
