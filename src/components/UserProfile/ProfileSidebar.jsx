import React from "react";
import { IoPersonAdd } from "react-icons/io5";
import {
  MdAccountCircle,
  MdAddPhotoAlternate,
  MdDeleteForever,
} from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const ProfileSidebar = () => {
  return (
    <aside className="bg-gray-900 min-h-full z-40">
      <nav className="">
        <ul className="p-2 mt-2 flex flex-col gap-2">
          <li>
            <NavLink
              to={"/user/profile"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-blue-500/50" : ""
                } p-2 font-semibold hover:bg-blue-500/80 rounded-lg cursor-pointer flex items-center gap-3`
              }
              end
              title="My Account"
            >
              <span className="text-xl">
                <MdAccountCircle />
              </span>
              <span className="hidden lg:block transition-all">
                My Account
              </span>
            </NavLink>
          </li>
          <li className="">
            <NavLink
              to={"add-profile"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-blue-500/50" : ""
                }  p-2 font-semibold hover:bg-blue-500/80 rounded-lg cursor-pointer flex items-center gap-3`
              }
              title="Add Profile"
            >
              <span className="text-xl">
                <IoPersonAdd />
              </span>
              <span className="hidden lg:block">Add Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/user/profile/upload-profile-photo"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-blue-500/50" : ""
                }  p-2 font-semibold hover:bg-blue-500/80 rounded-lg cursor-pointer flex items-center gap-3`
              }
              title="Profile Photo"
            >
              <span className="text-xl">
                <MdAddPhotoAlternate />
              </span>
              <span className="hidden lg:block">Upload Profile Photo</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/user/profile/change-password"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-blue-500/50" : ""
                }  p-2 font-semibold hover:bg-blue-500/80 rounded-lg cursor-pointer flex items-center gap-3`
              }
              title="Change Password"
            >
              <span className="text-xl">
                <RiLockPasswordFill />
              </span>
              <span className="hidden lg:block">Change Password</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/user/profile/delete-account"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-blue-500/50" : ""
                }  p-2 font-semibold hover:bg-blue-500/80 rounded-lg cursor-pointer flex items-center gap-3`
              }
              title="Delete Account"
            >
              <span className="text-xl">
                <MdDeleteForever />
              </span>
              <span className="hidden lg:block">Delete Account</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
