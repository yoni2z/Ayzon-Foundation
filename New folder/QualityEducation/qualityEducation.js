import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import qualed_image from "../../Assets/Images/qualed_image.jpeg";
import qualed_logo from "../../Assets/Images/qualed_logo.png";
import "../styles.css";

const QualityEducation = () => {
  const [qualityEducation, setQualityEducation] = useState([]);

  useEffect(() => {
    fetch("https://ayzonfoundation.org/api/programs/1/")
      .then((response) => response.json())
      .then((data) => setQualityEducation(data))
      .catch((error) => console.log("Error fetching value", error));
  }, []);

  return (
    <div className="QualityEducation">
      <img src={qualed_image} alt="Children Playing"></img>
      <div className="description">
        <div className="title" style={{ paddingBottom: "5rem" }}>
          <img src={qualed_logo} alt="Quality Education logo"></img>
          <h2>{qualityEducation.name}</h2>
        </div>
        <p style={{ paddingBottom: "4rem" }}>{qualityEducation.description}</p>
        <Link
          to={`/program/1`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <button style={{ backgroundColor: qualityEducation.color }}>
            LOAD PROJECTS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QualityEducation;
