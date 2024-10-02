import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import dashboardIcon from "../assets/dashboard.png";
import questionIcon from "../assets/question.png";
import userIcon from "../assets/user.png";
import peerPrep from "../assets/peerprep.png";
import "../css/sidebar.css"; // Import CSS file for additional styling

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <nav id="sidebarMenu" className="sidebar">
      <img 
        src={peerPrep} 
        alt="PeerPrep Logo" 
        className="peer-prep-logo"
      />

      <Link to="/profile" className="user-container">
        <img 
          src={userIcon} 
          alt="User Icon" 
          className="user-icon"
        />
        <p className="admin-text">Admin</p>
      </Link>

      <hr className="sidebar-divider" />

      <Link
        to="/"
        className={`dashboard-container ${activeLink === "/dashboard" ? "active" : ""}`}
      >
        <img
          src={dashboardIcon}
          alt="Dashboard Icon"
          className="dashboard-icon"
        />
        <p className="dashboard-text">Dashboard</p>
      </Link>

      <Link
        to="/question"
        className={`questions-container ${activeLink === "/question" ? "active" : ""}`}
      >
        <img
          src={questionIcon}
          alt="Question Icon"
          className="questions-icon"
        />
        <p className="questions-text">Questions</p>
      </Link>
    </nav>
  );
};

export default Sidebar;
