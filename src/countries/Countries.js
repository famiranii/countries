import '../App.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';

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
    <div className='container light-mode'>
      <Header/>
      {allCountries.map((country, index) => (
        <h1 key={index}>{country.name.common}</h1>
      ))}
    </div>
  );
}
