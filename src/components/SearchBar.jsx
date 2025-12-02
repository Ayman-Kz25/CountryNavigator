import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);
import React, { useState, useRef, useEffect } from "react";

export default function SearchBar({
  allCountries,
  setDisplayCountries,
  resetSearch,
}) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularCountries = [
    "Saudi Arabia",
    "Pakistan",
    "Iran",
    "America",
    "Iraq",
    "India",
  ];
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(popularCountries);
      return;
    }

    const q = query.toLowerCase();
    const results = allCountries
      .map((c) => c.name.common)
      .filter((name) => name.toLowerCase().includes(q))
      .slice(0, 5);

    setFiltered(results);
  }, [query, allCountries]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setQuery("");
    setShowSuggestions(false);
  }, [resetSearch]);

  const handleSelect = (name) => {
    setQuery(name);
    setShowSuggestions(false);

    // Find the country object
    const country = allCountries.find((c) => c.name.common === name);
    if (!country) return;

    // Get neighbors
    let neighbors = [];
    if (country.borders?.length) {
      neighbors = allCountries.filter((c) => country.borders.includes(c.cca3));
    } else {
      neighbors = allCountries
        .filter((c) => c.name.common !== country.name.common)
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    }

    // Set display countries (main + neighbors)
    setDisplayCountries([country, ...neighbors]);
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <div className="search-box">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search Country ..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />
        </div>
        <div className="search-btn">
          <button onClick={() => filtered.length && handleSelect(filtered[0])}>
            <FontAwesomeIcon icon="fas fa-search" className="search-icon cursor-pointer" />
          </button>
        </div>
      </div>

      {showSuggestions && filtered.length > 0 && (
        <ul className="suggestion-dropdown">
          {filtered.map((name) => (
            <li
              className="suggestion-list"
              key={name}
              onClick={() => handleSelect(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
