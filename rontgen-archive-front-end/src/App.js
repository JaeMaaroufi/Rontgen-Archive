import "./App.css";
import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import LandingPage from "./components/LandingPage";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavBar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <LandingPage />
    </div>
  );
}

export default App;
