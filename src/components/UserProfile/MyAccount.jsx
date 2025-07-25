import React, { useContext } from "react";
import { FaUserXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { AuthUserContext } from "../../context/AuthContextApi";
import { BackendUserContext } from "../../context/FetchUserContext";
import { TbPhotoEdit } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";

const MyAccount = () => {
  let { authUser } = useContext(AuthUserContext);
  let { userData } = useContext(BackendUserContext);
  {/*console.log(userData);*/}

  return (
    <section className="min-h-[100%] m-5 flex justify-center items-center pt-[70px]">
      <article className="w-full bg-gray-700 flex-wrap flex flex-col justify-center p-2 rounded-lg">
        <header className="w-full h-fit p-3 relative bg-gray-900 flex-wrap rounded-lg flex flex-col gap-2 justify-center items-center">
          <img
            src={authUser?.photoURL}
            alt=""
            className="w-[120px] h-[120px] border rounded-full mt-[-100px]"
          />
          <h1 className="font-bold capitalize text-lg">
            {authUser?.displayName}
          </h1>
          <p>{authUser?.email}</p>
          <span className="p-2 rounded-full absolute top-0 right-[40%] bg-gray-700 text-white cursor-pointer text-2xl hover:bg-white hover:text-black">
            <NavLink to={"/user/profile/upload-profile-photo"}>
              <TbPhotoEdit />
            </NavLink>
          </span>
        </header>
        <main className="w-fit flex flex-col flex-wrap justify-center items-center">
          <div className="w-full flex justify-between gap-2 items-center px-3">
            <h1 className="text-center text-2xl font-bold uppercase py-3">
              Personal Details
            </h1>
            <span className="flex justify-center items-center"><NavLink to={"/user/profile/add-profile"} state={userData} className={`p-2 bg-blue-400 rounded-md cursor-pointer hover:bg-blue-500/80 flex justify-center items-center gap-2`}><BiEdit /> <span>Edit</span></NavLink></span>
          </div>
          {userData === null ? (
            <aside className="w-full">
              <div className="flex flex-col justify-center items-center">
                <FaUserXmark className="text-9xl" />
                <h1 className="text-lg">User Data Not Found!!</h1>
              </div>
              <div className="flex justify-center items-center">
                <NavLink
                  to={"/user/profile/add-profile"}
                  className={
                    "py-2 px-10 my-5 bg-blue-600 rounded-lg text-lg font-semibold cursor-pointer"
                  }
                >
                  Add Profile
                </NavLink>
              </div>
            </aside>
          ) : (
            <aside className="w-full flex flex-col justify-center items-center">
              <article className="w-full flex flex-col md:flex-row gap-3 p-2">
                <div className="w-full flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <span className="text-lg font-semibold py-1">Name</span>
                  <span className="border w-max h-max border-gray-600 rounded text-gray-300 px-3">
                    {userData?.username}
                  </span>
                </div>
                <div className="w-full flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <span className="text-lg font-semibold py-1">Contact</span>
                  <span className="border w-full h-max border-gray-600 rounded text-gray-300 px-3">
                    {userData?.contactNumber}
                  </span>
                </div>
                <div className=" w-full flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <span className="text-lg font-semibold py-1">Gender</span>
                  <span className="border w-full h-max border-gray-600 rounded text-gray-300 px-3">
                    {userData?.gender}
                  </span>
                </div>
              </article>
              <article className="w-full flex flex-col md:flex-row gap-3 p-2">
                <div className="w-full flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <span className="text-lg font-semibold py-1">DOB</span>
                  <span className="border w-full h-max border-gray-600 rounded text-gray-300 px-3">
                    {userData?.dob}
                  </span>
                </div>
                <div className="w-fit flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <span className="text-lg font-semibold py-1">Age</span>
                  <span className="border w-full h-max border-gray-600 rounded text-gray-300 px-3">
                    {userData?.age}
                  </span>
                </div>
                <div className="w-full flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <span className="text-lg font-semibold py-1">Language</span>
                  <span className="border w-full h-max border-gray-600 rounded text-gray-300 px-3">
                    {userData?.lang}
                  </span>
                </div>
              </article>
              <article className="w-full flex flex-col md:flex-row gap-3 p-2">
                <div className="w-full flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <span className="text-lg font-semibold py-1">Country</span>
                  <span className="border w-full h-max border-gray-600 rounded text-gray-300 px-3">
                    {userData?.country}
                  </span>
                </div>
                <div className="w-full flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <span className="text-lg font-semibold py-1">State</span>
                  <span className="border w-full h-max border-gray-600 rounded text-gray-300 px-3">
                    {userData?.state}
                  </span>
                </div>
                <div className="w-full flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <span className="text-lg font-semibold py-1">City</span>
                  <span className="border w-full h-max border-gray-600 rounded text-gray-300 px-3">
                    {userData?.city}
                  </span>
                </div>
              </article>
              <article className="w-full flex p-2">
                <div className="w-full flex items-center gap-2 bg-gray-800 p-4 rounded">
                  <span className="text-lg font-semibold py-1">Address</span>
                  <span className="border w-full h-max border-gray-600 rounded text-gray-300 px-3">
                    {userData?.address}
                  </span>
                </div>
              </article>
            </aside>
          )}
        </main>
      </article>
    </section>
  );
};

export default MyAccount;
