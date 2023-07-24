import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="mx-auto p-4 home-background">
      <div className="flex flex-col justify-start items-start">
        <h1 className="md:text-5xl text-2xl text-white font-bold mb-4">
          Welcome to WorkFlow Master
        </h1>
        <h2 className="text-xl text-white font-semibold">
          Manage Your Employee
        </h2>
        <button className="px-6 py-3 btn btn-outline text-white rounded-md shadow-lg mt-5">
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
