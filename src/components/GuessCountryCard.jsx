import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GuessCountryCard({ allCountries, closeModal }) {
  const TOTAL_QUESTIONS = 3;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!allCountries.length) return;
    generateQuestion();
  }, [allCountries]);

  const generateQuestion = () => {
    const shuffled = [...allCountries].sort(() => Math.random() - 0.5);
    const country = shuffled[0];

    const options = [country.name.common];

    while (options.length < 4) {
      const rand =
        allCountries[Math.floor(Math.random() * allCountries.length)].name
          .common;

      if (!options.includes(rand)) options.push(rand);
    }

    setQuestion({
      country,
      options: options.sort(() => Math.random() - 0.5),
    });

    setSelected(null);
    setCorrect(null);
  };

  const handleSelect = (option) => {
    setSelected(option);
    const isCorrect = option === question.country.name.common;
    setCorrect(isCorrect);

    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (questionIndex + 1 === TOTAL_QUESTIONS) {
        // Final question reached → auto close after showing result
        setTimeout(() => closeModal(), 1500);
      } else {
        setQuestionIndex(questionIndex + 1);
        generateQuestion();
      }
    }, 1200);
  };

  if (!question) return null;

  return (
    <div className="guess-card animate-guess">
      <div className="flex justify-between items-center mb-3">
        <h4 className="guess-title">Guess the Country</h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
          {questionIndex + 1}/{TOTAL_QUESTIONS}
        </p>
      </div>

      <img
        src={question.country.flags.png}
        alt={question.country.name.common}
        className="guess-flag"
      />

      <div className="guess-options">
        {question.options.map((opt) => {
          const isCorrect =
            selected && opt === question.country.name.common;
          const isWrong =
            selected && opt === selected && !isCorrect;

          return (
            <button
              key={opt}
              disabled={!!selected}
              onClick={() => handleSelect(opt)}
              className={`guess-btn ${isCorrect ? "correct" : ""} ${
                isWrong ? "wrong" : ""
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <p className="guess-feedback">
          {correct ? (
            <>
              <FontAwesomeIcon icon="check" className="text-green-500" /> Correct!
            </>
          ) : (
            <>
              <FontAwesomeIcon icon="xmark" className="text-red-500" /> Wrong!
              <span className="ml-2">
                Answer:{" "}
                <strong>{question.country.name.common}</strong>
              </span>
            </>
          )}
        </p>
      )}

      {/* Show final score only on last question before closing */}
      {selected && questionIndex + 1 === TOTAL_QUESTIONS && (
        <p className="mt-4 text-[var(--primary)] font-semibold text-center">
          Final Score: {score + (correct ? 1 : 0)} / {TOTAL_QUESTIONS}
          <br />
          Closing...
        </p>
      )}
    </div>
  );
}
