import "./styles.css";
import React from "react";
import { Link } from "react-router-dom";

export const Projectcard = ({ id, description, name, image, color }) => {
  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  return (
    <div className="projectcard-container">
      <div className="projectcard-container-image">
        <img src={image} alt="" />
        <Link
          to={`/project/${id}`}
          className="donate-button"
          style={{ backgroundColor: color }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          DONATE
        </Link>
      </div>
      <div className="projectcard-container-text">
        <h2>{name}</h2>
        <p>{truncateText(description, 100)}</p>
        <Link
          to={`/project/${id}`}
          className="projectcard-container-btn"
          style={{ backgroundColor: color }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          LEARN MORE
        </Link>
      </div>
    </div>
  );
};
