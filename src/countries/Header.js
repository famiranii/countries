import React from "react";
import '../App.css'
import { HiOutlineMoon } from "react-icons/hi";

export default function Header() {
  return (
    <header className="header">
      <h1 className="title">Where in the world</h1>
      <div className="dark-mode">
        <HiOutlineMoon className="dark-icon"></HiOutlineMoon>
        <span>Dark Mode</span>
      </div>
    </header>
  );
}
