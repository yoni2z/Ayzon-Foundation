import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const shecanId = location.state?.shecanId;

  function getCSRFToken() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "csrftoken") return value;
    }
    return null;
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!shecanId) {
      setError("SheCan ID is missing. Please log in again.");
      return;
    }

    const response = await fetch(
      "https://ayzonfoundation.org/api/change_password/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        credentials: "include",
        body: JSON.stringify({
          shecan_id: shecanId,
          new_password: newPassword,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log(shecanId);
      navigate("/shecan_form", { state: { shecanId: shecanId } });
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="change-password-container">
      <form className="change-password-form" onSubmit={handleChangePassword}>
        <h2 className="change-password-title">Change Password</h2>
        {error && <p className="change-password-error">{error}</p>}
        <div className="form-group">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            className="form-input"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="change-password-button">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
