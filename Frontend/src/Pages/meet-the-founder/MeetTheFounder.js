import React from "react";
import "./MeetTheFounder.css";

const MeetTheFounder = () => {
  return (
    <div className="meet-the-founder">
      <div className="banner">
        <div className="banner-dark">
          <h1 className="banner-title title-h1">Meet The Visionary Behind Ayzon</h1>

        </div>
      </div>

      {/* Founder Section */}
      <div className="section founder">
        <img
          src={require("./assets/founder.jpg")}
          alt="Shalom Yaqob Araya"
          className="founder-image"
        />
        <div className="founder-text">
          <h2 className="founder-name title-h2">Shalom Yaqob Araya</h2>
          <p className="founder-description">
            Shalom Yaqob Araya is the heart and soul of the Ayzon Foundation. A
            steadfast advocate for social equity, Shalom has dedicated his life
            to empowering communities in Ethiopia and beyond. From providing
            access to clean water and education to spearheading innovative
            humanitarian projects, he’s a beacon of hope for those in need. His
            deep compassion and relentless drive have inspired countless lives
            to rise above adversity and strive for a brighter future.
          </p>
        </div>
      </div>

      <div className="section highlight">
        <div className="highlight-text">
          <h2 className="highlight-title title-h2">Creating Pathways to Hope</h2>
          <p className="highlight-description">
            Through transformative initiatives like From War to School, the
            Ayzon Foundation has made it its mission to restore normalcy for
            children affected by conflict. By providing trauma recovery
            programs, educational supplies, and mentorship, this initiative
            nurtures resilience and enables these young minds to dream once
            again. Shalom believes education is not just a right but the most
            powerful tool to break cycles of poverty and despair.
          </p>
        </div>
        <img
          src={require("./assets/highlight1.jpg")}
          alt="Creating Pathways to Hope"
          className="highlight-image"
        />
      </div>

      <div className="section highlight">
        <img
          src={require("./assets/highlight2.png")}
          alt="Innovating for the Future"
          className="highlight-image"
        />
        <div className="highlight-text">
          <h2 className="highlight-title title-h2">Innovating for the Future</h2>
          <p className="highlight-description">
            The Knowledge Container project is one of Ayzon's boldest steps
            toward inclusive education. This mobile library initiative bridges
            gaps in resources by delivering books, digital tools, and
            interactive learning modules to underserved communities. Under
            Shalom’s leadership, these innovative solutions transform not only
            how education is accessed but also its quality and impact.
          </p>
        </div>
      </div>

      <div className="founder-message">
        <h2 className="message-title">A Message from Shalom</h2>
        <p className="message-content">
          "Together, we can change the world one step at a time. At Ayzon
          Foundation, we believe in empowering individuals to achieve their
          potential through compassion, collaboration, and innovation. Let’s
          join hands to build stronger communities and brighter futures for
          generations to come."
        </p>
      </div>

      <div className="founder-contact">
        <h2 className="contact-title">Connect with Shalom</h2>
        <div className="contact-details">
        <p className="founder-email">
          <a href="mailto:shalom@ayzonfoundation.org" className="contact-link">
          shalomyacobaraya@gmail.com
          </a> 
        </p>
        <p className="founder-phone">
          <a href="tel:+251938811111" className="contact-link">
          +251 911399834
          </a>
        </p>
        <p className="founder-website">
          <a href="https://shalomofficial.com" className="contact-link">
            shalomofficial.com
          </a>
        </p>
        <p className="founder-linkedIn">
          <a href="https://www.linkedin.com/in/shalomofficial/" className="contact-link">
            linkedIn
          </a>
        </p>
        </div>
      </div>
    </div>
  );
};

export default MeetTheFounder;
