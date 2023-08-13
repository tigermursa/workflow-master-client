import React from "react";
import Modal from "react-modal";
import { FaCrown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const WelcomeModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="welcome-modal"
      overlayClassName="welcome-overlay"
    >
      <div className="flex flex-col justify-center items-center text-center p-4">
        <h2 className="text-2xl font-semibold mb-2">Welcome to the Workflow!</h2>
        <p className="text-stone-50 text-lg">
          If you'd like to explore this website as an employee, here's a demo email and password for you. And if you're interested in accessing the admin panel, here are the login credentials:
        </p>
        <div className="mt-4">
          <p className="text-stone-50 text-lg">
            Employee Demo Credentials:
            <br />
            Email: employee@example.com
            <br />
            Password: employee123
          </p>
          <p className="text-stone-50 text-lg mt-4">
            Admin Panel Credentials:
            <br />
            Email: admin@example.com
            <br />
            Password: admin123
          </p>
        </div>
        <NavLink
          to={"/login"}
          className="px-4 py-2 btn btn-outline text-white rounded-md shadow-lg mt-4"
          onClick={onClose}
        >
          Continue
        </NavLink>
      </div>
    </Modal>
  );
};

export default WelcomeModal;
