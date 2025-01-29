import React, { useState, useEffect } from "react";
import BlogCard from "../../Components/BlogCard/BlogCard";
import "./BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(""); /* "name" or "date" */
  const [filterDate, setFilterDate] = useState(""); /* For filtering by date */

  const blogsPerPage = 12;
  /* fetched the blogs here  */
  useEffect(() => {
    fetch("https://ayzonfoundation.org/api/blogs/")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);
  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesName = blog.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDate = filterDate
        ? blog.date.startsWith(filterDate) ||
          blog.date >= filterDate
        : true;
      return matchesName && matchesDate;
    })
    .sort((a, b) => {
      if (sortOption === "name") {
        return a.title.localeCompare(b.title); /* Alphabetical sort*/
      } else if (sortOption === "date") {
        return (
          new Date(b.date) - new Date(a.date)
        ); /* Newest first*/
      }
      return 0; /* default */
    });

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const getPageNumbers = () => {
    const pages = [];
    if (currentPage > 1) pages.push(currentPage - 1);
    pages.push(currentPage);
    if (currentPage < totalPages) pages.push(currentPage + 1);
    return pages;
  };

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  return (
    <>
      <section className="intro-section">
        {blogs.length > 0 && (
          <>
            <div className="intro-column left-column">
              <img
                src={`${blogs[0].image}`}
                alt={blogs[0].title}
                className="intro-image"
              />
              <h2 className="intro-title">{blogs[0].title}</h2>
              <p className="intro-description" style={{ color: "black" }}>
                {truncateText(blogs[0].description, 300)}
              </p>
            </div>

            <div className="intro-column right-column">
              <h1>BLOGS HIGHLIGHT </h1>
              {blogs.slice(7, 14).map((blog) => (
                <div key={blog.id} className="list-item">
                  <img
                    src={`${blog.image}`}
                    alt={blog.title}
                    className="list-item-image"
                  />
                  <div className="list-item-content">
                    <h5 className="list-item-title">{blog.title}</h5>
                    <p
                      className="list-item-description"
                      style={{ color: "#26282A" }}
                    >
                      {truncateText(blog.description, 100)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <div className="blogs-main-title">
        <h1>BLOGS</h1>
        <div className="search-sort-container">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>
      <div className="blog-list">
        <div className="blog-grid">
          {currentBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              image={blog.image}
              title={blog.title}
              date={blog.created_at}
              description={truncateText(blog.description, 100)}
            />
          ))}
        </div>

        <div className="pagination">
          <button
            className="page-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              className={`page-button ${page === currentPage ? "active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="page-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default BlogList;
