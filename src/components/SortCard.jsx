import React from "react";
import { Link } from "react-router-dom";

export default function sortCard({ country, sortType }) {
  if (!country) return null;

  // Determine the secondary info based on current sortType
  const getSecondaryInfo = () => {
    switch (sortType) {
      case "population-high":
      case "population-low":
        return `Population: ${country.population.toLocaleString()}`;
      case "area-high":
      case "area-low":
        return `Area: ${country.area ? country.area.toLocaleString() + " km²" : "N/A"}`;
      case "borders":
        return `Borders: ${country.borders ? country.borders.length : 0}`;
      case "region":
        return `Region: ${country.region || "N/A"}`;
      default:
        return country.reason || ""; // Optional reason if exists
    }
  };

  return (
    <Link
      to={`/details/${country.name.common}`}
      className="sort-card"
    >
      <img
        src={country.flags.png}
        alt={country.flags.alt || country.name.common}
        className="sort-flag"
      />
      <p className="sort-name">{country.name.common}</p>
      {getSecondaryInfo() && (
        <p className="sort-reason">
          {getSecondaryInfo()}
        </p>
      )}
    </Link>
  );
}
