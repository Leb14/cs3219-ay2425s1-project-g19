import React from "react";
import peerPrep from "../../assets/peerprep.png";

function RightSidebar() {
  return (
    <div className="w-[20rem] mt-[6rem] h-[calc(100%-5rem)] fixed right-0 top-0 ">
      {/* Profile section */}
      <div className="m-6">
        <div
          className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem]
        hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
        >
          <div>
            <img src={peerPrep} width={70} height={70} alt="logo" />
          </div>
          <div>
            <h1 className="message flex flex-col text-xl">
              <span className="text-[#71717a] font-medium">Welcome back,</span>
              <span className="text-[#71717a] font-bold">PeerPrep!</span>
            </h1>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-400">
              <p className="whitespace-nowrap">Total Questions:</p>
              <p className="pl-4 relative flex gap-2">
                <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
                <span className="font-medium text-4xl text-[#333]">10</span>
              </p>
            </div>
            <div className="text-gray-400">
              <p className="whitespace-nowrap">Completed Questions:</p>
              <p className="pl-4 relative flex gap-2">
                <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
                <span className="font-medium text-4xl text-[#333]">0</span>
              </p>
            </div>
          </div>
        </div>

        <h3 className="mt-8 font-medium ">Activity</h3>
      </div>
      {/* Chart section */}
      <div className="mt-4 mx-6"></div>
    </div>
  );
}

export default RightSidebar;
