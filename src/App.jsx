import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AlgorithmSection from "./components/AlgorithmSection";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <AlgorithmSection />
    </div>
  );
}

export default App;