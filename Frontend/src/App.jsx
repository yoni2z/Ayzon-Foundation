import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./index.css";
import ActionSection from "./Pages/ActionSection/ActionSection";
import Blog from "./Pages/Blog/Blog";
import BlogList from "./Pages/Blog/BlogList";
import SuatainableDev from "./Pages/SustaniableDevelopment/sustainable_dev";
import QualityEducation from "./Pages/QualityEducation/qualityEducation";
import WASH from "./Pages/WASH/WASH";
import WomAndYou from "./Pages/WomenAndYouthEmpowerment/WomAndYou";
import Who_We_Are from "./Pages/Who_We_Are/Who_We_Are";
import Navbar from "./Components/Navbar/Navbar";
import BlogsReadMore from "./Pages/Blog/blogs_read_more";
import Event from "./Pages/Event/Event";
import Events from "./Pages/Events/Events";
import EventDashboard from "./Pages/EventAdmin/EventDashboard";
import Template from "./Pages/What_We_Do/Template";
import Project from "./Pages/Projects_Detail/Project";
import ProjectList from "./Pages/Project_List/Project_List";
import SheCan from "./Pages/She_Can/SheCan";
import Profile from "./Pages/Profile/Profile";
import { Home } from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import ResumeForm from "./Pages/She_Can_Form/ResumeForm";
import Login from "./Pages/Login/Login";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import Gallery from "./Pages/Gallery/Gallery";
import MeetTheFounder from "./Pages/meet-the-founder/MeetTheFounder";
import ScrollToTopButton from "./Components/ScrollToTop/ScrollToTop";
import DonateButton from "./Components/DonateButton/SideDonateButton";
// import VolunteerForm from "./Pages/Volunteer_Form/VolunteerForm";

import ItemList from "./Pages/Shop_Page/layouts/ItemList/ItemList";
import ItemDetails from "./Pages/Shop_Page/components/ItemDetails/ItemDetails";
import CategoryDisplay from "./Pages/Shop_Page/components/ProductDisplay/ProductDisplay";
import SideDonateButton from "./Components/DonateButton/SideDonateButton";

function AppContent() {
  const location = useLocation();

  // Define routes where the navbar should be hidden
  const hideNavbarRoutes = ["/eventadmin"];

  return (
    <div className="App">
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getinvolved" element={<ActionSection />} />
        <Route
          path="/blogs"
          element={
            <>
              <Blog />
              <BlogList />
            </>
          }
        />
        <Route path="/blogs/:id" element={<BlogsReadMore />} />
        <Route
          path="/what-we-do"
          element={
            <>
              <SuatainableDev />
              <QualityEducation />
              <WASH />
              <WomAndYou />
            </>
          }
        />
        <Route path="/who-we-are" element={<Who_We_Are />} />
        <Route path="/event" element={<Events />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/eventadmin" element={<EventDashboard />} />
        <Route path="/program/:programId" element={<Template />} />
        <Route path="/subprogram/:programId" element={<ProjectList />} />
        <Route path="/project/:projectId" element={<Project />} />
        <Route path="/shecan" element={<SheCan />} />
        <Route path="/shecan/:sheCanId" element={<Profile />} />
        <Route path="/shecan_form" element={<ResumeForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/meet-the-founder" element={<MeetTheFounder />} />
        <Route path="/volunteer_form" element={<VolunteerForm />} />
        <Route path="/shop" element={<ItemList />}>
          <Route path=":category" element={<CategoryDisplay />} />
          <Route path=":category/:id" element={<ItemDetails />} />
        </Route>
        <Route
          path="*"
          element={
            <div
              style={{
                fontSize: "72px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
              }}
            >
              Page Not Found
            </div>
          }
        />
      </Routes>
      <ScrollToTopButton />
      <Footer />
      <SideDonateButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
