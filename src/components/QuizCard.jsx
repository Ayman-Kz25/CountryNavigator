import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas, far, fab);

export default function QuizCard({ allCountries }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const QUESTION_TYPES = ["capital", "flag", "population", "region", "currency"];

  // Generate different types of questions
  const generateQuestion = (country) => {
    const type = QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)];

    switch (type) {
      case "capital":
        return {
          question: `What is the capital of ${country.name.common}?`,
          correct: country.capital ? country.capital[0] : "N/A",
          type,
        };

      case "flag":
        return {
          question: "Which country's flag is this?",
          correct: country.name.common,
          type,
          image: country.flags.png,
        };

      case "population":
        return {
          question: `Which country has this population: ${country.population.toLocaleString()}?`,
          correct: country.name.common,
          type,
        };

      case "region":
        return {
          question: `${country.name.common} belongs to which region?`,
          correct: country.region,
          type,
        };

      case "currency":
        const currency = country.currencies ? Object.values(country.currencies)[0].name : "N/A";
        return {
          question: `Which country uses the currency: ${currency}?`,
          correct: country.name.common,
          type,
        };

      default:
        return null;
    }
  };

  useEffect(() => {
    if (!allCountries.length) return;

    const shuffled = [...allCountries].sort(() => Math.random() - 0.5);
    const q = [];

    for (let i = 0; i < 10; i++) {
      const country = shuffled[i];
      const generated = generateQuestion(country);

      // Build wrong options
      let wrongOptions = [];
      while (wrongOptions.length < 3) {
        const random = allCountries[Math.floor(Math.random() * allCountries.length)];
        const wrong = generated.type === "capital"
          ? random.capital?.[0]
          : generated.type === "region"
          ? random.region
          : random.name.common;

        if (wrong && wrong !== generated.correct && !wrongOptions.includes(wrong)) {
          wrongOptions.push(wrong);
        }
      }

      const options = [generated.correct, ...wrongOptions].sort(() => Math.random() - 0.5);

      q.push({ ...generated, options });
    }

    setQuestions(q);
  }, [allCountries]);

  const handleAnswer = (opt) => {
    setSelected(opt);

    if (opt === questions[current].correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      setSelected(null);
      if (current < questions.length - 1) setCurrent((prev) => prev + 1);
      else setShowResult(true);
    }, 1500);
  };

  if (!questions.length) return null;

  if (showResult) {
    return (
      <div className="quiz-card">
        <h3 className="quiz-title">Quiz Completed <FontAwesomeIcon icon="fas fa-award" /></h3>
        <p className="quiz-result-text">Your Score: {score} / {questions.length}</p>

        <div className="quiz-progress-wrapper">
          <div
            className="quiz-progress-bar"
            style={{ width: `${(score / questions.length) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-card">
      <div className="quiz-score">Score: {score}</div>

      <h4 className="quiz-question">
        Q{current + 1}: {q.question}
      </h4>

      {q.type === "flag" && (
        <img
          src={q.image}
          alt="flag"
          className="quiz-flag"
        />
      )}

      <div className="quiz-options">
        {q.options.map((opt) => {
          const isCorrect = selected && opt === q.correct;
          const isWrong = selected && opt === selected && opt !== q.correct;

          return (
            <button
              key={opt}
              className={`quiz-btn 
                ${isCorrect ? "correct" : ""}
                ${isWrong ? "wrong" : ""}
              `}
              onClick={() => handleAnswer(opt)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
