import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { __AUTH, provider } from "../backend/firebaseconfig.js";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helper/Spinner.jsx";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  let navigate = useNavigate();
  let [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let [isLoading, setIsLoading] = useState(false);

  //! Destructuring the user data
  let { username, email, password, confirmPassword } = userData;

  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //! Create the user with email and password
      if (password == confirmPassword) {
        let registeredUser = await createUserWithEmailAndPassword(
          __AUTH,
          email,
          password
        );
        setIsLoading(true);
        {/*console.log(registeredUser);*/}

        //! Send email verification
        //* Returns a promise - use async and await
        sendEmailVerification(registeredUser.user);

        //! Update profile name and photo url which is not updated by default
        updateProfile(registeredUser.user, {
          displayName: username,
          photoURL:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s",
        });

        toast.success(`Email Verification link has been sent to ${email}`);
        toast.success("User has been registered successfully!");
        navigate("/auth/login");
      } else {
        toast.error("Passwords do not match!");
        setUserData({
          ...userData,
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      toast.error(error.code.slice(5));
      //~ toast.error(error.message)
    }
    setIsLoading(false);
  };

  let togglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  let togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  let [showPassword1, setShowPassword1] = useState(false);
  let [showPassword2, setShowPassword2] = useState(false);

  let googleLogin = async () => {
    setIsLoading(true);
    try {
      //! Sign in the user with gmail
      //* Returns a promise - use async and await
      let googleLoggedInUser = await signInWithPopup(__AUTH, provider);

      {/*console.log(googleLoggedInUser);*/}
      toast.success(`Logged in successfully.`);
      navigate("/");
    } catch (error) {
      toast.error(error.code.slice(5));
      //~ toast.error(error.message)
    }
    setIsLoading(false);
  };

  return (
    <section className="text-white w-[100vw] min-h-[calc(100vh-100px)] flex justify-center overflow-x-hidden items-center">
      <article className="w-[300px] md:w-[400px] scale-97 bg-gray-900 p-5 rounded-xl">
        <header className="text-center text-2xl font-bold py-3">
          <h1>Register</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-1 p-2">
            <label htmlFor="username" className="font-semibold text-lg mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your name"
              className="outline-none border border-gray-500 p-2 rounded-lg"
              name="username"
              value={username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col mb-1 p-2">
            <label htmlFor="email" className="font-semibold text-lg mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="outline-none border border-gray-500 p-2 rounded-lg"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col mb-1 p-2 relative">
            <label htmlFor="password" className="font-semibold text-lg mb-1">
              Password
            </label>
            <input
              type={showPassword1 ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="outline-none border border-gray-500 p-2 rounded-lg"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <span
              className="absolute bottom-[20px] right-[15px] cursor-pointer text-lg"
              onClick={togglePassword1}
            >
              {showPassword1 ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          <div className="flex flex-col mb-1 p-2 relative">
            <label
              htmlFor="confirmPassword"
              className="font-semibold text-lg mb-1"
            >
              Confirm Password
            </label>
            <input
              type={showPassword2 ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              className="outline-none border border-gray-500 p-2 rounded-lg"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              required
            />
            <span
              className="absolute bottom-[20px] right-[15px] cursor-pointer text-lg"
              onClick={togglePassword2}
            >
              {showPassword2 ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          <div className="flex flex-col mb-1 p-2">
            <button className="bg-blue-500 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-blue-600  mt-1">
              Register
            </button>
          </div>
        </form>
        <div className="flex flex-col mb-1 p-2">
          <button
            onClick={googleLogin}
            className="bg-white text-black flex justify-center items-center gap-2 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition-colors ease-in-out"
          >
            Sign up with{" "}
            <span className="text-2xl">
              <FcGoogle />
            </span>
          </button>
        </div>
        <div className="flex justify-center items-center hover:text-blue-300 hover:underline">
          <NavLink to={"/auth/login"}>Already have an account?</NavLink>
        </div>
      </article>
      {isLoading && (
        <section className="w-[100%] h-[100vh] bg-black/50 fixed top-0">
          <Spinner />
        </section>
      )}
    </section>
  );
};

export default Register;
