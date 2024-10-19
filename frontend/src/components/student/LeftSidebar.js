import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconGrid from "../../assets/icons/IconGrid";
import IconHistory from "../../assets/icons/IconHistory";
import IconSettings from "../../assets/icons/IconSettings";
import peerPrep from "../../assets/peerprep.png";
import { Link } from "react-router-dom";

function LeftSidebar({ onLogout }) {
  const location = useLocation();
  const pathName = location.pathname;

  const getStrokeColor = (path) => {
    return pathName === path ? "#3aafae" : "#71717a";
  };

  const iconItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconHistory strokeColor={getStrokeColor("/history")} />,
      title: "History",
      link: "/history",
    },
    {
      icon: <IconSettings strokeColor={getStrokeColor("/setting")} />,
      title: "Settings",
      link: "/setting",
    },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.setItem("isAuthenticated", false);
    sessionStorage.setItem("isAdmin", false);
    sessionStorage.removeItem("token");
    onLogout();
    navigate("/");
  };

  return (
    <div className="left-sidebar basis-[5rem] flex flex-col h-[100vh] bg-[#ffffff]">
      <div className="flex items-center justify-center h-[5rem]">
        <img src={peerPrep} width={40} height={40} alt="logo" />
      </div>

      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {iconItems.map((item, index) => (
            <li key={index} className="group relative">
              <Link to={item.link}>{item.icon}</Link>

              {/* Active Indicator */}
              <span className="indicator absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none bg-[#3aafae] px-2 py-1 rounded-md shadow-lg group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              handleLogout();
            }
          }}
          type="submit"
          className="btn mb-[1.5rem]"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default LeftSidebar;
