import React from "react";
import { RiFolderMusicFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="min-h-[calc(100vh-70px)] w-fit bg-gray-900">
      <nav className="w-full p-2 mt-2">
        <ul className="w-full text-md">
          <li>
            <NavLink
              to={"/admin"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-blue-500/50" : ""
                } p-2 font-semibold hover:bg-blue-500/80 rounded-lg cursor-pointer flex justify-center items-center gap-2`
              }
              end
              title="Create Album"
            >
              <span className="text-xl">
                <RiFolderMusicFill />
              </span>
              <span className="hidden md:block ml-1 transition-all">
                Create Album
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
