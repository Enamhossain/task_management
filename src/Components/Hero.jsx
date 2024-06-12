// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaUserAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="min-h-[600px] sm:px-2 px-3 mx-3 max-h-[800px] py-20 rounded-t-2xl bg-[#FEFDFC]">
      <div className="flex justify-center flex-col">
        {/* Announcement line */}
        <div className="bg-[#FEFDFC] mx-auto max-w-[250px] pr-3 pl-1 py-[6px] rounded-full gap-2 flex items-center text-black">
          <span className="bg-[#a4f377] sm:px-3 px-2 sm:py-1 py-[3px] sm:text-base text-sm rounded-full">
            New
          </span>
          Task management 
        </div>
        {/* Banner Content */}
        <div className="mt-10">
          <h2 className="text-black lg:text-5xl md:text-4xl sm:text-3xl text-2xl max-w-[600px] mx-auto text-center font-extrabold">
            Streamline Your Workflow Efficiently.
          </h2>
          <p className="lg:text-xl md:text-lg text-[#8896AB] mt-5 max-w-[600px] text-center mx-auto text-sm">
            Experience the ultimate task management platform designed to boost
            your teams productivity. Manage tasks, set priorities, and
            collaborate seamlessly.
          </p>
          {/* Banner action */}
          <div className="mt-5 flex md:flex-row max-w-[450px] mx-auto justify-center gap-2 flex-col">
            <div className="md:ml-auto md:mr-0 lg:w-[55%] relative">
              <FaUserAlt className="absolute mt-[10px] ml-2 text-gray-400" />
              <input
                placeholder="Enter your email"
                className="pr-3 pl-8 rounded-lg w-full py-3"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="md:mr-auto md:ml-0 lg:w-[45%]">
              <button className="bg-[#b5d63b] sm:py-3 py-2 sm:text-base text-sm px-18 text-black rounded-lg h-full w-full">
              Let’s Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
