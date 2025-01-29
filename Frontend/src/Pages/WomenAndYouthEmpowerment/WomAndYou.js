import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import womandyou_logo from "../../Assets/Images/womandyou_logo.png";
import womandyou_picture from "../../Assets/Images/womandyou_picture.jpeg";
import "../styles.css";

const WomAndYou = () => {
  const [womenAndYouth, setWomanAndYouth] = useState([]);

  useEffect(() => {
    fetch("https://ayzonfoundation.org/api/programs/3/")
      .then((response) => response.json())
      .then((data) => setWomanAndYouth(data))
      .catch((error) => console.log("Error fetching value", error));
  }, []);

  return (
    <div className="WomAndYou">
      <img
        src={womandyou_picture}
        alt="Women holding something on top of her"
      ></img>
      <div className="description">
        <div className="title" style={{ paddingBottom: "4rem" }}>
          <img
            src={womandyou_logo}
            alt="Women and Youth Empowerment logo"
          ></img>
          <h2>{womenAndYouth.name}</h2>
        </div>
        <p>{womenAndYouth.description}</p>
        <Link
          to={`/program/3`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <button style={{ backgroundColor: womenAndYouth.color }}>
            LOAD PROJECTS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WomAndYou;
