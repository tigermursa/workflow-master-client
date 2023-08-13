import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const UpdateEmployeInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [id]);

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("position", user.position);
      setValue("email", user.email);
      setValue("gender", user.gender);
      setValue("phoneNumber", user.phoneNumber);
      setValue("fullAddress", user.fullAddress);
      setValue("eID", user.eID);
      setValue("salary", user.salary);
      setValue("salaryStatus", user.salaryStatus);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${user.email}`,
        data
      );
      if (response.status === 200) {
        Swal.fire(
          "Success",
          "Employee information updated successfully",
          "success"
        );
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      Swal.fire("Error", "No changes!", "error");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center mt-96 mb-96">
        <span className="loading loading-bars loading-lg "></span>
      </div>
    );
  }

  return (
    <div className="pt-5   text-start flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 to-gray-700 employee-bg">
      <h2 className="text-2xl text-white font-semibold mb-4">
        Edit Employee Details info
      </h2>
      <form
        className="bg-white p-4 rounded-lg  shadow-2xl w-6/12 mb-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            className="form-input w-full border-2 p-2 rounded-md"
            type="text"
            {...register("name")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 ">
            Position
          </label>
          <input
            className="form-input w-full  border-2 p-2 rounded-md"
            type="text"
            {...register("position")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            className="form-input w-full  border-2 p-2 rounded-md"
            type="email"
            {...register("email")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Gender</label>
          <input
            className="form-input w-full  border-2 p-2 rounded-md"
            type="text"
            {...register("gender")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input
            className="form-input w-full  border-2 p-2 rounded-md"
            type="tel"
            {...register("phoneNumber")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Full Address
          </label>
          <input
            className="form-input w-full border-2 p-2 rounded-md"
            type="text"
            {...register("fullAddress")}
          />
        </div>

        <div className="flex">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Employee ID
            </label>
            <input
              className="form-input w-full border-2 p-2 rounded-md"
              type="text"
              {...register("eID")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Salary (USD)
            </label>
            <input
              className="form-input w-full border-2 p-2 rounded-md"
              type="text"
              {...register("salary")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Salary status
            </label>
            <select
              className="form-select w-full border-2 p-2 rounded-md"
              {...register("salaryStatus")}
            >
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Info
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployeInfo;
