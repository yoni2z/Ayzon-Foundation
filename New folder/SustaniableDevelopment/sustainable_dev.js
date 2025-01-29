import React from "react";
import sus_dev from "../../Assets/Images/sus_dev.png";
import whatwedo_header from "../../Assets/Images/whatwedo_header.jpg";
import menufooter from "../../Assets/Images/General/menu-footer.png";
import "../styles.css";

const SuatainableDev = () => {
  return (
    <div>
      <div
        className="header"
        style={{ backgroundImage: `url(${whatwedo_header})` }}
      >
        <h1>WHAT WE DO</h1>
      </div>
      <div className="sus_description">
        <img src={sus_dev} alt="Sustainable Development Goals Logo"></img>
        <p>
          Our programs in quality education, WASH (Water, Sanitation, and
          Hygiene) and women and youth empowerment are meticulously designed to
          contribute to the United Nations Sustainable Development Goals by
          2030.
          <br />
          <br />
          We are committed to making a positive impact on the world by
          addressing these critical areas that are essential for creating a
          sustainable and equitable future for all. Together, we can make a
          meaningful difference and work towards achieving the Sustainable
          Development Goals by 2030.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "5rem auto",
          width: "fit-content",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            color: "#26282A",
          }}
        >
          OUR PROGRAMS
        </h1>
        <img
          src={menufooter}
          alt="Ayzon Colors Footer"
          style={{ width: "100%", height: "3px" }}
        />
      </div>
    </div>
  );
};
export default SuatainableDev;
