import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaCrown } from "react-icons/fa";
import Modal from "react-modal";
import { motion } from "framer-motion"; // Import motion from framer-motion

Modal.setAppElement("#root");

const Home = () => {
  const { user } = useContext(AuthContext);
  const [isAdminEmail, setIsAdminEmail] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const userName = user?.displayName || "Dear";

  const adminEmails = ["mursalinhossain377@gmail.com", "demo@gmail.com", ""];

  useEffect(() => {
    if (user && adminEmails.includes(user.email) && !isAdminEmail) {
      setIsAdminEmail(true);
    }
  }, [user, isAdminEmail]);

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting;
  if (currentHour >= 6 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  return (
    <div className="mx-auto p-4 home-background">
      <div className="flex flex-col justify-center items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:text-5xl text-2xl text-white font-bold mb-2"
        >
          {greeting}, {userName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-stone-50 text-lg"
        >
          Hopefully, you are using your time well, remember, time is money!
        </motion.p>
        {isAdminEmail && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-stone-50 text-lg flex items-center gap-2 mt-2"
          >
            You are Admin <FaCrown className="text-yellow-400 text-xl" />
          </motion.p>
        )}
        <h2 className="text-lg text-white font-semibold mt-2"></h2>
        {!user ? (
          <NavLink
            to={"/login"}
            className="px-4 py-2 btn btn-outline text-white rounded-md shadow-lg mt-4"
          >
            Login
          </NavLink>
        ) : (
          " "
        )}

        {/* Info button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute left-0 bottom-0 p-2 m-4 text-white bg-blue-500 rounded-md hidden md:block"
          onClick={() => setModalIsOpen(true)}
        >
          Info
        </motion.button>
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute right-0 bottom-0 p-2 m-4 text-white bg-blue-500 rounded-md block md:hidden"
          onClick={() => setModalIsOpen(true)}
        >
          Info
        </motion.button>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Info Modal"
          className="modal-content"
          style={{
            overlay: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            },
            content: {
              maxWidth: "400px",
              width: "90%",
              padding: "20px",
              textAlign: "center",
            },
          }}
        >
          <div className=" border bg-black bg-opacity-90 rounded-3xl  ">
            <p className="text-lg text-white p-6  text-start">
              <span className="font-bold">
                {" "}
                Welcome to the Workflow Master!
              </span>{" "}
              <br />
              <br />
              If you'd like to explore this website as an employee, here's a
              demo{" "}
              <span className="font-bold">
                <br /> email: any@gmail.com <br /> password: Aa@123 <br />
                <br />
              </span>{" "}
              If you're interested in accessing the admin panel, here are demo{" "}
              <span className="font-bold text">
                {" "}
                <br /> email: demo@gmail.com <br /> password: Aa@123
              </span>
              <br />
              <br /> Thank you have a nice day.
            </p>
            {/* Add the demo login information here */}
          </div>
          <button
            className="mt-4 px-4 py-2 btn btn-outline text-black rounded-md shadow-md"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
