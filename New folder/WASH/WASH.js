import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import wash_logo from "../../Assets/Images/wash_logo.png";
import wash_picture from "../../Assets/Images/wash_picture.jpeg";
import "../styles.css";

const WASH = () => {
  const [wash, setWash] = useState([]);

  useEffect(() => {
    fetch("https://ayzonfoundation.org/api/programs/2/")
      .then((response) => response.json())
      .then((data) => setWash(data))
      .catch((error) => console.log("Error fetching value", error));
  }, []);

  return (
    <div className="Wash">
      <div className="description">
        <div className="title">
          <img src={wash_logo} alt="Wash Logo"></img>
          <h2>{wash.name}</h2>
        </div>
        <p>{wash.description}</p>
        <Link
          to={`/program/2`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <button style={{ backgroundColor: wash.color }}>LOAD PROJECTS</button>
        </Link>
      </div>
      <img
        src={wash_picture}
        alt="Girl walking along side a river"
        style={{ paddingLeft: "4rem" }}
      ></img>
    </div>
  );
};

export default WASH;
