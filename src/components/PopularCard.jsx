import React from "react";
import { Link } from "react-router-dom";

export default function PopularCard({ country }) {
  if (!country) return null;

  return (
    <Link
      to={`/details/${country.name.common}`}
      className="popular-card"
    >
      <img
        src={country.flags.png}
        alt={country.flags.alt || country.name.common}
        className="popular-flag"
      />
      <p className="popular-name">{country.name.common}</p>
      {country.reason && (
        <p className="popular-reason">
          {country.reason}
        </p>
      )}
    </Link>
  );
}
