import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function InsightPanel() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,borders,cca3,region,population,area"
        );
        setCountries(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Top 10 countries for population
  const topPopulation = [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 10);
  const populationData = {
    labels: topPopulation.map((c) => c.name.common),
    datasets: [
      {
        label: "Population",
        data: topPopulation.map((c) => c.population),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // Top 10 countries for area
  const topArea = [...countries]
    .sort((a, b) => (b.area || 0) - (a.area || 0))
    .slice(0, 10);
  const areaData = {
    labels: topArea.map((c) => c.name.common),
    datasets: [
      {
        label: "Area (km²)",
        data: topArea.map((c) => c.area || 0),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  // Region distribution
  const regionCounts = countries.reduce((acc, c) => {
    acc[c.region] = (acc[c.region] || 0) + 1;
    return acc;
  }, {});
  const regionData = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        label: "Countries per Region",
        data: Object.values(regionCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Top 10 countries with most borders
  const topBorders = [...countries]
    .sort((a, b) => (b.borders?.length || 0) - (a.borders?.length || 0))
    .slice(0, 10);
  const bordersData = {
    labels: topBorders.map((c) => c.name.common),
    datasets: [
      {
        label: "Number of Borders",
        data: topBorders.map((c) => c.borders?.length || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Currency Distribution - Top 10 currencies
  const currencyCounts = {};
  countries.forEach((c) => {
    if (c.currencies) {
      Object.keys(c.currencies).forEach((cur) => {
        currencyCounts[cur] = (currencyCounts[cur] || 0) + 1;
      });
    }
  });

  // display top 10 currencies
  const topCurrencyEntries = Object.entries(currencyCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const currencyData = {
    labels: topCurrencyEntries.map(([cur]) => cur),
    datasets: [
      {
        label: "Countries using Currency",
        data: topCurrencyEntries.map(([, count]) => count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF9F99",
          "#33CC66",
          "#FF6600",
          "#66CCFF",
        ],
      },
    ],
  };

  // Top 10 countries by population density
  const topDensity = [...countries]
    .filter((c) => c.population && c.area)
    .map((c) => ({ ...c, density: c.population / c.area }))
    .sort((a, b) => b.density - a.density)
    .slice(0, 10);

  const densityData = {
    labels: topDensity.map((c) => c.name.common),
    datasets: [
      {
        label: "Population Density (per km²)",
        data: topDensity.map((c) => Math.round(c.density)),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="insight-panel">
        <h1 className="title">Countries Insight Panel</h1>
        {loading ? (
          <p className="text-center text-xl">Loading data...</p>
        ) : (
          <div className="charts-container">
            <div className="chart">
              <h2>Top 10 Countries by Population</h2>
              <Bar data={populationData} />
            </div>

            <div className="chart">
              <h2>Top 10 Countries by Area</h2>
              <Line data={areaData} />
            </div>

            <div className="chart">
              <h2>Top 10 Countries by Borders</h2>
              <Bar data={bordersData} options={{ indexAxis: "y" }} />
            </div>

            <div className="chart">
              <h2>Top 10 Countries by Population Density</h2>
              <Bar
                data={densityData}
                options={{
                  indexAxis: "x",
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true } },
                }}
              />
            </div>

            <div className="chart">
              <h2>Currency Usage Distribution</h2>
              <Pie data={currencyData} />
            </div>

            <div className="chart">
              <h2>Country Distribution by Continents</h2>
              <Doughnut data={regionData} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
