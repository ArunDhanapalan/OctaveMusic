import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { __AUTH } from "../backend/firebaseconfig";

const ResetPassword = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  let handleInputChange = (e) => {
    let value = e.target.value;
    setEmail(value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //! Reset Password functionality provided by Firebase
      //* Returns a promise - use async and await
      await sendPasswordResetEmail(__AUTH, email);
      toast.success(`Reset Password link has been sent to ${email}`);
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.code.slice(5));
      //~ error.message also acceptable
      setIsLoading(false);
    }
  };

  return (
    <section className="text-white w-[100vw] min-h-[80vh] mt-[5vh] flex justify-center items-center">
      <article className="w-[300px] md:w-[400px] bg-gray-700 p-5 rounded-xl">
        <header className="text-center text-2xl font-bold py-3">
          <h1>Reset Password</h1>
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
              onChange={handleInputChange}
              value={email}
              required
            />
            <span className="absolute bottom-[20px] right-[15px] text-lg">
              <FaUser />
            </span>
          </div>

          <div className="flex flex-col mb-1 p-2">
            <button className="bg-blue-500 py-2 text-lg font-semibold rounded-lg cursor-pointer hover:bg-blue-600">
              Reset Password
            </button>
          </div>
          <div className="flex justify-center items-center hover:text-blue-300 hover:underline">
            <NavLink to={"/auth/login"}>Cancel</NavLink>
          </div>
        </form>
      </article>
      {isLoading && (<section className="w-[100%] h-[100vh] bg-black/50 fixed top-0">
        <Spinner />
      </section>)}
    </section>
  );
};

export default ResetPassword;
