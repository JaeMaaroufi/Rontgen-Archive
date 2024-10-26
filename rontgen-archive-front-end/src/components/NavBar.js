import React, { useState } from "react";
import rontgenArchiveLogo from "../assets/Rontgen_Archive_logo_text-removebg-preview.png";
import rontgenArchiveImageLogo from "../assets/logo.png";
import searchIcon from "../assets/searchIcon.png";
import ImageResults from "./ImageResults";

const NavBar = ({ toggleSidebar }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onSearch = async () => {
    console.log("Searching for:", searchValue);  // Check what you're searching for
    if (!searchValue.trim()) return;
  
    try {
      const response = await fetch(
        `http://localhost:8000/api/search-images?bodyPart=${searchValue}&modality=CT`
      );
      const data = await response.json();
  
      console.log("API response:", data);  // Log the API response
      if (response.ok) {
        setSearchResults(data.images);
      } else {
        console.error("Error fetching images:", data.error);
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <><div className="flex flex-col items-center">
      <div className="flex justify-between bg-[#e7f5ee] h-20 shadow-[0px_-20px_30px_00px_#1a202c] px-2 md:px-5 sticky top-0 2xl:justify-around z-50">
        {/* Logo and search bar */}
        <div className="flex lg:gap-4 2xl:gap-10">
          <div className="flex items-center gap-1">
            <img src={rontgenArchiveImageLogo} alt="Logo" />
            <img src={rontgenArchiveLogo} alt="Text logo" className="hidden md:block" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchValue} />
          <button onClick={onSearch}>
            <img src={searchIcon} alt="Search button" />
          </button>
        </div>
      </div>

      {/* Display search results using ImageResults component */}
      <ImageResults results={searchResults} />
    </div><div className="flex justify-between bg-[#e7f5ee] h-20 shadow-[0px_-20px_30px_00px_#1a202c] px-2 md:px-5 sticky top-0 2xl:justify-around z-50">
        <div className="flex lg:gap-4 2xl:gap-10">
          <div
            className="flex items-center gap-1 transition duration-300 hover:scale-105 cursor-pointer"
            to="/"
          >
            <img src={rontgenArchiveImageLogo} alt="Platform logo" className="size-10 xl:size-14" />
            <img src={rontgenArchiveLogo} alt="Platform logo" className="hidden md:block w-36 xl:w-52" />
          </div>

          {/* Menu items */}
          <div className="hidden xl:flex items-center font-medium gap-5">
            <div className="menu-item">LIBRARY</div>
            <div className="menu-item">CONTACT US</div>
            <div className="menu-item">ABOUT US</div>
          </div>
        </div>

        <div className="flex lg:gap-4 xl:gap-6 2xl:gap-20">
          <div className="content-center relative">
            <input
              className="bg-white h-9 w-[250px] md:w-[550px] lg:w-[800px] text-zinc-600 text-[16px] font-mono border-none outline-none duration-300 placeholder:text-zinc-600 placeholder-opacity-50 placeholder-text-[16px] rounded-full px-4 py-1 shadow-sm focus:outline-none xl:h-11 xl:w-[500px] 2xl:w-[1000px] focus:ring-0"
              autoComplete="on"
              placeholder="Search body part..."
              name="text"
              type="text"
              onChange={handleSearchValue}
              value={searchValue} />
            <button
              type="button"
              className="bg-[#4EAB74] h-[36px] flex justify-center items-center px-5 rounded-3xl self-center absolute top-[22px] right-[0px] overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]  xl:top-[18px] xl:-right-[1px] xl:h-[44px] xl:w-28"
              onClick={onSearch}
            >
              <img src={searchIcon} alt="Search button" className="w-5" />
            </button>
          </div>
        </div>

        {/* Sidebar toggle button */}
        <div className="flex xl:hidden">
          <div className="hamburger xl:hidden">
            <input className="checkbox" type="checkbox" onClick={toggleSidebar} />
            <svg fill="none" viewBox="0 0 50 50" height="45" width="45">
              <path className="lineTop line" strokeLinecap="round" strokeWidth="4" stroke="black" d="M6 11L44 11"></path>
              <path strokeLinecap="round" strokeWidth="4" stroke="black" d="M6 24H43" className="lineMid line"></path>
              <path strokeLinecap="round" strokeWidth="4" stroke="black" d="M6 37H43" className="lineBottom line"></path>
            </svg>
          </div>
        </div>

        {/* Render search results */}
        <div className="search-results-container">
          {searchResults.map((result) => (
            <div key={result.filename} className="result-item">
              <img src={result.image_data} alt={result.filename} />
              <p>{result.filename}</p>
              <p>Body Part: {result.metadata?.BodyPartExamined}</p>
              <p>Modality: {result.metadata?.Modality}</p>
            </div>
          ))}
        </div>
      </div></>
  );
};

export default NavBar;