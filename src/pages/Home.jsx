import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ContinentFilter from "../components/ContinentFilter";
import Footer from "../components/Footer";
import CountryCard from "../components/CountryCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomePage() {
  const [allCountries, setAllCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [sortType, setSortType] = useState("name-asc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,borders,cca3,region,population,area"
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

  // Filter by continent
  const filteredByContinent = allCountries.filter((country) => {
    return (
      selectedContinent === "All" ||
      country.region.toLowerCase() === selectedContinent.toLowerCase()
    );
  });

  // Determine countries to show
  const countriesToShow =
    searchCountries.length > 0
      ? searchCountries
      : filteredByContinent.length > 0
      ? filteredByContinent
      : [...allCountries].slice(0, 20);

  // Sorting function
  const sortCountries = (countriesList) => {
    const sorted = [...countriesList];
    switch (sortType) {
      case "name-asc":
        return sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
      case "name-desc":
        return sorted.sort((a, b) => b.name.common.localeCompare(a.name.common));
      case "population-high":
        return sorted.sort((a, b) => b.population - a.population);
      case "population-low":
        return sorted.sort((a, b) => a.population - b.population);
      case "area-high":
        return sorted.sort((a, b) => (b.area || 0) - (a.area || 0));
      case "area-low":
        return sorted.sort((a, b) => (a.area || 0) - (b.area || 0));
      case "region":
        return sorted.sort((a, b) => a.region.localeCompare(b.region));
      case "borders":
        return sorted.sort((a, b) => (b.borders?.length || 0) - (a.borders?.length || 0));
      default:
        return sorted;
    }
  };

  const sortedCountries = sortCountries(countriesToShow);

  const resetSearch = () => {
    setSearchCountries([]);
  };

  return (
    <>
      <Header />

      <main>
        <div className="container-box">
          {/* Continent Filter */}
          <ContinentFilter
            selected={selectedContinent}
            setSelected={setSelectedContinent}
          />

          {/* Search Bar */}
          <SearchBar
            allCountries={allCountries}
            setDisplayCountries={setSearchCountries}
            resetSearch={resetSearch}
          />

          {/* Sort Dropdown */}
          <div className="sort-box">
            <select
              id="sort"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="sort-dropdown"
            >
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="population-high">Population (High → Low)</option>
              <option value="population-low">Population (Low → High)</option>
              <option value="area-high">Area (High → Low)</option>
              <option value="area-low">Area (Low → High)</option>
              <option value="region">Region</option>
              <option value="borders">Most Borders</option>
            </select>
          </div>
        </div>

        {/* Back button for search */}
        {searchCountries.length > 0 && (
          <button onClick={resetSearch} className="back-to-home">
            <FontAwesomeIcon icon="fas fa-chevron-left" />
            Back to Home
          </button>
        )}

        {/* Loading / Country Cards */}
        {loading ? (
          <p className="text-center text-3xl mt-4">Loading...</p>
        ) : (
          <CountryCard countries={sortedCountries} />
        )}
      </main>

      <Footer />
    </>
  );
}
