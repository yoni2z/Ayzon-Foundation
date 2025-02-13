import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import AyzonLogo from "../../Assets/Images/Navbar/ayzon-logo.png";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { PiEqualsLight } from "react-icons/pi";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Track navbar visibility
  const inactivityTimer = useRef(null); // Timer for inactivity
  const navbarRef = useRef(null); // Ref for navbar

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsVisible(true); // Make navbar visible when scrolling

      // Reset inactivity timer
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Hide navbar after 5 seconds of inactivity
    };

    const handleMouseEnter = () => {
      // Reset the timer when the mouse enters the navbar
      clearTimeout(inactivityTimer.current);
      setIsVisible(true); // Keep the navbar visible when the mouse is over it
    };

    window.addEventListener("scroll", handleScroll);

    // Adding mouse enter event to the navbar
    if (navbarRef.current) {
      navbarRef.current.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (navbarRef.current) {
        navbarRef.current.removeEventListener("mouseenter", handleMouseEnter);
      }
      clearTimeout(inactivityTimer.current);
    };
  }, []);

  return (
    <div
      ref={navbarRef}
      className={`navbar-container ${isScrolled ? "scrolled" : ""} ${
        isVisible ? "" : "hidden"
      }`}
    >
      <Link
        to="/"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div className="navbar-logo">
          <img src={AyzonLogo} alt="Ayzon Foundation" />
        </div>
      </Link>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <PiEqualsLight />}
      </div>

      <div className={`navbar-links ${menuOpen ? "show" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={closeMenu}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/who-we-are" onClick={closeMenu}>
              WHO WE ARE
            </Link>
          </li>
          <li>
            <Link to="/what-we-do" onClick={closeMenu}>
              WHAT WE DO
            </Link>
          </li>
          <li className="navbar-dropdown">
            <div className="navbar-dropdown-toggle" onClick={toggleDropdown}>
              WHAT'S NEW <IoIosArrowDown />
            </div>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/event"
                    className="dropdown-item"
                    onClick={closeMenu}
                  >
                    EVENTS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="dropdown-item"
                    onClick={closeMenu}
                  >
                    BLOGS
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="dropdown-item"
                    onClick={closeMenu}
                  >
                    PHOTO GALLERY
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/getinvolved" onClick={closeMenu}>
              GET INVOLVED
            </Link>
          </li>
        </ul>
        <a
          href="https://store.ayzonfoundation.org/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "100px" }}
        >
          <FaShoppingCart size={30} color="white" />{" "}
          {/* Increased size to 30 */}
        </a>
        <Link to="/actions" onClick={closeMenu}>
          <a className="donate-btn">DONATE</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
