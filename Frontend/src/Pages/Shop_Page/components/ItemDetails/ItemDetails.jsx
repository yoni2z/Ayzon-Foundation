import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColorBar from "../../assets/ColorBar.png";
import OtherItems from "../OtherItems/OtherItems";
import "./ItemDetails.css";

const ItemDetails = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetch(`https://ayzonfoundation.org/api/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch item details");
        return response.json();
      })
      .then((data) => {
        setItem(data);
        setPrice(data.base_price);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleSizeClick = (size, price) => {
    setSelectedSize(size);
    setPrice(price);
  };

  if (loading) return <h1 className="loading">Loading...</h1>;
  if (error) return <h1 className="error">{error}</h1>;
  if (!item) return <h1 className="not-found">Item not found</h1>;

  return (
    <div className="item-details">
      <div className="item-header">
        <div className="item-image-section">
          <img src={item.image} alt={item.description} className="main-image" />
          <div className="thumbnail-row">
            {item.photos.map((photo) => (
              <div className="thumbnail" key={photo.id}>
                <img src={photo.image} alt={item.description} />
              </div>
            ))}
          </div>
        </div>
        <div className="item-info">
          <h1 className="item-title">{item.description}</h1>
          <img
            src={ColorBar}
            alt="Underlined Color Bar"
            className="color-bar"
          />
          <div className="size-selector">
            {item.sizes.map(({ size, price }) => (
              <button
                key={size}
                className={`size-option ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => handleSizeClick(size, price)}
              >
                {size}
              </button>
            ))}
          </div>
          <p className="item-price">{price} ETB</p>
          <p className="item-stock">
            {item.total > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <div className="add-to-cart">
            <select
              className="quantity-select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Quantity</option>
              {[...Array(item.total).keys()].map((num) => (
                <option value={num + 1} key={num}>
                  {num + 1}
                </option>
              ))}
            </select>
            <button
              className="add-button"
              disabled={!selectedOption || !selectedSize}
            >
              ADD TO CART
            </button>
          </div>
          {selectedOption && selectedSize && (
            <p>
              You selected: {selectedOption} x {selectedSize}
            </p>
          )}
        </div>
      </div>

      <div className="related-items">
        <h3 className="related-title">You may also like</h3>
        <div className="related-items-row">
          <OtherItems />
          <OtherItems />
          <OtherItems />
          <OtherItems />
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
