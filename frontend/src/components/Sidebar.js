import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardIcon from "../assets/dashboard.png";
import QuestionIcon from "../assets/question.png";
import UserIcon from "../assets/user.png";

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <nav id="sidebarMenu" className="sidebar">
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className={`nav-link ${activeLink === "/profile" ? "active" : ""}`}
              aria-current="page"
              href="/profile"
            >
              <img
                src={UserIcon}
                alt="User Icon"
                style={{ width: "60px", height: "60px" }}
              />
            </a>
          </li>
          <li className="profile-name">
            <span>Admin</span>
          </li>
          <hr style={{ margin: "20px 0" }} />
          <li className="nav-item">
            <a
              className={`nav-link ${activeLink === "/" ? "active" : ""}`}
              aria-current="page"
              href="/"
            >
              <img
                src={DashboardIcon}
                alt="Dashboard Icon"
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeLink === "/question" ? "active" : ""
              }`}
              href="/question"
            >
              <img
                src={QuestionIcon}
                alt="Question Icon"
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <span>Question</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
