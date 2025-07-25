import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthUserContext } from "../../context/AuthContextApi";
import { HiOutlineLogout } from "react-icons/hi";
import { MdHomeFilled } from "react-icons/md";
import { BackendUserContext } from "../../context/FetchUserContext";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";

const Menu = () => {
  let { authUser, logout } = useContext(AuthUserContext);
  /* console.log(authUser); */

  let { userData } = useContext(BackendUserContext);
  let role = userData?.role;
  /* console.log(role); */

  //! This is for the unkown user - first time
  let AnonymousUser = () => {
    return (
      <>
        <li>
          <NavLink
            to={"/auth/login"}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-700" : ""
              }  px-4 py-2 font-semibold hover:bg-blue-600 rounded-lg cursor-pointer`
            }
          >
            Login
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/auth/register"}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-700" : ""
              }  px-4 py-2 font-semibold hover:bg-blue-600 rounded-lg cursor-pointer`
            }
          >
            Register
          </NavLink>
        </li>
      </>
    );
  };

  //! This is for the authenticated user - verified user
  let AuthenticatedUser = () => {
    return (
      <>
        {role === "admin" && (
          <li>
            <NavLink
              to={"/admin"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-amber-700" : ""
                }  px-4 py-2 font-semibold hover:bg-amber-600 rounded-lg cursor-pointer flex justify-center items-center gap-2`
              }
            >
              <span className="text-xl">
                <RiAdminFill />
              </span>
              <span className="hidden sm:block">Admin</span>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to={"/user/profile"}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-700" : ""
              }  px-4 py-2 font-semibold hover:bg-blue-600 rounded-lg cursor-pointer flex justify-center items-center gap-2`
            }
          >
            <span className="w-full h-full">
              <img
                src={authUser?.photoURL}
                alt="Profile"
                className="h-[25px] w-[25px] rounded-full"
              />
            </span>
            <span className="hidden md:block capitalize whitespace-nowrap">
              {authUser?.displayName}
            </span>
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => logout()}
            className={`display: flex justify-center items-center px-4 py-2 font-semibold hover:bg-red-600/80 rounded-lg cursor-pointer`}
          >
            <span className="hidden sm:block">Logout</span>
            <span className="sm:ml-2 text-xl">
              <HiOutlineLogout />
            </span>
          </button>
        </li>
      </>
    );
  };
  return (
    <aside className="h-[70px] text-[15px]">
      <ul className="w-full h-[70px] flex sm:justify-evenly gap-1 sm:gap-2 items-center text-gray-300 hover:text-white transition-all duration-200 ease-linear">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-700" : ""
              }  px-4 py-2 font-semibold hover:bg-blue-600 rounded-lg flex justify-center items-center cursor-pointer gap-2`
            }
          >
            <span className="text-2xl">
              <MdHomeFilled />
            </span>
            <span className="hidden sm:block">Home</span>
          </NavLink>
        </li>
        {authUser === null ? <AnonymousUser /> : <AuthenticatedUser />}
      </ul>
    </aside>
  );
};

export default Menu;
