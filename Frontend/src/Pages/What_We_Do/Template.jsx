import React, { useEffect, useState } from "react";
import style from "./template.module.css";
import menuFooter from "./assets/2.jpg";
import { Link, useParams } from "react-router-dom";

const Template = () => {
  const { programId } = useParams();
  const [isHovered, setHovered] = useState();
  const [programs, setPrograms] = useState({
    id: "",
    name: "",
    description: "",
    color: "",
    project_names: [],
  });

  useEffect(() => {
    fetch(`https://ayzonfoundation.org/api/programs/${programId}`)
      .then((response) => response.json())
      .then((data) => setPrograms(data))
      .catch((error) => console.error("Error fetching programs:", error));
  }, [programId]);

  return (
    <div className={style.programContainer}>
      {/* Program Header */}
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
        {programs.project_names.map((project) => (
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
            <div className={style.qeProjBody}>
              <h2 className={style.projectTitleh2}>{project.name}</h2>
              <Link
                to={`/subprogram/${project.id}`}
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

export default Template;
