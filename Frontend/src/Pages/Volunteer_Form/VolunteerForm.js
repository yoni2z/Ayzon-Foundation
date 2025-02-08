import React, { useEffect, useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./VolunteerForm.css";

const VolunteerForm = () => {
  const [choices, setChoices] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    fathers_name: "",
    grandfathers_name: "",
    date_of_birth: "",
    gender: "",
    nationality: "",
    marital_status: "",
    employment_status: "",
    education: "",
    address: "",
    phone_number: "",
    second_phone_number: "",
    email_address: "",
    telegram_username: "",
    field_of_work: "",
    work_experience: "",
    available_hours: "",
    interests: "",
    preferred_team: "",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user-choices/")
      .then((response) => {
        setChoices(response.data);
      })
      .catch((error) => console.error("Error fetching choices:", error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneNumberChange = (value) => {
    setFormData({ ...formData, phone_number: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form data:", formData);
    axios
      .post("http://127.0.0.1:8000/api/volunteers/", formData)
      .then((response) => {
        console.log("User created:", response.data);
        setFormData({
          first_name: "",
          fathers_name: "",
          grandfathers_name: "",
          date_of_birth: "",
          gender: "",
          nationality: "",
          marital_status: "",
          employment_status: "",
          education: "",
          address: "",
          phone_number: "",
          second_phone_number: "",
          email_address: "",
          telegram_username: "",
          field_of_work: "",
          work_experience: "",
          available_hours: "",
          interests: "",
          preferred_team: "",
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Server Error:", error.response.data);
        } else {
          console.error("Error creating user:", error);
        }
      });
  };

  return (
    <>
      <form className="volunteer-form" onSubmit={handleSubmit}>
        <h1 className="volunteer_header">Ayzon Foundation Volunteer Form</h1>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Father's Name:</label>
          <input
            type="text"
            name="fathers_name"
            value={formData.fathers_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Grandfather's Name:</label>
          <input
            type="text"
            name="grandfathers_name"
            value={formData.grandfathers_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            {choices.gender_choices &&
              choices.gender_choices.map((choice, index) => (
                <option key={index} value={choice[0]}>
                  {choice[1]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Nationality:</label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Nationality</option>
            {choices.nationality_choices &&
              choices.nationality_choices.map((choice, index) => (
                <option key={index} value={choice[0]}>
                  {choice[1]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Marital Status:</label>
          <select
            name="marital_status"
            value={formData.marital_status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Marital Status</option>
            {choices.marital_status_choices &&
              choices.marital_status_choices.map((choice, index) => (
                <option key={index} value={choice[0]}>
                  {choice[1]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Employment Status:</label>
          <select
            name="employment_status"
            value={formData.employment_status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Employment Status</option>
            {choices.employment_status_choices &&
              choices.employment_status_choices.map((choice, index) => (
                <option key={index} value={choice[0]}>
                  {choice[1]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Education:</label>
          <select
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Education</option>
            {choices.education_choices &&
              choices.education_choices.map((choice, index) => (
                <option key={index} value={choice[0]}>
                  {choice[1]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <PhoneInput
            value={formData.phone_number}
            onChange={handlePhoneNumberChange}
            placeholder="Enter phone number"
            required
          />
        </div>
        <div>
          <label>Second Phone Number:</label>
          <PhoneInput
            value={formData.second_phone_number}
            onChange={handlePhoneNumberChange}
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            name="email_address"
            value={formData.email_address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Telegram Username:</label>
          <input
            type="text"
            name="telegram_username"
            value={formData.telegram_username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Field of Work:</label>
          <input
            type="text"
            name="field_of_work"
            value={formData.field_of_work}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Work Experience:</label>
          <select
            name="work_experience"
            value={formData.work_experience}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Work Experience</option>
            {choices.work_experience_choices &&
              choices.work_experience_choices.map((choice, index) => (
                <option key={index} value={choice[0]}>
                  {choice[1]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Available Hours:</label>
          <select
            name="available_hours"
            value={formData.available_hours}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Available Hours</option>
            {choices.available_hours_choices &&
              choices.available_hours_choices.map((choice, index) => (
                <option key={index} value={choice[0]}>
                  {choice[1]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Interests:</label>
          <select
            name="interests"
            value={formData.interests}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Interests</option>
            {choices.interests_choices &&
              choices.interests_choices.map((choice, index) => (
                <option key={index} value={choice[0]}>
                  {choice[1]}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Preferred Team:</label>
          <select
            name="preferred_team"
            value={formData.preferred_team}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Preferred Team</option>
            {choices.team_choices &&
              choices.team_choices.map((choice, index) => (
                <option key={index} value={choice[0]}>
                  {choice[1]}
                </option>
              ))}
          </select>
        </div>
        <button className="volunteer-submit-button" type="submit">Submit</button>
      </form>
    </>
  );
};

export default VolunteerForm;
