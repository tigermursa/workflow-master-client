import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { storage } from "../firebaseConfig/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import Spinner from "../Private/Spiner";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [userPhoto, setUserPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const {
      email,
      password,
      confirm,
      username,
      gender,
      phone,
      address,
      position,
      employeeID,
      role,
    } = data;
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must contain at least one capital letter!");
      setLoading(false);
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setError("Password must contain at least one special character!");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError("Password did not match!");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const url = await uploadImageToStorage();
      await createUser(
        email,
        password,
        username,
        url,
        gender,
        phone,
        address,
        position,
        employeeID
      );
      setLoading(false);
      navigate(from) || "/login";
      setPhotoUrl(null);
      const saveUser = {
        name: data.username,
        email: data.email,
        image: url,
        gender: gender,
        phoneNumber: phone,
        fullAddress: address,
        position: position,
        eID: employeeID,
        role: "null",
      };
      fetch(`https://workflow-master-server.vercel.app/users`, {
        method: "POSt",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      });
      Swal.fire({
        title: "Great",
        text: " Employee  account  created successfully!",
        icon: "success",
      });
    } catch (error) {
      setLoading(false);
      setError("Error occurred!");
      console.log(error);
    }
  };

  const handlePhotoChange = (event) => {
    setUserPhoto(event.target.files[0]);
  };

  const uploadImageToStorage = async () => {
    if (!userPhoto) {
      return null;
    }
    const imageRef = ref(storage, `images/${userPhoto.name}`);
    await uploadBytes(imageRef, userPhoto);
    const url = await getDownloadURL(imageRef);
    setPhotoUrl(url);
    return url;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-0">
      {loading ? (
        <div className="flex justify-center items-center mt-96 mb-96">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="bg-img">
          <div className="content rounded-md">
            <header>Sign up Form</header>
            <h1 className="text-red-600 font-bold mb-10 text-2xl ">{error}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field mb-4 rounded-full">
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Employee name"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-red-600">Username is required</span>
                )}
              </div>
              <div className="field mb-4 p-1 ps-3 pt-2 rounded-full">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>
              <div className="field rounded-full">
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  name="email"
                  required
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="field rounded-full mt-4">
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  name="gender"
                  required
                  placeholder="Gender"
                  {...register("gender", { required: true })}
                />
                {errors.gender && (
                  <span className="text-red-600">Gender is required</span>
                )}
              </div>
              <div className="field rounded-full  mt-4">
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="Phone Number"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <span className="text-red-600">Phone Number is required</span>
                )}
              </div>
              <div className="field rounded-full  mt-4 pe-3">
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Full Address"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span className="text-red-600">Address is required</span>
                )}
              </div>
              <div className="field rounded-full  mt-4">
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  name="position"
                  required
                  placeholder="Position"
                  {...register("position", { required: true })}
                />
                {errors.address && (
                  <span className="text-red-600">Position is required</span>
                )}
              </div>
              <div className="field rounded-full  mt-4">
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  name=" employeeID"
                  required
                  placeholder=" employee unique ID"
                  {...register("employeeID", { required: true })}
                />
                {errors.address && (
                  <span className="text-red-600">id is required</span>
                )}
              </div>
              <div className="field space rounded-full">
                <span className="fa fa-lock"></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-key"
                  name="password"
                  required
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-600">Password is required</span>
                )}
                <span className="show" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="field space rounded-full">
                <span className="fa fa-lock"></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-key"
                  name="confirm"
                  required
                  placeholder="Confirm Password"
                  {...register("confirm", { required: true })}
                />
                {errors.confirm && (
                  <span className="text-red-600">
                    Confirm Password is required
                  </span>
                )}
                <span className="show" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="pass text-white hidden">
                <p>Forgot Password?</p>
              </div>
              <button className="field mt-5 bg-black rounded-full">
                <input
                  className="rounded-full"
                  type="submit"
                  value="SIGN UP NEW EMPLOYEE"
                />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
