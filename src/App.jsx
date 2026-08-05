import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AlgorithmSection from "./components/AlgorithmSection";

import Stack from "./pages/Stack";
import Queue from "./pages/Queue";
import Sorting from "./pages/Sorting";

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

        <Route path="/sorting" element={<Sorting />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;