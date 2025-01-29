import React from "react";
import { NavLink } from "react-router-dom";
import "./ItemCards.css"; // Import the CSS file

const ItemCards = ({ image, description, price, link }) => {
  return (
    <NavLink to={link} className="item-card">
      <img src={image} alt={description} className="item-image" />
      <p className="item-description">{description}</p>
      <p className="item-price">{price}</p>
    </NavLink>
  );
};

export default ItemCards;
