import React from "react";
import { FaUserShield, FaUserTie, FaHome } from "react-icons/fa";
import {
  MdOutlineAttachMoney,
  MdArrowCircleUp,
  MdManageAccounts,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
const NavbarForPhone = () => {
  return (
    <div>
      <div className="flex justify-between text-3xl p-5">
        <NavLink to="/dashboard/allemployees">
          {" "}
          <FaUserTie />
        </NavLink>
        <NavLink to="/dashboard/salary">
          {" "}
          <MdOutlineAttachMoney />
        </NavLink>
        <NavLink to="/dashboard/topattendance">
          {" "}
          <MdArrowCircleUp />
        </NavLink>
        <NavLink to="/dashboard/signup">
          {" "}
          <MdManageAccounts />
        </NavLink>
        <NavLink to="/">
          {" "}
          <FaHome />
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarForPhone;
