import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";

export default function BordersBtn(props) {
  return (
    <Link to={`../Details/${props.border.name}`}>
      <button className="border-btn">{props.border.name}</button>
    </Link>
  );
}
