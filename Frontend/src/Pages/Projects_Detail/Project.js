import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import projectImage from "./Asset/ProjectImg.png";
import "./Project.css";
import ProgressBar from "./components/ProgressBar";
import CircularProgressBar from "./components/CircularProgressBar";
import ComponentsCard from "./components/ComponentsCard";
import lookthroughBG from "./Asset/ProjectLS.jpg";
import donorsBG from "./Asset/ProjectDonors.jpg";
import VideoPlayer from "./components/VideoPlayer";
import ProjectDonor from "./components/ProjectDonors";

const Project = () => {
  const [projProgress, setprojProgress] = useState(50);
  const [fundRadius, setfundRadius] = useState(200);
  const [fundDimention, setfundDimention] = useState(250);
  const [fundProgress, setfundProgress] = useState(50);
  const [fundbgDimention, setfundbgDimention] = useState(500);
  const [fundLabel, setfundLabel] = useState(
    "FUNDS COLLECTED FOR THIS PROJECT"
  );

  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    fetch(`https://ayzonfoundation.org/api/project-details/${projectId}/`)
      .then((response) => response.json())
      .then((data) => {
        setProjectData(data);
      })
      .catch((error) => {
        console.log("Error fetching value", error);
      });
  }, [projectId]);

  if (!projectData) return <div className="loading">Loading...</div>; // Show a loading state

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  const donorPeopleData = [
    {
      image: require("./Asset/Chair.png"),
      name: "Jack Sparrow",
      category: "Captain",
    },
    {
      image: require("./Asset/Chair.png"),
      name: "Jack Sparrow",
      category: "Captain",
    },
    {
      image: require("./Asset/Chair.png"),
      name: "Jack Sparrow",
      category: "Captain",
    },
    {
      image: require("./Asset/Chair.png"),
      name: "Jack Sparrow",
      category: "Captain",
    },
    {
      image: require("./Asset/Chair.png"),
      name: "Jack Sparrow",
      category: "Captain",
    },
    {
      image: require("./Asset/Chair.png"),
      name: "Jack Sparrow",
      category: "Captain",
    },
  ];

  const donorCompaniesData = [
    {
      image: require("./Asset/Lamp.png"),
      name: "Ayzon Foundation",
      category: "Social",
    },
    {
      image: require("./Asset/Lamp.png"),
      name: "Ayzon Foundation",
      category: "Social",
    },
    {
      image: require("./Asset/Lamp.png"),
      name: "Ayzon Foundation",
      category: "Social",
    },
    {
      image: require("./Asset/Lamp.png"),
      name: "Ayzon Foundation",
      category: "Social",
    },
    {
      image: require("./Asset/Lamp.png"),
      name: "Ayzon Foundation",
      category: "Social",
    },
    {
      image: require("./Asset/Lamp.png"),
      name: "Ayzon Foundation",
      category: "Social",
    },
  ];

  return (
    <div>
      <div className="project-top">
        <img src={projectImage} alt="proj" className="project-image" />
      </div>

      <div className="progress-bar">
        <div className="progress-bar-txt">PROJECT STATUS</div>
        <ProgressBar progress={projProgress} color={projectData.color} />
      </div>

      <div className="project-intro">
        <div className="fund-progress">
          <CircularProgressBar
            progress={fundProgress}
            radius={fundRadius}
            dimention={fundDimention}
            bgDimention={fundbgDimention}
            label={fundLabel}
            color={projectData.color}
          />
        </div>

        <div className="intro-txt">
          <div className="intro-header">{projectData.title}</div>

          <div className="intro-body">{projectData.description}</div>
        </div>
      </div>

      <div className="project-components">
        <div className="components-title" style={{ color: projectData.color }}>
          Components
        </div>

        <div className="components-card-grid">
          {projectData.items.map((item, index) => (
            <ComponentsCard
              key={index}
              name={item.name}
              description={item.description}
              remainingItems={item.quantity_needed}
              progress={25}
              photo={item.photo}
              totalItems={item.quantity_needed}
              color={projectData.color}
            />
          ))}
        </div>

        <div className="project-description">
          <div className="desc-title">
            <p className="desc-title-h1" style={{ color: "black" }}>
              General
            </p>
            <p className="desc-title-h2" style={{ color: projectData.color }}>
              Project
            </p>
          </div>

          <p className="desc-details" style={{ color: "black" }}>
            {projectData.description}
          </p>
        </div>

        <div className="project-video-head">
          <div className="lookthrough-bg">
            <img
              src={lookthroughBG}
              alt="lookthroughBG"
              className="lookthrough-image"
            />
          </div>

          <div className="project-look-through">
            <p className="lookthrough-h1" style={{ color: "black" }}>
              Project
            </p>
            <p className="lookthrough-h2" style={{ color: projectData.color }}>
              Look Through
            </p>
          </div>
        </div>

        <div className="project-video">
          <VideoPlayer />
        </div>

        <div className="project-donors-head">
          <div className="project-donors-bg">
            <img src={donorsBG} alt="donorsheadBG" className="donorsbg-image" />
          </div>

          <div className="project-donors-title">
            <h1
              className="project-donors-h1"
              style={{ color: projectData.color }}
            >
              Donors
            </h1>
          </div>
        </div>

        <div className="project-donors">
          <div className="donor-comp-head">
            <h1 className="donor-comp-title"> Companies </h1>
          </div>

          <div className="donor-companies-list">
            {donorCompaniesData.map((item, index) => (
              <ProjectDonor
                key={index}
                name={item.name}
                category={item.category}
                image={item.image}
              />
            ))}
          </div>

          <div className="donor-people-head">
            <h1 className="donor-people-title"> People </h1>
          </div>

          <div className="donor-people-list">
            {donorPeopleData.map((item, index) => (
              <ProjectDonor
                key={index}
                name={item.name}
                category={item.category}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
