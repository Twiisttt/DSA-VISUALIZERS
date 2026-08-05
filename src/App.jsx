import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AlgorithmSection from "./components/AlgorithmSection";

import Stack from "./pages/Stack";
import Queue from "./pages/Queue";

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

        <Route path="/" element={<Home />} />

        <Route path="/stack" element={<Stack />} />

        <Route path="/queue" element={<Queue />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;