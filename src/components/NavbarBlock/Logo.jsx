import React from "react";
import BrandLogo from "../../assets/OctaveLogo.png";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <aside className="basis-[18%]">
      <NavLink to={"/"}>
        <figure className="w-full scale-90 md:scale-100 h-full flex justify-center items-center text-2xl font-medium ml-3 cursor-pointer">
          <img
            src={BrandLogo}
            alt="Octave Logo"
            title="OctaveMusic - Home"
            className="w-[70px] h-[60px]"
          />
          <p className="hidden sm:block bg-gradient-to-r from-amber-300 via-amber-200 to-amber-100 bg-clip-text text-transparent">
            OctaveMusic
          </p>
        </figure>
      </NavLink>
    </aside>
  );
};

export default Logo;
