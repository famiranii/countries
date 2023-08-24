import React, { useState } from "react";
import "../App.css";
import { HiOutlineMoon } from "react-icons/hi";
import { FaMoon } from "react-icons/fa";

export default function Header({ changeTaskMode }) {
  const [darkMode, setMode] = useState(false);
  const changeMode = () => {
    setMode(!darkMode);
    changeTaskMode(!darkMode);
  };
  return (
    <header className="header">
      <h1 className="title">Where in the world</h1>
      <div className="dark-mode-header" onClick={changeMode}>
        {darkMode ? (
          <FaMoon className="dark-icon"></FaMoon>
        ) : (
          <HiOutlineMoon className="dark-icon"></HiOutlineMoon>
        )}
        <span>Dark Mode</span>
      </div>
    </header>
  );
}
