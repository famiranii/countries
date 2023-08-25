import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import DetailsBackBtn from "./DetailsBackBtn";
import BordersBtn from "./BordersBtn";

export default function Details() {
  const params = useParams();
  const [countryInfo, setCountryInfo] = useState([]);
  const [borders, setBorders] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/translation/${params.name}`)
      .then((response) => {
        const info = response.data[0];
        setCountryInfo(response.data);
        const localBorders = JSON.parse(localStorage.getItem("borders"));
        const borders = localBorders.filter((border) =>
          info.borders.includes(border.border)
        );
        setBorders(borders);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.name]);

  const changeMode = (mode) => {
    setDarkMode(mode);
  };
  return (
    <div className={`details-width ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Header changeTaskMode={changeMode} />
      {countryInfo.length === 1 ? (
        <div className="details-page">
          <div>
            <Link to="../">
              <DetailsBackBtn text="Back" />
            </Link>
          </div>
          <div className="details">
            <div className="flag-div">
              <img
                className="flag-img"
                src={countryInfo[0].flags.svg}
                alt="img"
              />
            </div>
            <div className="country-infos">
              <h2 className="country-name">{countryInfo[0].name.common}</h2>
              <div className="country-inner-infos">
                <div className="half-info">
                  <div className="country-detail">
                    <strong>Native Name: </strong>
                    <span className="value">
                      {countryInfo[0].name.official}
                    </span>
                  </div>
                  <div className="country-detail">
                    <strong>Population: </strong>
                    <span className="value">
                      {countryInfo[0].population.toLocaleString()}
                    </span>
                  </div>
                  <div className="country-detail">
                    <strong>Region: </strong>
                    <span className="value">{countryInfo[0].region}</span>
                  </div>
                  <div className="country-detail">
                    <strong>Sub Region: </strong>
                    <span className="value">{countryInfo[0].subregion}</span>
                  </div>
                  <div className="country-detail">
                    <strong>Capital: </strong>
                    <span className="value">{countryInfo[0].capital}</span>
                  </div>
                </div>
                <div className="half-info">
                  <div className="country-detail">
                    <strong>Top Level Domain: </strong>
                    <span className="value">
                      {countryInfo[0].currencies.name}
                    </span>
                  </div>
                  <div className="country-detail">
                    <strong>Currencies: </strong>
                    <span className="value">
                      {
                        countryInfo[0].currencies[
                          Object.keys(countryInfo[0].currencies)[0]
                        ].name
                      }
                    </span>
                  </div>
                  <div className="country-detail">
                    <strong>Languages: </strong>
                    <span className="value">
                      {Object.values(countryInfo[0].languages).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="borders-btn">
                <div className="borders-title">
                  <span>Border Countries:</span>
                </div>
                <div>
                  {borders.map((border, index) => (
                    <BordersBtn border={border} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">
          <p>plese wait...</p>
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
