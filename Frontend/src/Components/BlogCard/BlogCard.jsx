// BlogCard.js
import React from "react";
import "./BlogCard.css";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ id, image, title, description }) => {
  const navigate = useNavigate();

  const onReadMore = () => {
    navigate(`/blogs/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="blog-card">
      <img src={image} alt={title} className="blog-card-image" />
      <h6 className="blog-card-title">{title}</h6>
      <p className="blog-card-description">{description}</p>
      <a className="blog-card-button" onClick={onReadMore}>
        Read More
      </a>
    </div>
  );
};

export default BlogCard;
