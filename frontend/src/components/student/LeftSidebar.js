import React from "react";
import { useLocation } from "react-router-dom";
import IconGrid from "../../assets/icons/IconGrid";
import IconHistory from "../../assets/icons/IconHistory";
import peerPrep from "../../assets/peerprep.png";

function LeftSidebar() {
  const location = useLocation();
  const pathName = location.pathname;

  const getStrokeColor = (path) => {
    return pathName === path ? "#1C274C" : "black";
  };

  const iconItems = [
    {
      icon: <IconGrid />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconHistory strokeColor={getStrokeColor("/completed")} />,
      title: "History",
      link: "/History",
    },
    // {
    //   icon: <IconSettings />,
    //   title: "Settings",
    //   link: "/Settings",
    // }
  ];

  return (
    <div className="basis-[5rem] flex flex-col bg-[#ff0000]">
      <div className="flex items-center justify-center h-[5rem]">
        <img src={peerPrep} width={40} height={40} alt="logo" />
      </div>
    </div>
  );
}

export default LeftSidebar;
