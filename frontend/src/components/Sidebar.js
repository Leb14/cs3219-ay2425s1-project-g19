import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dashboardIcon from "../assets/dashboard.png";
import questionIcon from "../assets/question.png";
import usersIcon from "../assets/group.png";
import adminIcon from "../assets/user.png";
import peerPrep from "../assets/peerprep.png";
import "../css/sidebar.css"; 

const Sidebar = ({onLogout}) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    sessionStorage.setItem("isAuthenticated", false);
    sessionStorage.setItem("isAdmin", false);
    sessionStorage.removeItem("token");
    onLogout();
    navigate("/");
  }

  return (
    <nav id="sidebarMenu" className="sidebar">
      <img 
        src={peerPrep} 
        alt="PeerPrep Logo" 
        className="peer-prep-logo mt-4"
      />

      <Link to="/profile" className="user-container">
        <img 
          src={adminIcon} 
          alt="Admin Icon" 
          className="admin-icon"
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
        to="/users"
        className={`users-container ${activeLink === "/question" ? "active" : ""}`}
      >
        <img
          src={usersIcon}
          alt="Users Icon"
          className="users-icon"
        />
        <p className="questions-text">Users</p>
      </Link>


      <Link
        to="/question"
        className={`questions-container ${activeLink === "/question" ? "active" : ""}`}
      >
        <img
          src={questionIcon}
          alt="Questions Icon"
          className="questions-icon"
        />
        <p className="questions-text">Questions</p>
      </Link>

      <button 
        onClick={() => {
          if (window.confirm("Are you sure you want to log out?")) {
            handleLogout();
          }
        }}
        type="submit" 
        className="btn"
      >
        Log Out
      </button>
    </nav>
  );
};

export default Sidebar;
