import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

function BlogsReadMore() {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    fetch(`https://ayzonfoundation.org/api/blogs/${id}/`) // Fetch data for the specific blog
      .then((response) => response.json())
      .then((data) => setBlogData(data))
      .catch((error) => console.error("Error fetching data", error));
  }, [id]);

  if (!blogData) return <p>Loading...</p>;

  return (
    <div className="blog_post_container">
      <h1>{blogData.title}</h1>
      <div className="blog_description_container">
        <div className="blog_description">
          <p>{blogData.description}</p>
        </div>
        <div className="blog_image">
          <img src={blogData.image} alt="Blog" />
        </div>
      </div>
    </div>
  );
}

export default BlogsReadMore;
