import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AlgorithmSection from "./components/AlgorithmSection";

import Stack from "./pages/Stack";
import Queue from "./pages/Queue";
import Sorting from "./pages/Sorting";
import Searching from "./pages/Searching";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

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

        <Route path="/searching" element={<Searching />} />

        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<ProtectedRoute><Profile /> </ProtectedRoute>} />

        <Route path="/signup" element={<Signup />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;