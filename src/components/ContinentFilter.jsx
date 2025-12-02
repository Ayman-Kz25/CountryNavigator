import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);

import React from "react";

export default function ContinentFilter({ allCountries, setDisplayCountries }) {
  const continents = [
    "All",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
    "Antarctic",
  ];

  const handleChange = (e) => {
    const selected = e.target.value;

    if (selected === "All") {
      setDisplayCountries(allCountries);
      return;
    }

    const filtered = allCountries.filter(
      (c) => c.region.toLowerCase() === selected.toLowerCase()
    );

    setDisplayCountries(filtered);
  };

  return (
    <div className="continent-filter">
      <select onChange={handleChange} className="continent-dropdown">
        <option value="All">All</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Oceania">Oceania</option>
        <option value="Antarctic">Antarctic</option>
      </select>
    </div>
  );
}
