import React, { useState } from "react";
import { BsDiscFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSparkles } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const AlbumLandingSidebar = () => {
  return (
    <aside className="bg-gray-900 min-h-[calc(100vh-70px)] sticky left-0 min-w-fit">
      <nav className="p-2">
        <ul className="w-full flex flex-col gap-2">
          <li
            title="Explore OctaveMusic"
            className="p-2 cursor-pointer hover:bg-gray-100/20 rounded flex items-center gap-3"
          >
            <span className="text-xl">
              <GiHamburgerMenu />
            </span>
            <span className="text-lg tracking-wider font-extralight uppercase hidden lg:block">
              Explore
            </span>
          </li>
          <li>
            <NavLink
              to={"/"}
              end
              title="Popular Albums"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-blue-500/50" : ""
                } p-2 font-semibold hover:bg-blue-500/80 rounded-lg cursor-pointer flex items-center gap-3`
              }
            >
              <span className="text-lg">
                <BsDiscFill />
              </span>
              <span className="text-lg hidden lg:block">Popular Albums</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                window.scrollTo({ top: 1000, behavior: "smooth" });
              }}
              to={"/"}
              end
              title="Only For You"
              className={
                "p-2 font-semibold hover:bg-blue-500/80 rounded-lg cursor-pointer flex items-center gap-3"
              }
            >
              <span className="text-xl">
                <IoSparkles />
              </span>
              <span className="text-lg hidden lg:block">Only For You</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AlbumLandingSidebar;
