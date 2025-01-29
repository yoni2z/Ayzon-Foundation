import React from "react";
import "./SheCanCard.css";
import { Link } from "react-router-dom";

const SheCanCard = ({ sheCanId, name, description, image }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-content">
        <div className="content-txt">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
      <Link to={`/shecan/${sheCanId}`} className="view-profile-button">
        View Profile
      </Link>
    </div>
  );
};

export default SheCanCard;
