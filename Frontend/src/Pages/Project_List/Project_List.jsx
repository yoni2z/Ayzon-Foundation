import React, { useEffect, useState } from "react";
import style from "./template.module.css";
import menuFooter from "./assets/2.jpg";
import { Link, useParams } from "react-router-dom";

const ProjectList = () => {
  const { programId } = useParams();
  const [isHovered, setHovered] = useState();
  const [programs, setPrograms] = useState({
    id: "",
    name: "",
    color: "",
    projects: [],
  });

  // console.log(programId);

  useEffect(() => {
    fetch(`https://ayzonfoundation.org/api/projects/${programId}`)
      .then((response) => response.json())
      .then((data) => setPrograms(data))
      .catch((error) => console.error("Error fetching programs:", error));
  }, [programId]);

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  return (
    <div className={style.programContainer}>
      <div className={style.programHeader}>
        <h1 className={style.programTitle}>{programs.name}</h1>
        <span className={style.programSpan}>
          <img
            className={style.programUnderline}
            src={menuFooter}
            alt="Underline"
          />
        </span>
      </div>

      {/* Project Cards */}
      <div className={style.qeProjects}>
        {programs.projects.map((project) => (
          <div
            className={style.qeProject}
            key={project.id}
            style={{
              border:
                isHovered === project.id
                  ? `1px solid ${programs.color}`
                  : "none",
            }}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={style.qeProjectImage}>
              {/* Placeholder image if none is provided */}
              <img
                className={style.qeProjectpic}
                src={project.image || "https://via.placeholder.com/350x220"}
                alt={project.name}
              />
            </div>
            <div className={style.qeProjBody}>
              <h2 className={style.projectTitleh2}>{project.title}</h2>
              <p className={style.qeprojectDesc}>
                {truncateText(project.description, 100)}
              </p>
              <Link
                to={`/project/${project.id}`}
                className={style.qeReadmore}
                style={{ backgroundColor: programs.color }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
