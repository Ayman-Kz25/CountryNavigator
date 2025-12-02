import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CountryCard({ countries }) {
  return (
    <div className="card-container">
      {countries.map((country) => (
        <Link to={`/details/${country.name.common}`} className="country-card" key={country.name.common}>
          <div className="card-grid">
            <div className="card-img">
              <img src={country.flags.png} alt={country.flags.alt} />
              <p>{country.name.common}</p>
            </div>

            <div className="card-content">
              <Link to={`/details/${country.name.common}`} className="title">{country.name.official}</Link>
              <p>
                <strong>Capital: </strong>
                {country.capital?.[0]}
              </p>
              <p>
                <strong>Currency:</strong>{" "}
                {Object.entries(country.currencies || {}).map(
                  ([code, info]) => `${info.name}`
                )}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CountryCard;
