import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./HeroSection.css"; // Import CSS file

const HeroSection = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://ayzonfoundation.org/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-items">
        {categories.map((category) => (
          <div key={category.id} className="hero-item">
            <NavLink
              to={`/shop/${category.id}`}
              className="hero-link"
            >
              <img
                src={category.icon}
                alt={`${category.name} Icon`}
                className="hero-icon"
              />
              <h4 className="hero-title">{category.name}</h4>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
