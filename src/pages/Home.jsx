import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CountryCard from "../components/CountryCard";
import ContinentFilter from "../components/ContinentFilter";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);

export default function Home() {
  const [allCountries, setAllCountries] = useState([]);
  const [displayCountries, setDisplayCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,borders,cca3,region"
        );
        setAllCountries(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const resetSearch = () => {
    setDisplayCountries([]);
  };

  // Home page shows 20 random countries unless searched
  const countriesToShow =
    displayCountries.length > 0
      ? displayCountries
      : [...allCountries].sort(() => Math.random() - 0.5).slice(0, 20);

  return (
    <>
      <Header />

      <main>
        <div className="container-box">
          <ContinentFilter
            allCountries={allCountries}
            setDisplayCountries={setDisplayCountries}
          />

          <SearchBar
            allCountries={allCountries}
            setDisplayCountries={setDisplayCountries}
            resetSearch={resetSearch}
          />
        </div>

        {displayCountries.length > 0 && (
          <button onClick={resetSearch} className="back-to-home">
            <FontAwesomeIcon icon="fas fa-chevron-left" />
            Back to Home
          </button>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <CountryCard countries={countriesToShow} />
        )}
      </main>
      <Footer />
    </>
  );
}
