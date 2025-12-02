import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PopularCard from "../components/PopularCard";

export default function Popular() {
  const [popularCountries, setPopularCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPopularCountries = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,cca3"
        );

        const popularList = [
          {
            name: "India",
            reason: "Famous for culture, Bollywood, and cuisine",
          },
          { name: "USA", reason: "Global economy, movies, and technology" },
          {
            name: "Saudi Arabia",
            reason: "Religious significance and oil reserves",
          },
          {
            name: "Pakistan",
            reason: "Cultural heritage and historical sites",
          },
          { name: "Iran", reason: "Persian history and architecture" },
          { name: "France", reason: "Tourism, art, and cuisine" },
          {
            name: "Germany",
            reason: "Engineering, technology, and beer culture",
          },
          { name: "Japan", reason: "Technology, anime, and culture" },
          {
            name: "Brazil",
            reason: "Football, Carnival, and Amazon rainforest",
          },
          {
            name: "Australia",
            reason: "Wildlife, beaches, and adventure tourism",
          },
          {
            name: "Canada",
            reason: "Natural landscapes and high quality of life",
          },
          { name: "Italy", reason: "History, art, and cuisine" },
        ];

        const popular = popularList
          .map((p) => {
            const countryData = res.data.find((c) => c.name.common === p.name);
            return countryData ? { ...countryData, reason: p.reason } : null;
          })
          .filter(Boolean);

        setPopularCountries(popular);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularCountries();
  }, []);

  return (
    <div className="popular-page">
      <Header />
      <div className="popular-content">
        <h1 className="popular-title">Popular Countries</h1>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <div className="popular-grid">
            {popularCountries.map((country) => (
              <PopularCard key={country.name.common} country={country} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
