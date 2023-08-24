import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Country from "./Country";
import { IoMdSearch } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";

export default function Countries() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountry, setFilteredCountries] = useState([]);
  const [searchedCountry, setSearchedCountries] = useState([]);
  const [isSearchedCountry, setIsSearchedCountry] = useState("");
  const [showDropdown, setDropdown] = useState(false);
  const [filteredRegion] = useState([
    "Filter by Region",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ]);
  const [currentRegion, setRegion] = useState("Filter by Region");
  const [darkMode, setDarkMode] = useState(false);
  console.log(localStorage.getItem("darkMode"));
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setAllCountries(response.data);
        setFilteredCountries(response.data);
        setSearchedCountries(response.data);
        const borders = response.data.map((country) => ({
          border: country.cca3,
          name: country.name.common,
        }));

        console.log(borders);
        localStorage.setItem("borders", JSON.stringify(borders));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const searchCountry = (event) => {
    setIsSearchedCountry(event.target.value);
    const searchedCountry = filteredCountry.filter((country) =>
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
    const currentRegion = event.target.innerText;
    if (currentRegion !== "Filter by Region") {
      const filteredCountry = allCountries.filter(
        (country) => country.region === currentRegion
      );
      setFilteredCountries(filteredCountry);
      setSearchedCountries(filteredCountry);
    } else {
      setFilteredCountries(allCountries);
      setSearchedCountries(allCountries);
    }
    setRegion(currentRegion);
    setIsSearchedCountry("");
  };

  const changeMode = (mode) => {
    setDarkMode(mode);
  };
  return (
    <div className={`${darkMode ? "dark-mode" : "light-mode"}`}>
      <Header changeTaskMode={changeMode} />
      <div className="filter-country">
        <div className="input-div-country">
          <IoMdSearch className="bi-search"></IoMdSearch>
          <input
            className="input-country"
            placeholder="Searching for countery..."
            value={isSearchedCountry}
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
