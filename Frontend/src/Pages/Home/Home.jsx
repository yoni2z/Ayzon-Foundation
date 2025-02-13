import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import menufooter from "../../Assets/Images/General/menu-footer.png";
import shecan from "../../Assets/Images/shecan.jpg";
import "./styles.css";
import Map from "../../Components/Map/Map";
import { Projectcard } from "../../Components/ProjectCard/Projectcard";
import { Newscard } from "../../Components/NewsCard/Newscard";
import { IoLocationOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import emailjs from "@emailjs/browser";
import shalom_picture from "../../Assets/Images/shalom_picture.jpg";
import homepage_whoweare from "../../Assets/Images/homepage_whoweare.jpg";
import home_hero_background from "../../Assets/Images/home_hero_background.jpg";

export const Home = () => {
  const statsRef = useRef(null); // Reference for the stats section
  const [startCounting, setStartCounting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  const [beneficiaries, setBeneficiaries] = useState(0);
  const [regions, setRegions] = useState(0);
  const [volunteers, setVolunteers] = useState(0);
  const [project, setProject] = useState(0);

  const countToTarget = (target, setState, duration) => {
    const increment = target / (duration / 10); // Update every 10ms
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setState(target);
        clearInterval(interval);
      } else {
        setState(Math.ceil(current));
      }
    }, 10);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect(); // Stop observing after triggering
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the stats section is visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);

  useEffect(() => {
    if (startCounting) {
      countToTarget(5000, setBeneficiaries, 3500);
      countToTarget(7, setRegions, 3500);
      countToTarget(500, setVolunteers, 3500);
      countToTarget(15, setProject, 3500);
    }
  }, [startCounting]);

  useEffect(() => {
    axios
      .get("https://ayzonfoundation.org/api/blogs/")
      .then((response) => {
        setBlogs(response.data.slice(0, 4));
        setLoading(false);
      })
      .catch((error) => {
        setError("There was an error fetching the data!");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://ayzonfoundation.org/api/project-details/")
      .then((response) => {
        // Get the full list of projects
        const allProjects = response.data;

        // Randomly select 3 projects
        const randomProjects = getSpecificProjects(allProjects, 3);

        setProjects(randomProjects);
        setLoading(false);
      })
      .catch((error) => {
        setError("There was an error fetching the data!");
        setLoading(false);
      });
  }, []);

  const getSpecificProjects = (projectsArray, ids) => {
    return ids
      .map((id) => projectsArray.find((project) => project.id === id))
      .filter(Boolean); // Remove any undefined values in case an ID isn't found
  };

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7t4o6pu",
        "template_68zgv6l",
        e.target,
        "nhpZUKrIGH85yYGTN"
      )
      .then(
        (result) => {
          alert("Your message has been sent!");
        },
        (error) => {
          alert("Failed to send your message. Please try again.");
        }
      );

    e.target.reset();
  };

  return (
    <div className="home-container">
      <div
        className="home-container-hero"
        style={{ backgroundImage: `url(${home_hero_background})` }}
      >
        <div className="home-container-hero-texts">
          <h1>
            READY TO <br />
            SPREAD JOY?
          </h1>
          <p>BEYOND COMFORTING WORDS</p>
          <div className="hero-buttons">
            <Link to="/actions">
              <a>DONATE</a>
            </Link>
            <Link to="/actions">
              <a>GET INVOLVED</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-container-whoweare">
        <div className="home-container-whoweare-container">
          <ul className="home-container-whoweare-container-header">
            <li className="home-container-whoweare-container-header-texts">
              <h2 className="home-container-whoweare-container-header-text">
                ABOUT US
              </h2>
            </li>
            <li>
              <img src={menufooter} alt="" />
            </li>
          </ul>
          <div className="home-container-whoweare-container-content">
            {/* <div className="home-container-whoweare-container-content-image">
              <img src={homepage_whoweare} alt="" />
            </div> */}

            <div className="home-container-whoweare-container-content-description">
              <p>
                Ayzon Foundation is a non-profit organization in Ethiopia that
                addresses various societal issues in line with the United
                Nations Sustainable Development Goals (SDGs), collaborating with
                over 300 volunteers. <br></br>
                The organization is licensed under the Federal Democratic
                Republic of Ethiopia under ACSO (Authority for Civil Society
                Organization, Ethiopia) with registration number 6336. <br></br>
                It is committed to making a positive impact in the community.
              </p>
              <Link to={`/who-we-are`}>
                <a>LEARN MORE</a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="video-section">
        <ul>
          <li>
            <h2 className="video-section-title">WHO IS AYZON?</h2>
          </li>
          <li>
            <img src={menufooter} alt="" />
          </li>
        </ul>
        <div className="video-containers">
          <iframe
            className="responsive-video"
            src="https://www.youtube.com/embed/0nUQwasuOpw?si=RbjVzCfvhYMJElQ_"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="home-container-projecthighlights">
        <ul className="home-container-projecthighlights-header">
          <li className="home-container-projecthighlights-header-texts">
            <h2 className="home-container-projecthighlights-header-text">
              PROJECT HIGHLIGHTS
            </h2>
          </li>
          <li>
            <img src={menufooter} alt="" />
          </li>
        </ul>

        <div className="home-container-projecthighlights-projects">
          {projects.map((project) => (
            <Projectcard
              key={project.id}
              id={project.id}
              description={project.description}
              name={project.title}
              image={project.image}
              color={project.color}
            />
          ))}
        </div>
        <div className="home-container-projecthighlights-more">
          <Link
            to="/what-we-do"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Load More Projects
          </Link>
        </div>
      </div>
      <div className="home-container-stats" ref={statsRef}>
        <ul>
          <li className="home-container-stats-number">{beneficiaries}+</li>
          <li className="home-container-stats-text">BENEFICIARIES</li>
        </ul>
        <ul>
          <li className="home-container-stats-number">{regions}+</li>
          <li className="home-container-stats-text">REGIONS</li>
        </ul>
        <ul>
          <li className="home-container-stats-number">{volunteers}+</li>
          <li className="home-container-stats-text">VOLUNTEERS</li>
        </ul>
        <ul>
          <li className="home-container-stats-number">{project}+</li>
          <li className="home-container-stats-text">PROJECTS</li>
        </ul>
      </div>
      <div className="home-container-founder">
        <ul className="home-container-founder-header">
          <li className="home-container-founder-header-texts">
            <h2 className="home-container-founder-header-text">
              MEET THE FOUNDER
            </h2>
          </li>
          <li>
            <img src={menufooter} alt="" />
          </li>
        </ul>
        <div className="home-container-founder-contents">
          <div className="home-container-founder-content-shalom">
            <div className="home-container-founder-content-shalom-image">
              <img src={shalom_picture} alt="SHALOM YACOB" />
            </div>
            <div className="home-container-founder-content-shalom-profile">
              <h3>SHALOM YACOB ARAYA</h3>
              <p>FOUNDER AND EXECUTIVE DIRECTOR</p>
            </div>
          </div>
          <div className="home-container-content-quote">
            <p>
              " The problems seem countless, but the solution is within us. The
              best thing to do is to gather. A wealthy man can’t taste the
              sweetness of life living under a community that is suffering to
              make a living. Together, we rise above challenges, sharing burdens
              and joys alike. Only through unity can we build a future where
              everyone thrives. Compassion and collaboration are the keys to
              unlocking the true potential of humanity, turning struggles into
              stepping stones for success."
            </p>
            <Link to="/meet-the-founder">MEET THE FOUNDER</Link>
          </div>
        </div>
      </div>
      <div className="home-container-news">
        <ul className="home-container-news-header">
          <li className="home-container-news-header-texts">
            <h2 className="home-container-news-header-text">NEWS & BLOGS</h2>
          </li>
          <li>
            <img src={menufooter} alt="Menu footer icon" />
          </li>
        </ul>
        <div className="home-container-news-cards">
          {blogs.map((blog) => (
            <Newscard
              key={blog.id}
              title={truncateText(blog.title, 50)}
              description={truncateText(blog.description, 100)}
              image={blog.image}
            />
          ))}
        </div>
      </div>
      <div className="home-container-contactus">
        <ul className="home-container-contactus-header">
          <li className="home-container-contactus-header-texts">
            <h2 className="home-container-contactus-header-text">
              GET IN TOUCH
            </h2>
          </li>
          <li>
            <img src={menufooter} alt="" />
          </li>
        </ul>
        <div className="home-container-contactus-form">
          <div className="home-container-contactus-form-left">
            <div className="home-container-contactus-form-left-icons">
              <IoLocationOutline className="icon" />
              <CiPhone className="icon" />
              <TfiEmail className="icon" />
            </div>
            <div className="home-container-contactus-form-left-texts">
              <p style={{ marginBottom: "23px" }}>
                Next to British School, 205,Tegela Building, Africa Ave, Addis
                Ababa
              </p>
              <p style={{ marginBottom: "29px" }}>
                +251944694469 or +251933940094
              </p>
              <p style={{ marginBottom: "5px" }}>info@ayzonfoundation.org</p>
            </div>
          </div>
          <div
            id="line_get_in_touch"
            style={{ borderLeft: "1px solid black", height: "250px" }}
          ></div>

          <form
            onSubmit={sendEmail}
            className="home-container-contactus-form-right"
          >
            <div className="home-container-contactus-form-right">
              <div className="home-container-contactus-form-right-name">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name" // Matches {{name}} in your template
                  placeholder="Enter your name please"
                  required
                />
              </div>
              <div className="home-container-contactus-form-right-email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email please"
                  required
                />
              </div>
              <div className="home-container-contactus-form-right-message">
                <label htmlFor="description">Message</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter your message here"
                  required
                ></textarea>
              </div>
              <button type="submit" className="send">
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <Map /> */}
    </div>
  );
};
