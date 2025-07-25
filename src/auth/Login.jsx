import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { __AUTH, provider } from "../backend/firebaseconfig";
import toast from "react-hot-toast";
import Spinner from "../helper/Spinner";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  let navigate = useNavigate();
  let [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  let { email, password } = userData;

  let [showPassword, setShowPassword] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  let handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  let togglePassword = () => {
    setShowPassword(!showPassword);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //! Sign in the user with email and password
      //* Returns a promise - use async and await
      let loggedInUser = await signInWithEmailAndPassword(
        __AUTH,
        email,
        password
      );

      {/*console.log(loggedInUser);*/}
      if (loggedInUser.user.emailVerified === true) {
        toast.success(`Logged in into ${email}`);
        navigate("/");
      } else {
        toast.error("Email is not yet verified.");
        sendEmailVerification(loggedInUser.user);
        toast.success(
          "We have sent a verification email to your registered email"
        );
      }
    } catch (error) {
      toast.error(error.code.slice(5));
      //~ toast.error(error.message)
      setUserData({
        ...userData,
        password: "",
      });
    }
    setIsLoading(false);
  };

  let googleLogin = async () => {
    setIsLoading(true);
    try {
      //! Sign in the user with gmail
      //* Returns a promise - use async and await
      let googleLoggedInUser = await signInWithPopup(
        __AUTH,
        provider
      );

     {/* console.log(googleLoggedInUser);*/}
        toast.success(`Logged in successfully.`);
        navigate("/");
    } catch (error) {
      toast.error(error.code.slice(5));
      //~ toast.error(error.message)
    }
    setIsLoading(false);
  };
  return (
    <section className="text-white w-[100vw] min-h-[80vh] flex justify-center items-center transition-all overflow-visible">
      <article className="sm:w-[300px] md:w-[400px] my-[5vh] bg-gray-900 p-5 rounded-xl">
        <header className="text-center text-2xl font-bold py-3">
          <h1>Login</h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-1 p-2 relative">
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
            <span className="absolute bottom-[20px] right-[15px] text-lg">
              <FaUser />
            </span>
          </div>
          <div className="flex flex-col mb-1 p-2 relative">
            <label htmlFor="password" className="font-semibold text-lg mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
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
              onClick={togglePassword}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          <div className="flex flex-col mb-1 p-2">
            <button className="bg-blue-500 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-blue-600">
              Login
            </button>
          </div>
        </form>
        <div className="flex flex-col mb-1 p-2">
          <button
            onClick={googleLogin}
            className="bg-white text-black flex justify-center items-center gap-2 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition-colors ease-in-out"
          >
            Sign in with{" "}
            <span className="text-2xl">
              <FcGoogle />
            </span>
          </button>
        </div>
        <div className="flex justify-center items-center hover:text-blue-300 hover:underline mb-2">
          <NavLink to={"/auth/register"}>Don't have an account?</NavLink>
        </div>
        <div className="flex justify-center items-center hover:text-blue-300 hover:underline">
          <NavLink to={"/auth/reset-password"}>Forgot Pasword?</NavLink>
        </div>
      </article>
      {isLoading && (
        <section className="w-[100%] h-[100vh] fixed top-0">
          <Spinner />
        </section>
      )}
    </section>
  );
};

export default Login;
