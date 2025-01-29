import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Event.module.css";
import { useParams } from "react-router-dom";

function Event() {
  const { id } = useParams(); // Use useParams to get event ID from the URL
  const [event, setEvent] = useState(null);
  const [time, setTime] = useState(new Date());
  const [countDown, setCountDown] = useState(true);
  const [attendee, setAttendee] = useState({
    attendee_name: "",
    attendee_email: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return; // Ensure id is available before making the request

    // Fetch event data using the event ID from the URL
    axios
      .get(`https://ayzonfoundation.org/api/events/${id}/`)
      .then((response) => {
        setEvent(response.data);
        setCountDown(new Date(response.data.date) > new Date());
      })
      .catch((error) => console.error("Error fetching event data:", error));

    // Timer countdown interval
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [id]); // Dependency array includes `id` so it re-fetches when the id changes

  if (!event) return <p>Loading event...</p>;

  const targetTime = new Date(event.date);
  const timeLeft = targetTime - time;
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const handleAttendeeChange = (e) => {
    setAttendee({ ...attendee, [e.target.name]: e.target.value });
  };

  function getCSRFToken() {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "csrftoken") return value;
    }
    return null;
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!event) {
      setMessage("Please select an event to register.");
      return;
    }

    fetch("https://ayzonfoundation.org/api/events/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify({
        event: event.id,
        name: attendee.attendee_name, // Use the attendee state
        email: attendee.attendee_email, // Use the attendee state
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

  return (
    <div className={style.evContainer}>
      <div className={style.event_background_top}>
        <img
          className={style.evImage}
          src={event.images[0]?.image || "placeholder.jpg"}
          alt={event.title}
        />
        <div className={style.topCont}>
          <div className={style.evDescription}>
            <h2 className={style.evName}>{event.title}</h2>
            <h3 className={style.evPlace}>{event.venue}</h3>
            <h3 className={style.evPlace}>{event.date}</h3>
          </div>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className={style.evBodyCont}>
        <div className={style.timeLeft}>
          {countDown ? (
            <>
              <div className={style.timeCont}>
                <div className={style.daysLeft}>
                  <p className={style.evP}>{daysLeft}</p>
                </div>
                <label className={style.timeLabel}>Days</label>
              </div>
              <div className={style.timeCont}>
                <div className={style.hoursLeft}>
                  <p className={style.evP}>{hoursLeft}</p>
                </div>
                <label className={style.timeLabel}>Hours</label>
              </div>
              <div className={style.timeCont}>
                <div className={style.minuetsLeft}>
                  <p className={style.evP}>{minutesLeft}</p>
                </div>
                <label className={style.timeLabel}>Minutes</label>
              </div>
              <div className={style.timeCont}>
                <div className={style.secondsLeft} id="se">
                  <p className={style.evP}>{secondsLeft}</p>
                </div>
                <label className={style.timeLabel}>Seconds</label>
              </div>
            </>
          ) : (
            <div className={style.eventClosedCont}>
              <p className={style.eventClosed}>
                <i className="fas fa-ban"></i> Event Closed!
              </p>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className={style.evBody}>
          <div className={style.ev_Paragraph_description}>
            <h3 className={style.abtEv}>About The Event</h3>
            <h1 className={style.evWelcome}>Welcome</h1>
            <p className={style.evDescPara}>{event.description}</p>
          </div>
          <div className={style.ev_body_image}>
            <img
              className={style.body_img}
              src={event.images[1]?.image || "placeholder.jpg"}
              alt="Event"
            />
          </div>
        </div>

        {/* Speakers */}
        <h2 className={style.speakersH1}>Speakers & Honored Guests</h2>
        <div className={style.evSpeakers}>
          {event.invited_guests.map((speaker, index) => (
            <div key={index} className={style.evSpeaker}>
              <img
                className={style.evSpPic}
                src={speaker.photo || "speaker-placeholder.jpg"}
                alt={speaker.name}
              />
              <h3 className={style.evSpeakerName}>{speaker.name}</h3>
              <p className={style.evSpDescription}>{speaker.description}</p>
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className={style.evRegistrationForm}>
          <h2 className={style.evRegH1}>Register for The Event!</h2>
          <input
            className={style.evInput}
            type="text"
            name="attendee_name"
            placeholder="Enter your name"
            onChange={handleAttendeeChange}
            required
          />
          <input
            className={style.evInput}
            type="email"
            name="attendee_email"
            placeholder="Enter your email"
            onChange={handleAttendeeChange}
          />
          <button className={style.evRegisterbtn}>Register</button>
        </form>
        {message && <p>{message}</p>}

        {/* Sponsors */}
        <h2 className={style.speakersH1}>Event Sponsors</h2>
        <div className={style.eventSponsors}>
          {event.sponsors.map((sponsor, index) => (
            <div key={index} className={style.evSponsorLogo}>
              <img
                className={style.evSponsorLogoImg}
                src={sponsor.logo || "sponsor-placeholder.jpg"}
                alt={sponsor.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Event;
