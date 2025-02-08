import React, { useState, useEffect } from "react";
import style from "./Who_we_are.module.css";
import binocular from "../../Assets/Images/General/binoculars.png";
import target from "../../Assets/Images/General/target.png";
import value from "../../Assets/Images/General/value.png";
import topImage from "../../Assets/Images/General/whoweare.jpg";
import menu from "../../Assets/Images/General/menu-footer.png";

function Who_We_Are() {
  const [partners, setPartners] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);

  useEffect(() => {
    fetch("https://ayzonfoundation.org/api/partners/")
      .then((response) => response.json())
      .then((data) => setPartners(data))
      .catch((error) => console.error("Error fetching partners:", error));
  }, []);

  useEffect(() => {
    fetch("https://ayzonfoundation.org/api/board-members/")
      .then((response) => response.json())
      .then((data) => setBoardMembers(data))
      .catch((error) => console.error("Error fetching Board Members:", error));
  }, []);

  return (
    <section className={style.whoWeAreContainer}>
      <div className={style.container}>
        <div className={style.topPhoto}>
          <img className={style.topPic} src={topImage} />
          <h1 className={style.whoWeAre}>WHO WE ARE</h1>
        </div>
        <div className={style.secondaryCont}>
          <div className={style.firstPara}>
            <div className={style.whatWeDo}>
              <div className={style.title}>
                <h1
                  style={{
                    fontSize: "40px",
                    fontWeight: "300",
                    color: "#272727",
                    marginBottom: "0",
                  }}
                >
                  ABOUT US
                </h1>
                <img className={style.menu} src={menu} />
              </div>

              <p className={style.p}>
                Ayzon Foundation is a non-profit organization in Ethiopia
                dedicated to addressing societal challenges in alignment with
                the United Nations Sustainable Development Goals (SDGs). With
                over 300 volunteers, the foundation is legally registered under
                Ethiopia’s Authority for Civil Society Organizations (ACSO) and
                is committed to making a lasting impact in communities. Instead
                of fostering dependency, Ayzon promotes self-sufficiency by
                equipping individuals with sustainable skills to improve their
                livelihoods. Their initiatives focus on poverty reduction,
                education, and access to clean water, ensuring that
                disadvantaged individuals gain the tools to support themselves
                effectively.
              </p>
              <p className={style.p}>
                The foundation's education program helps communities build
                modern schools using locally sourced, familiar materials to
                create an environment that fosters learning and preserves
                indigenous knowledge. Additionally, Ayzon tackles water scarcity
                by drilling wells and training locals to continue the process
                independently. Recognizing the crucial role of youth and women
                in community development, the foundation runs empowerment
                programs offering technical and psychological training. This
                initiative also includes projects aimed at addressing challenges
                such as women’s hygiene by producing and distributing sanitary
                products free of charge, helping ensure their well-being and
                security.
              </p>
            </div>
          </div>
          <div className={style.missions}>
            <div className={style.missdivs}>
              <div className={style.icons}>
                <img className={style.icon} src={target} />
              </div>
              <h3>Our Mission</h3>
              <p className={style.misP}>
                To empower marginalized communities, particularly women and
                youth, by implementing sustainable development projects that
                build resilient education systems, improve access to clean water
                and sanitation, and foster economic opportunities for lasting
                change.
              </p>
            </div>
            <div className={style.missdivs}>
              <div className={style.icons}>
                <img className={style.icon} src={binocular} />
              </div>
              <h3>Our Vision</h3>
              <p className={style.misP}>
                A world where all individuals regardless of their background
                have equal opportunities to thrive.
              </p>
            </div>
            <div className={style.missdivs}>
              <div className={style.icons}>
                <img className={style.icon} src={value} />
              </div>
              <h3>Our Values</h3>
              <p className={style.misP}>
                Our values are Inclusion, Transparency, Teamwork, Teamwork, and
                Innovation
              </p>
            </div>
          </div>

          <div className={style.boardMembers}>
            <div className={style.title}>
              <h1
                style={{
                  fontSize: "40px",
                  fontWeight: "300",
                  color: "#272727",
                  marginBottom: "0",
                }}
              >
                BOARD MEMBERS
              </h1>
              <img className={style.menu} src={menu} />
            </div>
            <div className={style.submem}>
              {boardMembers.map((member, index) => {
                return (
                  <div className={style.member1}>
                    <div className={style.memImg}>
                      <img src={member.picture} className={style.memPic}></img>
                    </div>
                    <h1
                      style={{
                        fontSize: "32px",
                        fontWeight: "300",
                        color: "#272727",
                        textAlign: "center",
                        marginBottom: "0px",
                      }}
                    >
                      {member.fullName}
                    </h1>
                    <h1
                      className={style.memP}
                      style={{ fontSize: "19px", color: "gray" }}
                    >
                      {member.position}
                    </h1>
                    <article className={style.descriptionArt}>
                      {member.description}
                    </article>
                    <ul className={style.links}>
                      <li className={style.li}>
                        <a
                          className={style.whalink}
                          href="#"
                          style={{ color: "violet" }}
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li className={style.li}>
                        <a
                          className={style.whalink}
                          href="#"
                          style={{ color: "hsl(240, 100%, 65%)" }}
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </li>
                      <li className={style.li}>
                        <a
                          className={style.whalink}
                          href="#"
                          style={{ color: "hsl(240, 100%, 65%)" }}
                        >
                          <i className="fab fa-facebook"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.partners}>
            <div className={style.PartnerHeader}>
              <h1
                style={{
                  fontSize: "40px",
                  fontWeight: "300",
                  color: "#272727",
                  textAlign: "center",
                  marginBottom: "0",
                }}
              >
                OUR PARTNERS
              </h1>
              <img className={style.menu} src={menu} />
            </div>
            <div className={style.partner}>
              {partners.map((partner, index) => (
                <div key={partner.id} className={style[`partner${index + 1}`]}>
                  <img
                    className={style.logo}
                    src={partner.logo}
                    alt={partner.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Who_We_Are;
