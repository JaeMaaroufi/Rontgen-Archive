// import React, { useState } from "react";
// import { Link } from "react-router-dom";

import rontgenArchiveLogo from "../assets/Rontgen_Archive_logo_text-removebg-preview.png";
import rontgenArchiveImageLogo from "../assets/logo.png";
import searchIcon from "../assets/searchIcon.png";

const NavBar = ({ toggleSidebar }) => {
  return (
    <div className="flex justify-between bg-[#e7f5ee] h-20 shadow-[0px_-20px_30px_00px_#1a202c] px-2 md:px-5 sticky top-0 2xl:justify-around z-50">
      <div className="flex lg:gap-4 2xl:gap-10">
        <div
          className="flex items-center gap-1 transition duration-300 hover:scale-105 cursor-pointer"
          to="/"
        >
          <img
            src={rontgenArchiveImageLogo}
            alt="Pet connect platform logo"
            className="size-10 xl:size-14"
          />

          <img
            src={rontgenArchiveLogo}
            alt="Pet connect platform logo"
            className="hidden md:block w-36 xl:w-52"
          />
        </div>

        <div className="hidden xl:flex items-center font-medium gap-5">
          <div className="text-md text-black hover:text-white hover:bg-[#4EAB74] h-[50px] my-3 flex items-center justify-center rounded-3xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 lg:w-[90px] xl:w-[120px]">
            LIBRARY
          </div>
          <div className="text-md text-black hover:text-white hover:bg-[#4EAB74] h-[50px] my-3 flex items-center justify-center rounded-3xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 lg:w-[90px] xl:w-[120px]">
            CONTACT US
          </div>
          <div className="text-md text-black hover:text-white hover:bg-[#4EAB74] h-[50px] my-3 flex items-center justify-center rounded-3xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 lg:w-[90px] xl:w-[120px]">
            ABOUT US
          </div>
        </div>
      </div>

      <div className="flex lg:gap-4 xl:gap-6 2xl:gap-20">
        <div className="content-center relative">
          <input
            className="bg-white h-9 w-[250px] md:w-[550px] lg:w-[800px] text-zinc-600 text-[16px] font-mono border-none outline-none duration-300 placeholder:text-zinc-600 placeholder-opacity-50 placeholder-text-[16px] rounded-full px-4 py-1 shadow-sm focus:outline-none xl:h-11 xl:w-[500px] 2xl:w-[1000px] focus:ring-0"
            autoComplete="on"
            placeholder="Search..."
            name="text"
            type="text"
          />
          <button
            type="button"
            className="bg-[#4EAB74] h-[36px] flex justify-center items-center px-5 rounded-3xl self-center absolute top-[22px] right-[0px] overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]  xl:top-[18px] xl:-right-[1px] xl:h-[44px] xl:w-28"
          >
            <img src={searchIcon} alt="Search button" className="w-5" />
          </button>
        </div>
      </div>
      <div className="flex xl:hidden">
        <div className="flex items-center">
          <div className="hamburger xl:hidden">
            <input
              className="checkbox"
              type="checkbox"
              onClick={toggleSidebar}
            />
            <svg fill="none" viewBox="0 0 50 50" height="45" width="45">
              <path
                className="lineTop line"
                strokeLinecap="round"
                strokeWidth="4"
                stroke="black"
                d="M6 11L44 11"
              ></path>
              <path
                strokeLinecap="round"
                strokeWidth="4"
                stroke="black"
                d="M6 24H43"
                className="lineMid line"
              ></path>
              <path
                strokeLinecap="round"
                strokeWidth="4"
                stroke="black"
                d="M6 37H43"
                className="lineBottom line"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
