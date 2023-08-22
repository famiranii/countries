import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Country from "./Country";
import { IoMdSearch } from "react-icons/io";

export default function Countries() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchedCountry, setSearchedCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setAllCountries(response.data);
        setSearchedCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchCountry = (event) => {
    const searchedCountry = allCountries.filter((country) =>
      country.name.common.replace(/\s/g, '').toLowerCase().includes(event.target.value.replace(/\s/g, ''))
    );
    setSearchedCountries(searchedCountry);
  };

  return (
    <div className="container light-mode">
      <Header />
      <div className="filter-country">
        <div className="input-div-country">
          <IoMdSearch className="bi-search"></IoMdSearch>
          <input
            className="input-country"
            placeholder="Searching for countery..."
            onChange={searchCountry}
          />
        </div>
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
        {searchedCountry.map((country, index) => (
          <Country key={index} country={country} />
        ))}
      </div>
    </div>
  );
}
