import React from "react";
import "./styles.css";

export const Newscard = ({ title, description, image}) => {
  return (
    <div className="newscard-container">
      <div className="newscard-container-image">
        <img
          src={image}
          alt={title}
        />
      </div>
      <div className="newscard-container-text">
        <ul>
          <li className="newscard-container-text-title">{title}</li>
          <li className="newscard-container-text-description">
            {description}
          </li>
        </ul>
      </div>
    </div>
  );
};
