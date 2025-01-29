import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import "./ProductDisplay.css";

const CategoryDisplay = () => {
  const { category } = useParams(); 
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const response = await axios.get(
          `https://ayzonfoundation.org/api/categories/${category}/`
        );
        if (response.data.products) {
          setItems(response.data.products); 
        } else {
          setError("No items found for this category.");
        }
      } catch (err) {
        setError("Failed to load items. Please try again.");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [category]); 

  if (loading) {
    return <p className="container">Loading items...</p>;
  }

  if (error) {
    return <p className="container error">{error}</p>;
  }

  if (!items.length) {
    return <p className="container">No items available in this category.</p>;
  }

  return (
    <div className="category-container">
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={`/shop/${category}/${item.id}`}
          className="category-item"
        >
          <img src={item.image} alt={item.description} />
          <h3 className="item-description">{item.description}</h3>
          <p className="item-price">{item.base_price} ETB</p>
        </NavLink>
      ))}
    </div>
  );
};

export default CategoryDisplay;
