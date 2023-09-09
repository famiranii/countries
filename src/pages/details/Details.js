import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailsBackBtn from "./DetailsBackBtn";
import BordersBtn from "./BordersBtn";
import Error from "../../components/Error";
import { countries } from "../../components/GetApi";

export default function Details() {
  const params = useParams();
  const [countryInfo, setCountryInfo] = useState([]);
  const [borders, setBorders] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    countries()
      .then((data) => {
        let countryDetails = data.filter(
          (country) => country.name.common === params.name
        );
        countryDetails = countryDetails[0];
        setCountryInfo(countryDetails);

        let countryBorders = data.filter((country) =>
          countryDetails.borders.includes(country.cca3)
        );
        const borders =[]
        countryBorders.forEach((country) => borders.push(country.name.common));
        setBorders(borders)
        
        setStatus("response");
      })
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  }, [params.name]);

  return (
    <div>
      {status === "response" ? (
        <div className="details-page">
          <div>
            <Link to="../">
              <DetailsBackBtn text="Back" />
            </Link>
          </div>
          <div className="details">
            <div className="flag-div">
              <img className="flag-img" src={countryInfo.flags.svg} alt="img" />
            </div>
            <div className="country-infos">
              <h2 className="country-name">{countryInfo.name.common}</h2>
              <div className="country-inner-infos">
                <div className="half-info">
                  <div className="country-detail">
                    <strong>Native Name: </strong>
                    <span className="value">{countryInfo.name.official}</span>
                  </div>
                  <div className="country-detail">
                    <strong>Population: </strong>
                    <span className="value">
                      {countryInfo.population.toLocaleString()}
                    </span>
                  </div>
                  <div className="country-detail">
                    <strong>Region: </strong>
                    <span className="value">{countryInfo.region}</span>
                  </div>
                  <div className="country-detail">
                    <strong>Sub Region: </strong>
                    <span className="value">{countryInfo.subregion}</span>
                  </div>
                  <div className="country-detail">
                    <strong>Capital: </strong>
                    <span className="value">{countryInfo.capital}</span>
                  </div>
                </div>
                <div className="half-info">
                  <div className="country-detail">
                    <strong>Top Level Domain: </strong>
                    <span className="value">{countryInfo.currencies.name}</span>
                  </div>
                  <div className="country-detail">
                    <strong>Currencies: </strong>
                    <span className="value">
                      {
                        countryInfo.currencies[
                          Object.keys(countryInfo.currencies)[0]
                        ].name
                      }
                    </span>
                  </div>
                  <div className="country-detail">
                    <strong>Languages: </strong>
                    <span className="value">
                      {Object.values(countryInfo.languages).toLocaleString()}
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
