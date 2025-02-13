import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Countdown from "react-countdown";
import { motion } from "framer-motion";
import "./Events.css";
import blogPic from "../../Assets/Images/Blog/blogs.jpg";

function Events() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ayzonfoundation.org/api/events/")
      .then((response) => {
        const events = response.data;
        const sortedEvents = events.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setEvents(sortedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  const eventsPerPage = 4;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const FlipUnit = ({ value, label }) => {
    return (
      <div className="flip-container">
        <motion.div
          className="flip-unit"
          initial={{ rotateX: 180, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -180, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {String(value).padStart(2, "0")}
        </motion.div>
        <span className="flip-label">{label}</span>
      </div>
    );
  };

  return (
    <div className="events">
      <div className="blog-section">
        <img
          src={blogPic}
          alt="Ayzon Foundation Blog Image"
          className="background-image-blog"
        />
        <h1>EVENTS</h1>
      </div>

      <div className="events-container">
        <h1 className="next-event">Next Event</h1>
        {currentEvents.map((event, index) => (
          <div
            key={index}
            className={`event-card ${
              index === 0 ? "full-width" : "half-width"
            }`}
          >
            {index === 0 ? (
              <div className="full-width-layout">
                <div className="event-img-col">
                  <div className="event-img-1">
                    <img src={event.images[0].image} alt={event.title} />
                  </div>
                  <h1 className="upcoming-event">Upcoming Event</h1>
                </div>
                <div className="event-content">
                  <div className="custom-countdown"></div>

                  <Countdown
                    date={new Date(`${event.date}T${event.time}Z`)}
                    renderer={({
                      days,
                      hours,
                      minutes,
                      seconds,
                      completed,
                    }) => {
                      if (completed) {
                        return (
                          <div className="flip-countdown completed">
                            Event has completed
                          </div>
                        );
                      }
                      return (
                        <div className="flip-countdown">
                          <FlipUnit value={days} label="Days" />{" "}
                          <p className="countdown-colon">:</p>
                          <FlipUnit value={hours} label="Hours" />{" "}
                          <p className="countdown-colon">:</p>
                          <FlipUnit value={minutes} label="Minutes" />{" "}
                          <p className="countdown-colon">:</p>
                          <FlipUnit value={seconds} label="Seconds" />
                        </div>
                      );
                    }}
                  />

                  <h2 className="event1-title">{event.title}</h2>
                  <p className="event1-description">
                    {truncateText(event.description, 125)}
                  </p>
                  <p className="event1-venue">{event.venue}</p>

                  <button
                    className="register1-button"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    Register
                  </button>
                </div>
              </div>
            ) : (
              <div className="half-width-layout">
                <div className="event-img">
                  <img src={event.images[0].image} alt={event.title} />
                </div>
                <div className="event-details">
                  <h2 className="event-title">{event.title}</h2>
                  <p className="event-description">
                    {truncateText(event.description, 56)}
                  </p>
                  <p className="event-venue">{event.venue}</p>
                  <button
                    className="register-button"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="event-subscribe">
        <h1 className="subscribe-title">DON'T MISS OUT ON ANY EVENTS!</h1>
        <p className="subscribe-text">
          Subscribe to never miss out on any events.
        </p>
        <div className="subscribe-box">
          <input
            type="email"
            placeholder="Enter your email here"
            className="subscribe-input"
          />
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>

      <div className="events-pagination">
        <button
          className="events-page-button"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`events-page-button ${
              currentPage === i + 1 ? "active" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="events-page-button"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Events;
