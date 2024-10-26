// import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 top-20 right-0 bg-[#e7f5ee] bg-opacity-80 backdrop-filter backdrop-blur-sm z-50 text-white w-64 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <nav>
        <ul className="text-start">
          <Link
            className="block p-3 text-md text-black font-medium  hover:bg-[#4EAB74] cursor-pointer relative  overflow-hidden transition-all duration-500 ease-in-out hover:scale-100 hover:shadow-md before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before: hover:before:left-0"
            to="/"
          >
            Home
          </Link>
          <Link className="block p-3 text-md text-black font-medium  hover:bg-[#4EAB74] cursor-pointer relative  overflow-hidden transition-all duration-500 ease-in-out hover:scale-100 hover:shadow-md before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before: hover:before:left-0">
            Market place
          </Link>
          <Link
            className="block p-3 text-md text-black font-medium  hover:bg-[#4EAB74] cursor-pointer relative  overflow-hidden transition-all duration-500 ease-in-out hover:scale-100 hover:shadow-md before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before: hover:before:left-0"
            to="/blogs"
          >
            Blogs
          </Link>
          <Link className="block p-3 text-md text-black font-medium  hover:bg-[#4EAB74] cursor-pointer relative  overflow-hidden transition-all duration-500 ease-in-out hover:scale-100 hover:shadow-md before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before: hover:before:left-0">
            Adoption
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
