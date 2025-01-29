import React, { useEffect, useState } from "react";

const EventDetailsWithRegistrations = ({ eventId }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to convert 24-hour time format to 12-hour AM/PM format and adjust for time difference
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);

    // Adjust for the 3-hour time difference (subtracting 3 hours)
    let adjustedHours = hours - 3;
    if (adjustedHours < 0) adjustedHours += 24; // Ensure the time doesn't go negative

    const period = adjustedHours >= 12 ? "PM" : "AM";
    const hours12 = adjustedHours % 12 || 12; // Convert to 12-hour format and handle 0 hours as 12
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours12}:${minutesFormatted} ${period}`;
  };

  useEffect(() => {
    setLoading(true);
    // Fetch event details with registrations
    fetch(`https://ayzonfoundation.org/api/events/registered/${eventId}/`)
      .then((response) => response.json())
      .then((data) => {
        setEventDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return <p className="admin-details">Loading event details...</p>;
  }

  if (!eventDetails) {
    return (
      <p className="admin-details">
        Failed to load event details. Please try again later.
      </p>
    );
  }

  return (
    <div>
      <h1 className="event-details-title">{eventDetails.title}</h1>
      <p className="event-details-text">
        <strong>Description:</strong> {eventDetails.description}
      </p>
      <p className="event-details-text">
        <strong>Venue:</strong> {eventDetails.venue}
      </p>
      <p className="event-details-text">
        <strong>Date:</strong> {eventDetails.date}
      </p>
      <p className="event-details-text">
        <strong>Time:</strong> {formatTime(eventDetails.time)}
      </p>

      <h2 className="registered-users-title">
        Registered Users ({eventDetails.registered_users.length})
      </h2>

      {eventDetails.registered_users.length > 0 ? (
        <table className="registration-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {eventDetails.registered_users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No registrations yet.</p>
      )}
    </div>
  );
};

export default EventDetailsWithRegistrations;
