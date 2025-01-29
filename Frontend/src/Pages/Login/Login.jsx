import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [shecanId, setShecanId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function getCSRFToken() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "csrftoken") return value;
    }
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("https://ayzonfoundation.org/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
      credentials: "include",
      body: JSON.stringify({ shecan_id: shecanId, password }),
    });

    const data = await response.json();
    if (response.ok) {
      navigate(data.redirect, { state: { shecanId: shecanId } });
    } else {
      setError(data.message);
    } 
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <div className="form-group">
          <label htmlFor="shecanId" className="form-label">
            SheCan ID
          </label>
          <input
            id="shecanId"
            type="text"
            className="form-input"
            placeholder="Enter your SheCan ID"
            value={shecanId}
            onChange={(e) => setShecanId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
