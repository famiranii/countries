import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

export default function Countries() {
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        console.log(response.data[1].name.common);
        setAllCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container light-mode">
      <Header />
      <div className="filter-countery">
        <input className="input-countery" placeholder="Searching for countery..." />
        <select className="continet-selector">
          <option>Filter by Region</option>
          <option>Africa</option>
          <option>Amrica</option>
          <option>Asia</option>
          <option>Urope</option>
          <option>Oceania</option>
        </select>
      </div>
      <div className="all-countries">
        {allCountries.map((country, index) => (
          <div key={index} className="country">
            <h1>{country.name.common}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
