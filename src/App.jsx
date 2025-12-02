import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Facts from "./pages/FunFact";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/facts" element={<Facts />} />
        <Route path="/details/:countryName" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
