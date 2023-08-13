import React from "react";
import Modal from "react-modal";
import "./Employee.css";
import { TfiClose } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

const EmployeeDetailsModal = ({ employee, isOpen, onClose }) => {
  if (!employee) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Employee Details"
      className="customModalStyles"
    >
      <div>
        <div
          key={employee._id}
          className="border rounded-lg  p-6 flex flex-col justify-center items-center  "
        >
          <img
            className="mx-auto h-60 w-60 rounded-2xl"
            src={employee.image}
            alt="employee photo"
          />
          <p className="text-gray-100 text-xl font-semibold">
            {" "}
            Employee ID : {employee.eID}
          </p>
          <p className="text-gray-100 text-3xl mt-3 font-semibold">
            {employee.position}
          </p>
          <div className="mt-4 text-start text-2xl">
            <p className=" font-semibold text-gray-100">
              Name : {employee.name}
            </p>

            <p className="text-gray-100">Email: {employee.email}</p>
            <p className="text-gray-100">Sex : {employee.gender}</p>
            <p className="text-gray-100">
              Phone Number : {employee.phoneNumber}
            </p>
            <p className="text-gray-100">Address :{employee.fullAddress}</p>
            <p className="text-gray-100">Current Salary : $ {employee.salary}</p>
          </div>
        </div>

        <div>
          <button
            onClick={onClose}
            className="bg-black hover:bg-white mt-2 p-1 rounded-full text-white hover:text-black text-xl"
          >
            <TfiClose />
          </button>
         
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeDetailsModal;
