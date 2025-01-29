import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Components/Carousel";
import axios from "axios";
import "./Events.css";

function Events() {
  const [activeTab, setActiveTab] = useState("completed");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ayzonfoundation.org/api/events/")
      .then((response) => {
        const events = response.data;
        const now = new Date();
        const upcoming = events.filter((event) => new Date(event.date) > now);
        const completed = events.filter((event) => new Date(event.date) <= now);
        setUpcomingEvents(upcoming);
        setCompletedEvents(completed);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const eventsToShow =
    activeTab === "upcoming" ? upcomingEvents : completedEvents;

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  return (
    <div className="App">
      <Carousel />
      <div className="events_head">
        <div className="event-bg-container">
          <div className="events_txt"> Events </div>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
        <button
          className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
      </div>

      <div className="events-container">
        {eventsToShow.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-date">
              <span className="day">{new Date(event.date).getDate()}</span>
              <span className="month">
                {new Date(event.date)
                  .toLocaleString("en", { month: "short" })
                  .toUpperCase()}
              </span>
            </div>
            <div
              className="event-bg-img"
              style={{
                backgroundImage: `url(${event.image || "default-image.jpg"})`,
              }}
            ></div>
            <div className="event-details">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">
                {truncateText(event.description, 100)}
              </p>
              <button
                className="register-button"
                onClick={() => navigate(`/event/${event.id}`)}
              >
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
