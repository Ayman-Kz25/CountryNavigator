import React, { useState, useEffect } from "react";

export default function RankCompareCard({ allCountries }) {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [sortField, setSortField] = useState("population");

  useEffect(() => {
    if (!allCountries.length) return;

    const randomSelection = [...allCountries]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    setSelectedCountries(randomSelection);
  }, [allCountries]);

  const handleSort = (field) => {
    setSortField(field);
    const sorted = [...selectedCountries].sort(
      (a, b) => b[field] - a[field]
    );
    setSelectedCountries(sorted);
  };

  if (!selectedCountries.length) return null;

  const maxValue = Math.max(...selectedCountries.map((c) => c[sortField]));

  return (
    <div className="rank-card">
      <h3 className="rank-title">Country Ranking</h3>

      <div className="rank-sort">
        <button
          className={`rank-btn ${sortField === "population" ? "active" : ""}`}
          onClick={() => handleSort("population")}
        >
          Population
        </button>

        <button
          className={`rank-btn ${sortField === "area" ? "active" : ""}`}
          onClick={() => handleSort("area")}
        >
          Area (km²)
        </button>
      </div>

      <div className="rank-list">
        {selectedCountries.map((country) => {
          const width = (country[sortField] / maxValue) * 100;

          return (
            <div key={country.cca3} className="rank-item">
              <div className="rank-label">
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="rank-flag"
                />
                <span>{country.name.common}</span>
              </div>

              <div className="rank-bar-wrap">
                <div
                  className="rank-bar-fill"
                  style={{ width: `${width}%` }}
                />
              </div>

              <span className="rank-value">
                {country[sortField].toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
