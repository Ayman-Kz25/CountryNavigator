import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FactCard from "../components/FactCard";
import factsData from "./facts.json";

export default function FunFact() {
  const [randomFacts, setRandomFacts] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    // Fetch all countries for flags
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        setAllCountries(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (!allCountries.length) return;

    const allFacts = [];

    factsData.forEach((item) => {
      const countryData = allCountries.find(
        (c) => c.name.common.toLowerCase() === item.country.toLowerCase()
      );

      if (!countryData) return;

      const randomFact = item.facts[Math.floor(Math.random()*item.facts.length)];

        allFacts.push({
          country: item.country,
          fact: randomFact,
          flag: countryData.flags?.png || countryData.flags?.svg || "",
        });
    });

    const shuffled = [...allFacts].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 12);
    
    setRandomFacts(selected);
  }, [allCountries]);

  return (
    <div className="funfact-page">
      <Header />

      <div className="funfact-content">
        <h1 className="funfact-title">Fun Facts About Countries</h1>

        <div className="funfact-grid">
          {randomFacts.map((c, index) => (
            <FactCard
              key={index}
              country={c.country}
              fact={c.fact}
              flag={c.flag}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
