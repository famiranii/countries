import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Country from "./Country";
import { IoMdSearch } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

export default function Countries() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchedCountry, setSearchedCountries] = useState([]);
  const [showDropdown, setDropdown] = useState(false);
  const [filteredRegion] = useState([
    "Filter by Region",
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oceania",
  ]);
  const [currentRegion,setRegion] = useState("Filter by Region");

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
      country.name.common
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(event.target.value.replace(/\s/g, ""))
    );
    setSearchedCountries(searchedCountry);
  };
  const setDropdownStatus = () => {
    setDropdown(!showDropdown);
  };

  const filterByRegion = (event) => {
    const currentRegion = event.target.innerText
    console.log(currentRegion);
    setRegion(currentRegion)
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
        <div>
          <button onClick={setDropdownStatus} className="continet-selector">
            {currentRegion}
            <BsChevronDown></BsChevronDown>
          </button>
          {showDropdown && (
            <div className="continent-options">
              {filteredRegion.map((region, index) => (
                <p
                  className="continent-option"
                  onClick={filterByRegion}
                  key={index}
                >
                  {region}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="all-countries">
        {searchedCountry.map((country, index) => (
          <Country key={index} country={country} />
        ))}
      </div>
    </div>
  );
}
