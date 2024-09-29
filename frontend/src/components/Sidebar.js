import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import dashboardIcon from "../assets/dashboard.png";
import questionIcon from "../assets/question.png";
import userIcon from "../assets/user.png";
import peerPrep from "../assets/peerprep.png"
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

      <a 
        href="/profile" 
        className="user-container"
      >
        <img 
          src={userIcon} 
          alt="User Icon" 
          className="user-icon"
        />

        <p className="admin-text">
          Admin
        </p>
      </a>

      <hr className="sidebar-divider" />
      
      <a
        className="dashboard-container"
        aria-current="page"
        href="/dashboard"
      >
        <img
          src={dashboardIcon}
          alt="Dashboard Icon"
          className="dashboard-icon"
        />
          <p className="dashboard-text">
            Dashboard
          </p>
      </a>

      <a
        className="questions-container"
        aria-current="page"
        href="/question"
      >
        <img
          src={questionIcon}
          alt="Dashboard Icon"
          className="questions-icon"
        />
          <p className="questions-text">
            Questions
          </p>
      </a>
    </nav>
  );
};

export default Sidebar;
