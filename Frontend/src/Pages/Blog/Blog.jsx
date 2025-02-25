import React from "react";
import './Blog.css';
import blogPic from '../../Assets/Images/Blog/blog.png';

function Blog() {
    return (
      <>
        <div className="blog-section">
          <img
            src={blogPic}
            alt="Ayzon Foundation Blog Image"
            className="background-image-blog"
          />
          <h1>BLOGS</h1>
        </div>
      </>
    );
}

export default Blog;