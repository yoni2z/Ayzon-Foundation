import style from "./Who_we_are.module.css";
import binocular from "../../Assets/Images/General/binoculars.png";
import target from "../../Assets/Images/General/target.png";
import value from "../../Assets/Images/General/value.png";
import shalom from "../../Assets/Images/General/shalom.jpg";
import bim from "../../Assets/Images/General/BIM studio.jpeg";
import space from "../../Assets/Images/General/space.jpeg";
import water from "../../Assets/Images/General/water.jpg";
import wenovate from "../../Assets/Images/General/wenovate.png";
import semera from "../../Assets/Images/General/semeraUnv.jpg";
import harr from "../../Assets/Images/General/Harr.jpg";
import topImage from "../../Assets/Images/General/whoweare.jpg";
import menu from "../../Assets/Images/General/menu-footer.png";
import Eyasu from "../../Assets/Images/General/Eyasu.jpg";
import Mekdes from "../../Assets/Images/General/Mekdes.jpg";
import Henok from "../../Assets/Images/General/Henok.jpg";
import placeholder from "../../Assets/Images/General/placeholder.png";
const boardMembers = [
  {
    fullName: "SHALOM YACOB ARAYA",
    position: "Founder and Executive Director",
    picture: shalom,
    description:
      "The driving force behind the organization, a passionate leader with a commitment to creating sustainable change. With a visionary approach and extensive experience in social development, she has dedicated her career to empowering communities and fostering opportunities for growth.",
    email: "abcdefg",
    twitter: "abcdef",
    linkedin: "abcderf",
  },
  {
    fullName: "HENOK CHALLA FANTA",
    position: "Board Chair",
    picture: Henok,
    description:
      "A dynamic leader with a strong background in governance and organizational strategy. As Board Chair, he oversees the direction and effectiveness of the organization, ensuring its mission aligns with impactful initiatives and long-term goals.",
    email: "abcd@gmail.com",
    twitter: "qwertyuiop",
    linkedin: "abcdef",
  },
  {
    fullName: "MEKDES TADESSE",
    position: "Board Secretary",
    picture: Mekdes,
    description:
      "A dedicated professional known for her organizational skills and attention to detail. As Board Secretary, she ensures seamless communication and coordination among board members, playing a critical role in the success of the organization’s initiatives.",
    email: "abcd@gmail.com",
    twitter: "qwertyuiop",
    linkedin: "abcdef",
  },
  {
    fullName: "DR. MEKBEB TASSEW",
    position: "Board Member",
    picture: placeholder,
    description:
      "A distinguished professional with years of experience in academia and development work. As a Board Member, he brings analytical insight and practical expertise, ensuring that the organization’s strategies are both innovative and effective.",
    email: "abcd@gmail.com",
    twitter: "qwertyuiop",
    linkedin: "abcdef",
  },
];

function Who_We_Are() {
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
              Ayzon Foundation is a non-profit organization in Ethiopia dedicated 
              to addressing societal challenges in alignment with the United Nations 
              Sustainable Development Goals (SDGs). With over 300 volunteers, the foundation is 
              legally registered under Ethiopia’s Authority for Civil Society Organizations (ACSO) and is
               committed to making a lasting impact in communities. Instead of fostering dependency, Ayzon 
               promotes self-sufficiency by equipping individuals with sustainable skills to improve their livelihoods. 
               Their initiatives focus on poverty reduction, education, and access to clean water, ensuring that disadvantaged 
              individuals gain the tools to support themselves effectively.
              </p>
              <p className={style.p}>
              The foundation's education program helps communities build modern schools using locally sourced, familiar 
              materials to create an environment that fosters learning and preserves indigenous knowledge. Additionally, 
              Ayzon tackles water scarcity by drilling wells and training locals to continue the process independently. 
              Recognizing the crucial role of youth and women in community development, the foundation runs empowerment programs offering technical and psychological training. 
              This initiative also includes projects aimed at addressing challenges such as women’s hygiene by producing and distributing sanitary products free of charge, 
              helping ensure their well-being and security.
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
              <div className={style.first}>
                <img className={style.logo} src={bim} />
              </div>
              <div className={style.second}>
                <img className={style.logo} src={space} />
              </div>
              <div className={style.third}>
                <img className={style.logo} src={water} />
              </div>
              <div className={style.fourth}>
                <img className={style.logo} src={wenovate} />
              </div>
              <div className={style.fifth}>
                <img className={style.logo} src={semera} />
              </div>
              <div className={style.sixth}>
                <img className={style.logo} src={harr} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Who_We_Are;
