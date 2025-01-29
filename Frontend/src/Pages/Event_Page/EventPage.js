import React, { useState, useEffect } from "react";
import axios from "axios";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fetch events data on component mount
  useEffect(() => {
    axios
      .get("https://ayzonfoundation.org/api/events/")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events data:", error);
        setLoading(false);
      });
  }, []);

  const toggleDetails = (eventId) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          event.showDetails = !event.showDetails;
          if (event.showDetails) {
            // Fetch event details along with registered users
            axios
              .get(
                `https://ayzonfoundation.org/api/events/registered/${eventId}/`
              )
              .then((response) => {
                setSelectedEvent(response.data);
              })
              .catch((error) => {
                console.error("Error fetching event details:", error);
              });
          }
        }
        return event;
      })
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!selectedEvent) {
      setMessage("Please select an event to register.");
      return;
    }

    fetch("https://ayzonfoundation.org/api/events/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: selectedEvent.id,
        name,
        email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(data.message);
        } else {
          setMessage("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Registration Failed");
      });
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <h1>Events</h1>
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <div className="event-summary">
            <img
              src={`${event.images[0]?.image}`}
              alt={event.title}
              className="event-thumbnail"
            />
            <div className="event-info">
              <h2>{event.title}</h2>
              <p>
                <strong>Venue:</strong> {event.venue}
              </p>
              <button onClick={() => toggleDetails(event.id)}>
                {event.showDetails ? "Show Less" : "Show More"}
              </button>
            </div>
          </div>

          {event.showDetails && selectedEvent?.id === event.id && (
            <div className="event-details">
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div className="event-images">
                <h3>Images</h3>
                {event.images.map((img, index) => (
                  <img
                    key={index}
                    src={`${img.image}`}
                    alt={`Event ${event.title}`}
                    width="200"
                  />
                ))}
              </div>
              <h3>Register for this Event</h3>
              <form onSubmit={handleRegister}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Email: </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Register</button>
              </form>
              {message && <p>{message}</p>}

              {/* Sponsors */}
              <div className="event-sponsors">
                <h3>Sponsors</h3>
                {event.sponsors.map((sponsor) => (
                  <div key={sponsor.id}>
                    <img
                      src={`${sponsor.logo}`}
                      alt={sponsor.name}
                      width="100"
                    />
                    <p>{sponsor.name}</p>
                  </div>
                ))}
              </div>

              {/* Invited Guests */}
              <div className="event-guests">
                <h3>Invited Guests</h3>
                {event.invited_guests.map((guest) => (
                  <div key={guest.id}>
                    <img src={`${guest.photo}`} alt={guest.name} width="80" />
                    <p>{guest.name}</p>
                  </div>
                ))}
              </div>

              {/* Registered Users Table */}
              {selectedEvent?.registered_users && (
                <div>
                  <h3>Registered Users</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEvent.registered_users.map((user, index) => (
                        <tr key={index}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventPage;
