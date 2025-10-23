// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import JobSeekers from "./pages/JobSeekers";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f3efe6" // applies to all pages
      }}>
        <Header />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/jobseekers" element={<JobSeekers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <BackToTopButton />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
