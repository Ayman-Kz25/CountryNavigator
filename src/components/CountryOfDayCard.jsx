import React, { useState, useEffect } from "react";

export default function CountryOfDayCard({ allCountries }) {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!allCountries.length) return;
    const todayIndex = new Date().getDate() % allCountries.length;
    setCountry(allCountries[todayIndex]);
  }, [allCountries]);

  if (!country) return null;

  return (
    <div className="country-of-day-card">
      <h4 className="title">Country of the Day</h4>

      <img
        src={country.flags.png}
        alt={country.name.common}
        className="img"
      />

      <div className="content">
        <p>
          <strong className="font-semibold">Name:</strong> {country.name.common}
        </p>

        <p>
          <strong className="font-semibold">Capital:</strong>{" "}
          {country.capital ? country.capital[0] : "N/A"}
        </p>

        <p>
          <strong className="font-semibold">Population:</strong>{" "}
          {country.population.toLocaleString()}
        </p>

        <p>
          <strong className="font-semibold">Region:</strong> {country.region}
        </p>
      </div>
    </div>
  );
}
