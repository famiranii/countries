import React, { useEffect, useState } from "react";
// import axios from "axios";
import Country from "./Country";
import { IoMdSearch } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import Error from "../../components/Error";
import { countries } from "../../components/GetApi";

export default function Countries() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountry, setFilteredCountries] = useState([]);
  const [searchedCountry, setSearchedCountries] = useState([]);
  const [isSearchedCountry, setIsSearchedCountry] = useState("");
  const [showDropdown, setDropdown] = useState(false);
  const [status, setStatus] = useState("loading");

  //question about continent ?????
  const [filteredRegion, setFilteredRegion] = useState([]);
  const [currentRegion, setRegion] = useState("Filter by Region");
  useEffect(() => {
    countries()
      .then((data) => {
        console.log(data);
        setAllCountries(data);
        setFilteredCountries(data);
        setSearchedCountries(data);
        setStatus("response");
        const region = Array.from(
          new Set(data.map((countery) => countery.region))
        );
        region.push("Filter by Region");
        console.log(region);
        setFilteredRegion(region);
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, []);

  const searchCountry = (event) => {
    setIsSearchedCountry(event.target.value);
    const searchedCountry = filteredCountry.filter((country) =>
      country.name.common
        .replace(/\s/g, "")
        .toLowerCase()
        .includes(event.target.value.toLowerCase().replace(/\s/g, ""))
    );
    setTimeout(() => {
      setSearchedCountries(searchedCountry);
    }, 300);
  };
  const setDropdownStatus = () => {
    setDropdown(!showDropdown);
  };

  const filterByRegion = (event) => {
    setDropdown(!showDropdown);
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

  return (
    <div>
      {status === "response" ? (
        <>
          <div className="filter-country">
            <div className="input-div-country">
              <IoMdSearch className="bi-search" />
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
                <BsChevronDown />
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
        </>
      ) : status === "loading" ? (
        <div className="loading">
          <p>plese wait...</p>
          <div className="loader"></div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}
