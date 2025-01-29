import React, { useState, useEffect } from "react";
import style from "./profile.module.css";
import { useParams } from "react-router-dom";

function Profile() {
  const [sheCanProfile, setSheCanProfile] = useState({
    picture: "",
    full_name: "",
    shecan_id: "",
    phone: "",
    email: "",
    address: "",
    skype: "",
    linkedin: "",
    skills: [],
    languages: [],
    certificates: [],
    honors_and_awards: [],
    interests: [],
    work_experience: [],
    education: [],
  });

  const { sheCanId } = useParams();

  useEffect(() => {
    fetch(`https://ayzonfoundation.org/api/shecan/${sheCanId}/`)
      .then((response) => response.json())
      .then((data) => setSheCanProfile(data))
      .catch((error) => console.log("Error fetching value", error));
  }, [sheCanId]);

  const printProfile = () => {
    window.print(); // This triggers the print dialog.
  };

  if (!sheCanProfile) return <div>Loading...</div>;

  return (
    <>
      <div id="profilePage" className={style.profileContainer}>
        <div className={style.profileLeftcont}>
          <div className={style.profileImagecont}>
            <img className={style.profileImage} src={sheCanProfile.picture} />
          </div>
          <div className={style.graduateSkills}>
            <div className={style.profileTitle}>
              <span className={style.outerBullet}>
                <span className={style.innerBullet}></span>
              </span>
              <h3 className={style.shecanProfileTitle}> SKILLS</h3>
            </div>
            <div className={style.skills}>
              <ul className={style.skillList}>
                {sheCanProfile.skills.map((skill) => {
                  return (
                    <>
                      <li>{skill.name}</li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={style.graduateLanguages}>
            <div className={style.profileTitle}>
              <span className={style.outerBullet}>
                <span className={style.innerBullet}></span>
              </span>
              <h3 className={style.shecanProfileTitle}>LANGUAGES</h3>
            </div>
            <div className={style.skills}>
              <ul className={style.skillList}>
                {sheCanProfile.languages.map((lang) => {
                  return (
                    <>
                      <li>{lang.name}</li>
                      <li className={style.langProficiency}>
                        {lang.proficiency}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={style.graduateCertificates}>
            <div className={style.profileTitle}>
              <span className={style.outerBullet}>
                <span className={style.innerBullet}></span>
              </span>
              <h3 className={style.shecanProfileTitle}>CERTIFICATES</h3>
            </div>
            <div className={style.skills}>
              <ul className={style.skillList}>
                {sheCanProfile.certificates.map((certificate) => {
                  return (
                    <>
                      <li>{certificate.title}</li>
                      <li className={style.certifier}>
                        {" "}
                        {certificate.organization}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={style.graduateHonorsAwards}>
            <div className={style.profileTitle}>
              <span className={style.outerBullet}>
                <span className={style.innerBullet}></span>
              </span>
              <h3 className={style.shecanProfileTitle}>HONORS & AWARDS</h3>
            </div>
            <div className={style.skills}>
              <ul className={style.skillList}>
                {sheCanProfile.honors_and_awards.map((award) => {
                  return (
                    <>
                      <li> {award.title}</li>
                      <li className={style.certifier}>{award.organization}</li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={style.graduateInterests}>
            <div className={style.profileTitle}>
              <span className={style.outerBullet}>
                <span className={style.innerBullet}></span>
              </span>
              <h3 className={style.shecanProfileTitle}>INTERESTS</h3>
            </div>
            <div className={style.skills}>
              <ul className={style.skillList}>
                {sheCanProfile.interests.map((interest) => {
                  return <li>{interest.name}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className={style.profileRightcont}>
          <div className={style.graduateInfo}>
            <h1 className={style.graduateName} style={{ color: "black" }}>
              {sheCanProfile.full_name}
            </h1>
            <h4 className={style.graduateprofession}>
              {sheCanProfile.profession}
            </h4>
            <p className={style.graduateDiscription} style={{ color: "black" }}>
              {sheCanProfile.self_description}
            </p>
            <ul className={style.graduateContact}>
              <li>
                <i className="fas fa-envelope"></i> {sheCanProfile.email}
              </li>
              <li>
                <i className="fas fa-mobile"></i> {sheCanProfile.phone}
              </li>
              <li>
                <i className="bi bi-geo-alt-fill"></i> {sheCanProfile.address}
              </li>
              <li>
                <i className="fab fa-skype"></i> {sheCanProfile.skype}
              </li>
              <li>
                <i className="fab fa-linkedin"></i> {sheCanProfile.linkedin}
              </li>
            </ul>
          </div>
          <div className={style.graduateWorkExperience}>
            <div className={style.profileTitle}>
              <span className={style.outerBullet}>
                <span className={style.innerBullet}></span>
              </span>
              <h3 className={style.shecanProfileTitle}>WORK EXPERIENCE</h3>
            </div>
            {sheCanProfile.work_experience.map((experience) => {
              return (
                <>
                  <h4 className={style.graduateprofession}>
                    {experience.job_title}
                  </h4>
                  <h3 className={style.companyName}> {experience.company} </h3>
                  <div className={style.date_location}>
                    <h6 className={style.startDate}>
                      {experience.start_date} - {experience.end_date}
                    </h6>
                    <h6 className={style.locationOfCompany}>
                      {experience.location}
                    </h6>
                  </div>
                  <ul className={style.workExperienceStatements}>
                    <li>{experience.description}</li>
                  </ul>
                </>
              );
            })}
          </div>
          <div className={style.graduateEducation}>
            <div className={style.profileTitle}>
              <span className={style.outerBullet}>
                <span className={style.innerBullet}></span>
              </span>
              <h3 className={style.shecanProfileTitle}>EDUCATION</h3>
            </div>
            {sheCanProfile.education.map((edu) => {
              return (
                <>
                  <h4 className={style.graduateprofession}>{edu.degree}</h4>
                  <h3 className={style.companyName}>{edu.institution}</h3>
                  <div className={style.date_location}>
                    <h6 className={style.startDate}>
                      {edu.start_date} - {edu.graduation_date}
                    </h6>
                    <h6 className={style.locationOfCompany}>{edu.location}</h6>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <button onClick={printProfile} className={style.printButton}>
        Download as PDF
      </button>
    </>
  );
}
export default Profile;
