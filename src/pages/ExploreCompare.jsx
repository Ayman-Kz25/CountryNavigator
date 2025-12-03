import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard";
import CountryOfDayCard from "../components/CountryOfDayCard";
import GuessCountryCard from "../components/GuessCountryCard";
import RankCompareCard from "../components/RankCompareCard";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);

export default function ExploreAndCompare() {
  const [allCountries, setAllCountries] = useState([]);
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,borders,cca3,region,population,area"
        );
        setAllCountries(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountries();
  }, []);

  return (
    <>
      <Header />
      <main className="explore-page">
        <h2 className="explore-title">Explore Countries</h2>

        <div className="main-card">
          <h3>Country of the Day</h3>
          <p>
            Discover a unique fact about a randomly selected country each day.
          </p>
          <button
            className="btn-main"
            onClick={() => openModal("countryOfDay")}
          >
            Show Today's Country
          </button>
        </div>

        <div className="explore-section">
          <div className="card">
            <h3>Quiz / Trivia</h3>
            <p>Test your knowledge about countries with fun quizzes.</p>
            <button className="btn" onClick={() => openModal("quiz")}>
              Play Quiz
            </button>
          </div>

          <div className="card">
            <h3>Guess the Country</h3>
            <p>Identify countries by their flag or map outline.</p>
            <button className="btn" onClick={() => openModal("guess")}>
              Play Guess Game
            </button>
          </div>

          <div className="card">
            <h3>Rank & Compare</h3>
            <p>Compare countries by population, area, or GDP visually.</p>
            <button className="btn" onClick={() => openModal("rank")}>
              Compare Now
            </button>
          </div>
        </div>

        {activeModal && (
          <div className="modal">
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>
                <FontAwesomeIcon icon="fas fa-circle-xmark" />
              </button>
              {activeModal === "countryOfDay" && (
                <CountryOfDayCard allCountries={allCountries} />
              )}
              {activeModal === "quiz" && (
                <QuizCard allCountries={allCountries} />
              )}
              {activeModal === "guess" && (
                <GuessCountryCard allCountries={allCountries} closeModal={closeModal} />
              )}
              {activeModal === "rank" && (
                <RankCompareCard allCountries={allCountries} />
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
