import React from "react";

export default function ContinentFilter({
  selected, setSelected
}) {
  const continents = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div className="continent-filter">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="continent-dropdown"
      >
        <option value="All">All</option>
        {continents.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
