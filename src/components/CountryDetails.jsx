import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);

export default function CountryDetails() {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [neighbors, setNeighbors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,capital,currencies,flags,borders,region,population,area,languages`
        );
        const countryData = res.data[0];
        setCountry(countryData);

        if (countryData.borders?.length > 0) {
          const neighborRes = await axios.get(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(
              ","
            )}&fields=name,flags,cca3`
          );
          setNeighbors(neighborRes.data);
        } else {
          setNeighbors([]);
        }
      } catch (err) {
        console.error(err);
        setError("Country data could not be fetched.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryName]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!country) return null;

  return (
    <div className="country-details-container">
      <button onClick={() => window.history.back()} className="back-btn">
        <FontAwesomeIcon icon="fas fa-chevron-left" /> Back
      </button>

      <div className="country-main-info">
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          className="country-flag"
        />
        <div className="country-text">
          <h1>{country.name.common}</h1>
          <p>
            <strong>Official Name:</strong> {country.name.official}
          </p>
          <p>
            <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Area:</strong> {country.area.toLocaleString()} km²
          </p>
          <p>
            <strong>Currency:</strong>{" "}
            {Object.entries(country.currencies || {})
              .map(([_, info]) => info.name)
              .join(", ")}
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {Object.values(country.languages || {}).join(", ")}
          </p>
        </div>
        <iframe
          title="Google Map"
          width="300px"
          height="300"
          style={{ border: 0, borderRadius: "10px" }}
          loading="lazy"
          src={`https://www.google.com/maps?q=${country.name.common}&output=embed`}
        ></iframe>
      </div>

      {neighbors.length > 0 && (
        <div className="neighbors-section">
          <h2>Neighboring Countries:</h2>
          <div className="neighbors-grid">
            {neighbors.map((neighbor) => (
              <Link
                key={neighbor.cca3}
                to={`/details/${neighbor.name.common}`}
                className="neighbor-card"
              >
                <img
                  src={neighbor.flags.png}
                  alt={neighbor.flags.alt}
                  className="neighbor-flag"
                />
                <p>{neighbor.name.common}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
