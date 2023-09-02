import React from "react";
import { Link } from "react-router-dom";

export default function Country({country}) {
  return (
    <Link to={`Details/${country.name.common}`} className="country">
      <img loading="lazy" className="flag" src={country.flags.svg} alt="falg" />
      <div className="country-info">
        <h3 className="country-name"> {country.name.common}</h3>
        <div className="about-country">
          <strong>Population : </strong>
          <span className="value">{country.population.toLocaleString()}</span>
        </div>
        <div className="about-country">
          <strong>Region : </strong>
          <span className="value">{country.region}</span>
        </div>
        <div  className="about-country">
          <strong>Capital : </strong>
          <span className="value">{country.capital}</span>
        </div>
      </div>
    </Link>
  );
}
