import React from "react";
import { Link } from "react-router-dom";
import AyzonLogo from "../../Assets/Images/Navbar/ayzon-logo.png";
import { FaFacebook } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { PiLessThanThin } from "react-icons/pi";
import { PiGreaterThanThin } from "react-icons/pi";
import emailjs from "@emailjs/browser";
import "./Footer.css";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7t4o6pu",
        "template_1ftdnnc",
        e.target,
        "nhpZUKrIGH85yYGTN"
      )
      .then(
        (result) => {
          alert("Thank you for subscribing!");
        },
        (error) => {
          alert("Failed to subscribe. Please try again.");
        }
      );

    e.target.reset();
  };

  return (
    <>
      <div className="home-container-footer" style={{ paddingBottom: "50px" }}>
        <div className="home-container-footer-inside_container">
          <div className="home-container-footer-bio">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <div className="home-container-footer-bio-logo">
                <img src={AyzonLogo} alt="" />
              </div>
            </Link>
            <div className="home-container-footer-bio-header">
              <h2>Subscribe to our newsletter</h2>
            </div>
            <form
              className="home-container-footer-bio-email"
              onSubmit={handleSubscribe}
            >
              <label
                htmlFor="email"
                style={{ fontWeight: "normal", width: "90vw" }}
              >
                Subscribe to Our Newsletter
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
                style={{ marginTop: "10px", padding: "8px", width: "100%" }}
              />
              <button
                type="submit"
                style={{
                  marginTop: "15px",
                  padding: "10px 20px",
                  backgroundColor: "#ff5349",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
          <div className="home-container-footer-links">
            <h2>USEFUL LINKS</h2>
            <ul>
              <li>
                <Link
                  to="/"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/what-we-do"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  PROJECTS & PROGRAMS
                </Link>
              </li>
              <li>
                <Link
                  to="/actions"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  MEMBERSHIP
                </Link>
              </li>
              <li>
                <Link
                  to="/event"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  EVENTS
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  GALLERY
                </Link>{" "}
              </li>
              <li>
                <Link
                  to="/blogs"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  BLOGS
                </Link>
              </li>
              <li>
                <Link
                  to="/meet-the-founder"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  MEET THE FOUNDER
                </Link>{" "}
              </li>
              <li>
                <Link
                  to="/who-we-are"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  ABOUT
                </Link>{" "}
              </li>
            </ul>
          </div>
          <div className="home-container-footer-contacts">
            <h2 id="contacts">CONTACTS</h2>
            <div className="home-container-footer-contacts-items">
              <div className="home-container-footer-contacts-icons">
                <div className="Location_container">
                  <IoLocationOutline className="icon" id="location" />
                  <p>
                    Next to British School, 205,Tegela Building, Africa Ave,
                    Addis Ababa
                  </p>
                </div>
                <div className="Phone_container">
                  <CiPhone className="icon" />
                  <p>+25193881111</p>
                </div>
                <div className="Email_container">
                  <TfiEmail
                    className="icon"
                    style={{ transform: "scale(0.8)" }}
                  />
                  <p>info@ayzonfoundation.org</p>
                </div>
              </div>
            </div>
            <div className="home-container-footer-contacts-apps">
              <a
                href="mailto: info@ayzonfoundation.org"
                className="Socialicons"
                id="mail"
                target="_blank"
              >
                <TfiEmail />
              </a>
              <a
                href="https://web.facebook.com/ayzonfoundation/"
                className="Socialicons"
                id="facebook"
                target="_blank"
              >
                <FaFacebook />
              </a>
              <a
                href="https://x.com/ayzonfoundation"
                className="Socialicons"
                id="x"
                target="_blank"
              >
                <BsTwitterX />
              </a>
              <a
                href="https://www.linkedin.com/company/ayzonfoundation/"
                className="Socialicons"
                id="linkedin"
                target="_blank"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.youtube.com/channel/UCx5IKqJswoF0aQB--cLma3g"
                className="Socialicons"
                id="youtube"
                target="_blank"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.tiktok.com/@ayzon.foundation"
                className="Socialicons"
                id="tiktok"
                target="_blank"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="home-container-trademark">
        &copy; {new Date().getFullYear()} Ayzon Foundation All rights reserved.
      </div>
    </>
  );
};

export default Footer;
