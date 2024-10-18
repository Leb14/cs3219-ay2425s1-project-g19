import React from "react";
import { moon, user } from "../../assets/icons/IconHeader";

const Header = () => {
  return (
    <header className="px-6 my-4 w-full flex items-center justify-between bg-[#f9f9f9]">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            Hi 💩
          </span>
          &nbsp;Welcome to PeerPrep
        </h1>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <div className="flex gap-4 items-center">
          <button className="h-[40px] w-[40px] text-pink-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">
            {moon}
          </button>

          <button className="h-[40px] w-[40px] text-pink-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]">
            {user}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
