import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import shelf from "../../Assets/Images/ActionSection/shelf.jpg";
import books from "../../Assets/Images/ActionSection/books.jpg";
import lamp from "../../Assets/Images/ActionSection/lamp.jpg";
import takeaction from "../../Assets/Images/ActionSection/takeaction.jpg";
import flower from "../../Assets/Images/ActionSection/flower.jpg";
import one from "../../Assets/Images/ActionSection/one.png";

function ActionSection() {
  const [selectedTab, setSelectedTab] = useState("one-time-gift"); // Tracks selected tab
  const [donationAmount, setDonationAmount] = useState("");
  const [coverFees, setCoverFees] = useState(false);

  const donationOptions = {
    "one-time-gift": [10, 25, 50, 100, 250, 500],
    "join-member": [10, 25, 50, 100, 250, 500], // Monthly contribution options
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setDonationAmount(""); // Reset amount when tab changes
  };

  const handleAmountClick = (amount) => {
    setDonationAmount(amount);
  };

  const isDonateButtonActive = donationAmount !== "";

  return (
    <section>
      <div className="action-section">
        <img
          src={takeaction}
          alt="Ayzon Foundation Background"
          className="background-image"
        />
        <h1>TAKE ACTION</h1>
      </div>

      <section className="action-container">
        <h1 style={{ color: "black" }}>Donate to Ayzon Foundation</h1>

        <div className="tab-buttons">
          <button
            className={`tab-btn ${
              selectedTab === "one-time-gift" ? "active" : ""
            }`}
            onClick={() => handleTabChange("one-time-gift")}
          >
            Make One-Time Gift
          </button>
          <button
            className={`tab-btn ${
              selectedTab === "join-member" ? "active" : ""
            }`}
            onClick={() => handleTabChange("join-member")}
          >
            Join Us as a Member
          </button>
        </div>

        <div className="donation-buttons">
          {donationOptions[selectedTab].map((amount) => (
            <a
              key={amount}
              href="#"
              className={`donation-btn ${
                donationAmount == amount ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleAmountClick(amount);
              }}
            >
              {selectedTab === "join-member" ? `$${amount}/MON` : `$${amount}`}
            </a>
          ))}
        </div>

        <input
          type="number"
          placeholder="Enter the amount you would like to give"
          className="amount-input"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />

        <div className="cover-fees">
          <input
            type="checkbox"
            id="cover-fees"
            checked={coverFees}
            onChange={() => setCoverFees(!coverFees)}
          />
          <label htmlFor="cover-fees">I’ll cover my transaction fees</label>
        </div>

        <button
          className={`donate-btn ${isDonateButtonActive ? "active" : ""}`}
          disabled={!isDonateButtonActive}
          onClick={() => console.log(`Donated: $${donationAmount}`)} // Replace with payment API integration
        >
          Donate
        </button>
      </section>

      <section className="donate-in-kind-section">
        <h1 style={{ color: "black" }}>Donate in Kind</h1>
        <div className="donate-in-kind">
          {[
            {
              title: "Chair",
              percentage: 70,
              image: books,
              text: "Help us provide educational materials to children.",
            },
            {
              title: "Lamp",
              percentage: 45,
              image: lamp,
              text: "Contribute to our food drives to fight hunger.",
            },
            {
              title: "Shelf",
              percentage: 85,
              image: shelf,
              text: "Support families by donating clothes for all seasons.",
            },
          ].map((item, index) => (
            <div key={index} className="donation-card">
              <img
                src={item.image}
                alt={item.title}
                className="donation-image"
              />
              <h3>{item.title}</h3>
              <div className="progress-container">
                <p>{item.text}</p>
                <div className="circular-progress-circle">
                  <div
                    className="filled-circle"
                    style={{ "--percentage": item.percentage * 3.6 }} // Convert percentage to degrees
                  ></div>
                  <div className="inner-circle">
                    <span>{item.percentage}%</span>
                  </div>
                </div>
              </div>
              <p>
                <strong>Items remaining: </strong>25
              </p>
              <a href="#" className="donate-kind-btn">
                Donate
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="noMoney-section">
        <h2>You don't have money to donate now?</h2>
        <p>You can still help us!</p>
      </section>
      <section className="full-width-section">
        <h2>Lend us a property</h2>
        <p>
          Do you have an unused property, office space, or even a vacant lot
          that could serve a greater purpose? By lending it to us, you can help
          transform these spaces into centers for education, community
          engagement, or temporary shelters for those in need. Properties that
          are currently idle can be used to host workshops, events, or learning
          hubs that uplift underserved communities. Your contribution will not
          only provide immediate support but also help lay the foundation for
          long-term development and empowerment. Together, we can give life to
          spaces that otherwise remain underutilized, creating environments
          where hope, growth, and collaboration thrive.
        </p>
        <a href="#contacts" className="column-button">
          Contact Us
        </a>
      </section>
      <section className="full-width-section">
        <h2>Donate you Service</h2>
        <p>
          Are you skilled in a profession or trade that could benefit the
          community? Donating your time and service can have an incredible
          impact on our programs. Whether you’re a teacher, artist, developer,
          healthcare worker, or professional in any other field, your
          involvement allows us to expand our efforts while keeping costs low.
          For example, volunteering to mentor students, develop campaigns, offer
          legal advice, or provide counseling can significantly enhance the
          lives of those we serve. Your expertise can open doors to new
          opportunities and make a lasting difference where it matters most.
          Every act of service helps us build a better future, and we deeply
          value your contribution.
        </p>
        <a href="#contacts" className="column-button">
          Contact Us
        </a>
      </section>
      <section className="full-width-section">
        <h2>Suggest how you can help us</h2>
        <p>
          We believe that meaningful change comes from collaborative efforts and
          creative thinking. If you have a unique idea or approach to helping us
          achieve our goals, we would love to hear from you! Whether you
          envision organizing a community event, starting a fundraising
          initiative, or leveraging your network to provide additional support,
          your input can have a transformative effect. There are countless ways
          to make a difference, and your ideas—no matter how unconventional—can
          lead to impactful change. We are always open to suggestions because we
          believe that every individual has something valuable to offer. Let’s
          work together to create solutions that inspire growth, unity, and a
          brighter future for all.
        </p>
        <a href="#contacts" className="column-button">
          Contact Us
        </a>
      </section>

      <div id="buy-arts" className="second-section">
        <div className="text-part">
          <h2>Buy Arts & Support the Cause</h2>
          <p>
            Check out our Photography Exhibition with – Genaye, a photographer
            based in Ethiopia who has shown us the effects of war and how we can
            help.
          </p>
          <p>
            Education is the cornerstone of progress, empowering individuals to
            break the cycle of poverty and build a better future. Access to
            clean water, proper sanitation, and hygiene education is essential
            for health and overall quality of life.
          </p>
          <p>
            Ayzon Foundation’s dedication to these causes is commendable, and we
            are proud to collaborate with Studio11 and Genaye to make this a
            reality.
          </p>
          <a href="#" className="buy-now-button">
            Buy Now
          </a>
        </div>
        <div>
          <img src={one} alt="Ayzon Foundation" />
        </div>
      </div>

      <div id="buy-plants" className="second-section">
        <div>
          <img src={flower} alt="Ayzon Foundation" />
        </div>
        <div className="text-part">
          <h2>Buy Plants & Flowers</h2>
          <p>
            At Blossom Haven, verdant leaves and vibrant petals dance in
            harmony, creating a symphony of colors and scents that captivate the
            senses. Our quaint shop offers a sanctuary for plant enthusiasts and
            flower lovers.
          </p>
          <p>
            Step into Blossom Haven, where nature’s beauty thrives, and let the
            tranquility of greenery envelop you in serenity.
          </p>
          <a href="#" className="buy-now-button">
            Buy Now
          </a>
        </div>
      </div>

      <div id="donor-memberships" className="large-section">
        <h2>Donor Memberships</h2>
        <p>
          Would you like to contribute by donating on a regular basis? As a
          donor member, you’ll have access to information ensuring that gifts
          are allocated appropriately. We’ll provide you with a letter and
          materials to remind you that you are part of our family.
        </p>
        <a href="#" className="btn-link">
          Donate
        </a>
      </div>

      <div id="volunteer-memberships" className="large-section">
        <h2>Volunteer Memberships</h2>
        <p>
          Would you like to contribute to the vision and collaborate with others
          passionate about accelerating our nation’s development? Join us and
          make a positive impact, working with international volunteers and
          professionals from around the world.
        </p>
        <Link
          to="/volunteer_form"
          className="btn-link"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Volunteer with Us
        </Link>
      </div>
    </section>
  );
}

export default ActionSection;
