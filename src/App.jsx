import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AlgorithmSection from "./components/AlgorithmSection";
import ProtectedRoute from "./components/ProtectedRoute";

import Stack from "./pages/Stack";
import Queue from "./pages/Queue";
import Sorting from "./pages/Sorting";
import Searching from "./pages/Searching";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import "./App.css";


function Home() {
  return (
    <div className="app">

      <Hero />

      <AlgorithmSection />

    </div>
  );
}


function App() {

  return (

    <BrowserRouter>

      {/* Navbar is now available on every page */}
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />


        <Route
          path="/stack"
          element={<Stack />}
        />


        <Route
          path="/queue"
          element={<Queue />}
        />


        <Route
          path="/sorting"
          element={<Sorting />}
        />


        <Route
          path="/searching"
          element={<Searching />}
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/signup"
          element={<Signup />}
        />


        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;