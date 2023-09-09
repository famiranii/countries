import React from "react";
import { Link } from "react-router-dom";

export default function BordersBtn({border}) {
  return (
    <Link to={`../Details/${border}`}>
      <button className="border-btn">{border}</button>
    </Link>
  );
}
