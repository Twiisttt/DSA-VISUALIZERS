import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AlgorithmSection from "./components/AlgorithmSection";

import Stack from "./pages/Stack";

function Home() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <AlgorithmSection />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Stack Visualizer Page */}
        <Route path="/stack" element={<Stack />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;