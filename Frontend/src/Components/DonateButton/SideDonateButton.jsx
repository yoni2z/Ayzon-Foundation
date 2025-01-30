import React, { useState, useEffect } from "react";
import "./SideDonateButton.css";
import { Link } from "react-router-dom";

const SideDonateButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200); // Show after 200px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link to="/getinvolved">
      <button className={`sidedonate-btn ${isVisible ? "show" : ""}`}>
        Donate
      </button>
    </Link>
  );
};

export default SideDonateButton;
