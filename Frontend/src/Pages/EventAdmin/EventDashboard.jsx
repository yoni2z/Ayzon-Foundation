import React, { useState, useEffect } from "react";
import EventDetailsWithRegistrations from "./EventDetailsWithRegistrations";
import "./EventDashboard.css";

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    // Fetch all events
    fetch("https://ayzonfoundation.org/api/events/")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        if (data.length > 0) {
          setSelectedEventId(data[0].id); // Automatically select the first event
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="event-dashboard-container">
      <div className="event-list-container">
        <h2 className="event-list-title">Events</h2>
        <ul className="event-list-items">
          {events.map((event) => (
            <li
              key={event.id}
              className={`event-list-item ${
                selectedEventId === event.id ? "event-list-item-active" : ""
              }`}
              onClick={() => setSelectedEventId(event.id)}
            >
              {event.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="event-details-container">
        {selectedEventId ? (
          <EventDetailsWithRegistrations eventId={selectedEventId} />
        ) : (
          <p>Please select an event to view the details.</p>
        )}
      </div>
    </div>
  );
};

export default EventDashboard;
