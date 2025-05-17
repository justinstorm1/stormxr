import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import HomePage from "./components/Home/HomePage";
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const handlePageScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    const handlePageSize = () => {
      if (window.innerWidth <= 768) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }
    }

    window.addEventListener('scroll', handlePageScroll);
    window.addEventListener('resize', handlePageSize);

    handlePageScroll();
    handlePageSize();
  }, []);

  return (
    <div className={`App ${(scrolled || smallScreen) ? 'filled' : ''}`}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
