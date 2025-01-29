import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Vector from "../../assets/Vector.png";
import "./OtherItems.css";

const OtherItems = () => {
  const [randomItem, setRandomItem] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ayzonfoundation.org/api/categories/"
        ); // Replace with your API URL
        const data = await response.json();

        if (data.length > 0) {
          // Select a random item
          const randomIndex = Math.floor(Math.random() * data.length);
          setRandomItem(data[randomIndex]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!randomItem) {
    return <p>Loading a random product...</p>;
  }

  return (
    <div className="other-items-container">
      <NavLink
        to={`/shop/${randomItem.id}`}
        className="other-item"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <button className="like-button">
          <img src={Vector} alt="Like Button" />
        </button>
        <img src={randomItem.icon} alt={randomItem.name} />
        <h3 className="item-description">{randomItem.name}</h3>
      </NavLink>
    </div>
  );
};

export default OtherItems;
