import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./Carousel.css";

// Assuming the API endpoint for events is '/api/events'
const fetchEventData = async () => {
  try {
    const response = await fetch("https://ayzonfoundation.org/api/events/"); // Replace with actual API endpoint
    const data = await response.json();
    return data; // Expected format: [{ title, description, imageUrl }]
  } catch (error) {
    console.error("Error fetching event data:", error);
    return []; // Return an empty array in case of error
  }
};

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Track if carousel is paused
  const [events, setEvents] = useState([]); // Store event data from API
  const navigate = useNavigate(); // Initialize navigate hook

  // Fetch event data on component mount
  useEffect(() => {
    const getEventData = async () => {
      const data = await fetchEventData();
      setEvents(data);
    };

    getEventData();
  }, []);

  // Automatically change slides every 3 seconds if not paused
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % events.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, currentSlide, events.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + events.length) % events.length);
  };

  const handleButtonClick = (eventId) => {
    navigate(`/event/${eventId}`); // Navigate to the event detail page
  };

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on leave
    >
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {events.map((event, index) => (
          <div key={index} className="carousel-slide">
            <div
              className="carousel-background"
              style={{ backgroundImage: `url(${event.images[0].image})` }}
            ></div>
            <div className="carousel-content">
              <h2 className="carousel-h1">{event.title}</h2>
              <p className="carousal-p">
                {event.description.substring(0, 20)}
                {event.description.length > 20 ? "..." : ""}
              </p>
              <button onClick={() => handleButtonClick(event.id)}>
                VIEW EVENT
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-arrow left" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="carousel-arrow right" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="carousel-dots">
        {events.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
