import style from "./resumeform.module.css";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResumeForm = () => {
  const location = useLocation();
  const shecanId = location.state?.shecanId;
  const skillref = useRef(null);
  const intersetRef = useRef(null);
  const expDetail = useRef(null);

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [graduate, setGraduate] = useState({
    graduateName: "",
    graduateId: shecanId,
    graduatePicture: null,
    graduateProfession: "",
    selfDescription: "",
    contactLinks: {
      email: "",
      location: "",
      skype: "",
      mobilePhoneNo: "",
      linkedin: "",
      telegram: "",
      instagram: "",
      facebook: "",
    },
    skills: [],
    languages: [],
    certificates: [],
    awards: [],
    interests: [],
    workExperience: [],
    education: [],
  });
  const [newLanguage, setNewLanguage] = useState({
    language: "",
    proficiency: "",
  });
  const [newCertificate, setNewCertificate] = useState({
    certificateName: "",
    certifier: "",
    dateAwarded: "",
  });
  const [newAward, setNewAward] = useState({
    awardName: "",
    certifier: "",
    dateAwarded: "",
  });
  const [newEducation, setNewEducation] = useState({
    field_of_study: "",
    university: "",
    startDate: "",
    graduationDate: "",
    location: "",
  });
  const [newWorkExperience, setNewWorkExperience] = useState({
    profession: "",
    companyName: "",
    startDate: "",
    terminationDate: "",
    locationOfCompany: "",
    exprienceDescriptions: [],
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGraduate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setGraduate((prevGraduate) => ({
        ...prevGraduate,
        graduatePicture: file, // Store the file object in state
      }));
    }
  };

  const handleNestedChange = (e, section, field) => {
    const { value } = e.target;
    setGraduate((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleAddItem = (section, item) => {
    setGraduate((prev) => ({
      ...prev,
      [section]: [...prev[section], item],
    }));
  };

  /* langauge section */
  const handleAddLanguage = () => {
    if (newLanguage.language && newLanguage.proficiency) {
      setGraduate((prevGraduate) => ({
        ...prevGraduate,
        languages: [...prevGraduate.languages, newLanguage],
      }));
      setNewLanguage({ language: "", proficiency: "" });
    }
  };

  const handleUpdateLanguage = (index, updatedField) => {
    setGraduate((prevGraduate) => ({
      ...prevGraduate,
      languages: prevGraduate.languages.map((lang, i) =>
        i === index ? { ...lang, ...updatedField } : lang
      ),
    }));
  };

  const handleRemoveLanguage = (index) => {
    setGraduate((prevGraduate) => ({
      ...prevGraduate,
      languages: prevGraduate.languages.filter((_, i) => i !== index),
    }));
  };
  /* end of language */

  /* certificate section */
  const handleAddCertificate = () => {
    if (
      newCertificate.certificateName &&
      newCertificate.certifier &&
      newCertificate.dateAwarded
    ) {
      setGraduate((prevGraduate) => ({
        ...prevGraduate,
        certificates: [...prevGraduate.certificates, newCertificate],
      }));
      setNewCertificate({
        certificateName: "",
        certifier: "",
        dateAwarded: "",
      });
    }
  };

  const handleUpdateCertificates = (index, updatedField) => {
    setGraduate((prevGraduate) => ({
      ...prevGraduate,
      certificates: prevGraduate.certificates.map((cert, i) =>
        i === index ? { ...cert, ...updatedField } : cert
      ),
    }));
  };

  const handleRemoveCertificate = (index) => {
    setGraduate((prevGraduate) => ({
      ...prevGraduate,
      certificates: prevGraduate.certificates.filter((_, i) => i !== index),
    }));
  };
  /*end of certificates */

  /* award section */

  const handleAddAward = () => {
    if (newAward.awardName && newAward.certifier && newAward.dateAwarded) {
      setGraduate((prevGraduate) => ({
        ...prevGraduate,
        awards: [...prevGraduate.awards, newAward],
      }));
      setNewAward({ awardName: "", certifier: "", dateAwarded: "" });
    }
  };

  const handleUpdateAward = (index, updatedField) => {
    setGraduate((prevGraduate) => ({
      ...prevGraduate,
      awards: prevGraduate.awards.map((award, i) =>
        i === index ? { ...award, ...updatedField } : award
      ),
    }));
  };

  const handleRemoveAward = (index) => {
    setGraduate((prevGraduate) => ({
      ...prevGraduate,
      awards: prevGraduate.awards.filter((_, i) => i !== index),
    }));
  };
  /*end of awards */

  /* Education Section */
  const handleAddEducation = () => {
    if (
      newEducation.field_of_study &&
      newEducation.graduationDate &&
      newEducation.location &&
      newEducation.startDate &&
      newEducation.university
    ) {
      setGraduate((prevGraduate) => ({
        ...prevGraduate,
        education: [...prevGraduate.education, newEducation],
      }));
      setNewEducation({
        field_of_study: "",
        university: "",
        location: "",
        startDate: "",
        graduationDate: "",
      });
    }
  };
  const handleUpdateEducation = (index, updatedField) => {
    setGraduate((prevGraduate) => ({
      ...prevGraduate,
      education: prevGraduate.education.map((edu, i) =>
        i === index ? { ...edu, ...updatedField } : edu
      ),
    }));
  };

  const handleRemoveEducation = (index) => {
    setGraduate((prevGraduate) => ({
      ...prevGraduate,
      education: prevGraduate.education.filter((_, i) => i !== index),
    }));
  };
  /* end of education  */

  /* work experience section */

  const handleAddWorkExperience = () => {
    if (
      newWorkExperience.profession &&
      newWorkExperience.companyName &&
      newWorkExperience.startDate &&
      newWorkExperience.terminationDate &&
      newWorkExperience.locationOfCompany
    ) {
      setGraduate((prevGraduate) => ({
        ...prevGraduate,
        workExperience: [
          ...prevGraduate.workExperience,
          {
            ...newWorkExperience,
            exprienceDescriptions: [], // Initialize as empty array
          },
        ],
      }));
      setNewWorkExperience({
        profession: "",
        companyName: "",
        startDate: "",
        terminationDate: "",
        locationOfCompany: "",
        exprienceDescriptions: [],
      });
    }
  };

  const handleupdateWorkExperience = (index, updatedField) => {
    setGraduate((prevGraduate) => ({
      ...prevGraduate,
      workExperience: prevGraduate.workExperience.map((wxp, i) =>
        i === index ? { ...wxp, ...updatedField } : wxp
      ),
    }));
  };

  const handleRemoveWorkExperience = (index) => {
    setGraduate((prevGraduate) => ({
      ...prevGraduate,
      workExperience: prevGraduate.workExperience.filter((_, i) => i !== index),
    }));
  };

  const handleAddWorkExperienceDetail = (index, detail) => {
    if (detail.trim()) {
      setGraduate((prevGraduate) => ({
        ...prevGraduate,
        workExperience: prevGraduate.workExperience.map((wxp, i) =>
          i === index
            ? {
                ...wxp,
                exprienceDescriptions: [...wxp.exprienceDescriptions, detail],
              }
            : wxp
        ),
      }));
    }
  };

  function getCSRFToken() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "csrftoken") return value;
    }
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build the payload from the graduate state
    const payload = {
      graduateName: graduate.graduateName,
      graduateId: graduate.graduateId,
      // graduatePicture: graduate.graduatePicture,
      graduateProfession: graduate.graduateProfession,
      selfDescription: graduate.selfDescription,
      contactLinks: graduate.contactLinks,
      skills: graduate.skills,
      languages: graduate.languages,
      certificates: graduate.certificates,
      awards: graduate.awards,
      interests: graduate.interests,
      workExperience: graduate.workExperience,
      education: graduate.education,
    };

    const formData = new FormData();

    // Add file field (graduatePicture) to FormData
    if (graduate.graduatePicture) {
      formData.append("graduatePicture", graduate.graduatePicture);
    }

    // Add other fields to FormData as JSON
    formData.append("data", JSON.stringify(payload));
    if (
      !(
        payload.graduateName &&
        payload.education &&
        payload.graduateId &&
        payload.contactLinks &&
        payload.interests &&
        payload.languages &&
        payload.selfDescription &&
        payload.skills &&
        payload.graduateProfession
      )
    ) {
      alert("Fill All The Required Fields Please ");
    } else {
      fetch("https://ayzonfoundation.org/api/shecan_form/", {
        method: "POST",
        headers: {
          "X-CSRFToken": getCSRFToken(),
        },
        credentials: "include", // Include cookies in the request
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            setSubmissionStatus({
              type: "success",
              message: "Submission successful!",
            });
            setTimeout(() => {
              navigate(`/shecan/${data.id}`);
            }, 2000); // 2000 milliseconds = 2 seconds
          } else {
            setSubmissionStatus({
              type: "error",
              message: "Submission failed. Please try again.",
            });
          }
        })
        .catch((error) => {
          console.error(
            "Submission failed with error:",
            error.message || error
          );
          setSubmissionStatus({
            type: "error",
            message: "Submission failed. Please try again.",
          });
        });

      console.log(payload);
      console.log("Graduate state updated:", graduate);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent Enter from submitting the form
          }
        }}
      >
        <div className={style.resumeFormContainer}>
          <div className={style.leftResContainer}>
            {/* Photo upload */}
            <div className={style.picUpload}>
              <label>Trainee Image</label>
              <input
                type="file"
                name="graduatePicture"
                onChange={handlePictureChange} // Use onChange to handle file input
                accept="image/*"
              />
              {graduate.graduatePicture && (
                <div>
                  <img
                    src={URL.createObjectURL(graduate.graduatePicture)} // Use the file object to create a preview
                    alt="Graduate"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </div>
              )}
            </div>
            {/* skills */}
            <div className={style.skill}>
              <h3>Skills</h3>
              <input
                ref={skillref}
                type="text"
                placeholder="Enter Your Skills, Hit Enter To Add New Skill"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    handleAddItem("skills", e.target.value.trim());
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (skillref.current?.value.trim()) {
                    handleAddItem("skills", skillref.current.value.trim());
                    skillref.current.value = "";
                  }
                }}
              >
                Add Skill
              </button>
              <ul className={style.resLists}>
                {graduate.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className={style.resLang}>
              <h3>Languages</h3>
              {/* Add New Language */}
              <div className={style.langFields}>
                <input
                  type="text"
                  placeholder="Language"
                  value={newLanguage.language}
                  onChange={(e) =>
                    setNewLanguage((prev) => ({
                      ...prev,
                      language: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="Proficiency"
                  value={newLanguage.proficiency}
                  onChange={(e) =>
                    setNewLanguage((prev) => ({
                      ...prev,
                      proficiency: e.target.value,
                    }))
                  }
                />
                <button type="button" onClick={handleAddLanguage}>
                  Add Language
                </button>
              </div>

              {/* List of Languages */}
              <ul>
                {graduate.languages.map((lang, index) => (
                  <li key={index}>
                    <div>
                      <input
                        type="text"
                        value={lang.language}
                        onChange={(e) =>
                          handleUpdateLanguage(index, {
                            language: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={lang.proficiency}
                        onChange={(e) =>
                          handleUpdateLanguage(index, {
                            proficiency: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* cerificate section */}
            <div className={style.resCertificates}>
              <h3>Certificates</h3>
              {/* Add New certificate */}
              <div className={style.certificateFields}>
                <input
                  type="text"
                  placeholder="Cerificate"
                  value={newCertificate.certificateName}
                  onChange={(e) =>
                    setNewCertificate((prev) => ({
                      ...prev,
                      certificateName: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="Certifier"
                  value={newCertificate.certifier}
                  onChange={(e) =>
                    setNewCertificate((prev) => ({
                      ...prev,
                      certifier: e.target.value,
                    }))
                  }
                />
                <input
                  type="date"
                  placeholder="date awarded"
                  value={newCertificate.dateAwarded}
                  onChange={(e) =>
                    setNewCertificate((prev) => ({
                      ...prev,
                      dateAwarded: e.target.value,
                    }))
                  }
                />
                <button type="button" onClick={handleAddCertificate}>
                  Add Certificate
                </button>
              </div>

              {/* List of certificates */}
              <ul>
                {graduate.certificates.map((cert, index) => (
                  <li key={index}>
                    <div>
                      <input
                        type="text"
                        value={cert.certificateName}
                        onChange={(e) =>
                          handleUpdateCertificates(index, {
                            certificateName: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={cert.certifier}
                        onChange={(e) =>
                          handleUpdateCertificates(index, {
                            certifier: e.target.value,
                          })
                        }
                      />
                      <input
                        type="date"
                        value={cert.dateAwarded}
                        onChange={(e) =>
                          handleUpdateCertificates(index, {
                            dateAwarded: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveCertificate(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* awards section */}
            <div className={style.resAwards}>
              <h3>Awards</h3>
              {/* Add New Award */}
              <div className={style.awardFields}>
                <input
                  type="text"
                  placeholder="Award"
                  value={newAward.awardName}
                  onChange={(e) =>
                    setNewAward((prev) => ({
                      ...prev,
                      awardName: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="Awarder"
                  value={newAward.certifier}
                  onChange={(e) =>
                    setNewAward((prev) => ({
                      ...prev,
                      certifier: e.target.value,
                    }))
                  }
                />
                <input
                  type="date"
                  placeholder="Date of Award"
                  value={newAward.dateAwarded}
                  onChange={(e) =>
                    setNewAward((prev) => ({
                      ...prev,
                      dateAwarded: e.target.value,
                    }))
                  }
                />
                <button type="button" onClick={handleAddAward}>
                  Add Award
                </button>
              </div>

              {/* List of Awards */}
              <ul>
                {graduate.awards.map((award, index) => (
                  <li key={index}>
                    <div>
                      <input
                        type="text"
                        value={award.awardName}
                        onChange={(e) =>
                          handleUpdateAward(index, {
                            awardName: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={award.certifier}
                        onChange={(e) =>
                          handleUpdateAward(index, {
                            certifier: e.target.value,
                          })
                        }
                      />
                      <input
                        type="date"
                        value={award.dateAwarded}
                        onChange={(e) =>
                          handleUpdateAward(index, {
                            dateAwarded: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAward(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Interests */}
            <div className={style.resInterest}>
              <h3>Interests</h3>
              <input
                ref={intersetRef}
                type="text"
                placeholder="Enter Your personal Interests,Hit Enter to Add New Interest "
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    handleAddItem("interests", e.target.value.trim());
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (intersetRef.current?.value.trim()) {
                    handleAddItem("interests", intersetRef.current.value);
                    intersetRef.current.value = "";
                  }
                }}
              >
                Add Interest
              </button>
              <ul>
                {graduate.interests.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={style.rightResContainer}>
            {/* Personal Details */}
            <div className={style.gradName}>
              <label>Trainee Name</label>
              <input
                type="text"
                required
                name="graduateName"
                value={graduate.graduateName}
                onChange={handleChange}
              />
            </div>

            <div className={style.gradId}>
              <label>Trainee Id</label>
              <input
                type="text"
                required
                name="graduateId"
                value={shecanId || ""} // Set the value to shecanId
                readOnly // Make the field uneditable
              />
            </div>

            <div className={style.gradProfession}>
              <label>Profession</label>
              <input
                type="text"
                required
                name="graduateProfession"
                value={graduate.graduateProfession}
                onChange={handleChange}
              />
            </div>

            <div className={style.self_description}>
              <label>Self Description</label>
              <textarea
                name="selfDescription"
                required
                value={graduate.selfDescription}
                onChange={handleChange}
              />
            </div>
            {/* Contact Links */}
            <div className={style.socialMediaLinks}>
              <h3>Contact Links</h3>

              <label>Email</label>
              <input
                type="email"
                required
                placeholder="youremail@gmail.com"
                value={graduate.contactLinks.email}
                onChange={(e) => handleNestedChange(e, "contactLinks", "email")}
              />

              <label>Location</label>
              <input
                type="text"
                required
                placeholder="Mexico, Addis Ababa, Ethiopia"
                value={graduate.contactLinks.location}
                onChange={(e) =>
                  handleNestedChange(e, "contactLinks", "location")
                }
              />

              <label>Skype</label>
              <input
                type="text"
                placeholder="username e.g: username123"
                value={graduate.contactLinks.skype}
                onChange={(e) => handleNestedChange(e, "contactLinks", "skype")}
              />

              <label>Mobile Phone</label>
              <input
                type="text"
                required
                placeholder="e.g. +251912345678"
                value={graduate.contactLinks.mobilePhoneNo}
                onChange={(e) =>
                  handleNestedChange(e, "contactLinks", "mobilePhoneNo")
                }
              />

              <label>LinkedIn</label>
              <input
                type="text"
                required
                placeholder="username"
                value={graduate.contactLinks.linkedin}
                onChange={(e) =>
                  handleNestedChange(e, "contactLinks", "linkedin")
                }
              />

              <label>Telegram</label>
              <input
                type="text"
                placeholder="username"
                value={graduate.contactLinks.telegram}
                onChange={(e) =>
                  handleNestedChange(e, "contactLinks", "telegram")
                }
              />

              <label>Instagram</label>
              <input
                type="text"
                placeholder="username"
                value={graduate.contactLinks.instagram}
                onChange={(e) =>
                  handleNestedChange(e, "contactLinks", "instagram")
                }
              />

              <label>Facebook</label>
              <input
                type="text"
                placeholder="username"
                value={graduate.contactLinks.facebook}
                onChange={(e) =>
                  handleNestedChange(e, "contactLinks", "facebook")
                }
              />
            </div>
            {/* Work Experience Section */}
            <div className={style.workExperience}>
              <h3>Work Experience</h3>
              {/* Add New Work Experience */}
              <div>
                <div>
                  <label>Working Position</label>
                  <input
                    type="text"
                    placeholder="Job at the Company"
                    value={newWorkExperience.profession}
                    onChange={(e) =>
                      setNewWorkExperience((prev) => ({
                        ...prev,
                        profession: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label>Company's Name</label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={newWorkExperience.companyName}
                    onChange={(e) =>
                      setNewWorkExperience((prev) => ({
                        ...prev,
                        companyName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label>First Day In The Company</label>
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={newWorkExperience.startDate}
                    onChange={(e) =>
                      setNewWorkExperience((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label>Last Day In the Company</label>
                  <input
                    type="date"
                    placeholder="Termination Date"
                    value={newWorkExperience.terminationDate}
                    onChange={(e) =>
                      setNewWorkExperience((prev) => ({
                        ...prev,
                        terminationDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label>Location Of The Company</label>
                  <input
                    type="text"
                    placeholder="Location Of The Company"
                    value={newWorkExperience.locationOfCompany}
                    onChange={(e) =>
                      setNewWorkExperience((prev) => ({
                        ...prev,
                        locationOfCompany: e.target.value,
                      }))
                    }
                  />
                </div>
                <button type="button" onClick={handleAddWorkExperience}>
                  Add Work Experience
                </button>
              </div>
              {/* List of Work Experience */}
              <ul>
                {graduate.workExperience.map((work, index) => (
                  <li key={index}>
                    <div>
                      <input
                        type="text"
                        value={work.profession}
                        onChange={(e) =>
                          handleupdateWorkExperience(index, {
                            profession: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={work.companyName}
                        onChange={(e) =>
                          handleupdateWorkExperience(index, {
                            companyName: e.target.value,
                          })
                        }
                      />
                      <input
                        type="date"
                        value={work.startDate}
                        onChange={(e) =>
                          handleupdateWorkExperience(index, {
                            startDate: e.target.value,
                          })
                        }
                      />
                      <input
                        type="date"
                        value={work.terminationDate}
                        onChange={(e) =>
                          handleupdateWorkExperience(index, {
                            terminationDate: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={work.locationOfCompany}
                        onChange={(e) =>
                          handleupdateWorkExperience(index, {
                            locationOfCompany: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveWorkExperience(index)}
                      >
                        Remove
                      </button>
                    </div>
                    {/* Experience Descriptions */}
                    {work.exprienceDescriptions && (
                      <ul>
                        {work.exprienceDescriptions.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    )}
                    <textarea
                      ref={expDetail}
                      type="text"
                      placeholder="Add a detail of your experience here. Hit Enter to start a new bullet Point"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          handleAddWorkExperienceDetail(index, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (expDetail.current?.value.trim()) {
                          handleAddWorkExperienceDetail(
                            index,
                            expDetail.current.value
                          );
                          expDetail.current.value = "";
                        }
                      }}
                    >
                      Add Experience detail
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* eductation section */}
            <div className={style.resEducation}>
              <h3>Educational Background</h3>
              {/* Add New education */}
              <div className={style.education}>
                <div>
                  <div>
                    <label> Field Of Study </label>
                    <input
                      type="text"
                      placeholder="Field Of Study"
                      value={newEducation.field_of_study}
                      onChange={(e) =>
                        setNewEducation((prev) => ({
                          ...prev,
                          field_of_study: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>University/ College</label>
                    <input
                      type="text"
                      placeholder="University / College"
                      value={newEducation.university}
                      onChange={(e) =>
                        setNewEducation((prev) => ({
                          ...prev,
                          university: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label> Education Stared on (Date)</label>
                    <input
                      type="date"
                      placeholder="Starting Date"
                      value={newEducation.startDate}
                      onChange={(e) =>
                        setNewEducation((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>Graduation Date</label>
                    <input
                      type="date"
                      placeholder="Graduation Date"
                      value={newEducation.graduationDate}
                      onChange={(e) =>
                        setNewEducation((prev) => ({
                          ...prev,
                          graduationDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>Location of the Campus</label>
                    <input
                      type="text"
                      placeholder="Campus Location"
                      value={newEducation.location}
                      onChange={(e) =>
                        setNewEducation((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <button type="button" onClick={handleAddEducation}>
                    Add Educational Data
                  </button>
                </div>
              </div>

              {/* List of Education data */}
              <ul>
                {graduate.education.map((edu, index) => (
                  <li key={index}>
                    <div className={style.eduDiv}>
                      <input
                        type="text"
                        value={edu.field_of_study}
                        onChange={(e) =>
                          handleUpdateEducation(index, {
                            field_of_study: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={edu.university}
                        onChange={(e) =>
                          handleUpdateEducation(index, {
                            university: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleUpdateEducation(index, {
                            startDate: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={edu.graduationDate}
                        onChange={(e) =>
                          handleUpdateEducation(index, {
                            graduationDate: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) =>
                          handleUpdateEducation(index, {
                            location: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveEducation(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/*end of the form */}
        </div>
        <button className={style.formSubmitBtn} onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {submissionStatus && (
        <div
          style={{
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            backgroundColor:
              submissionStatus.type === "success" ? "#d4edda" : "#f8d7da",
            color: submissionStatus.type === "success" ? "#155724" : "#721c24",
          }}
        >
          {submissionStatus.message}
        </div>
      )}
    </>
  );
};
export default ResumeForm;
