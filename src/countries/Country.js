import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function Country(props) {
  const data = props.country;
  return (
    <Link to={`Details/${data.name.common}`} className="country">
      <img className="flag" src={data.flags.svg} alt="falg" />
      <div className="country-info">
        <h3 className="country-name"> {data.name.common}</h3>
        <div className="about-country">
          <strong>Population : </strong>
          <span className="value">{data.population.toLocaleString()}</span>
        </div>
        <div className="about-country">
          <strong>Region : </strong>
          <span className="value">{data.region}</span>
        </div>
        <div  className="about-country">
          <strong>Capital : </strong>
          <span className="value">{data.capital}</span>
        </div>
      </div>
    </Link>
  );
}
