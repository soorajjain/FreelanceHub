import React from "react";
import hero from "../../assets/hero-sec.png";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className=" ">
      <div className="Hero-sec max-w-[1170px] h-[600px] grid lg:grid-row-2 text-[#023246] sm:mx-12 md:mx-12 lg:mx-18 xl:mx-auto mx-6 md:grid-cols-[60%_auto] items-center justify-center mb-10 lg:mb-0">
        <div className="flex mx-auto md:items-start items-center flex-col justify-center md:gap-10 gap-5 mt-[100px]">
          <div className="font-serif font-bold text-[32px] md:text-5xl mt-5 text-center md:text-left">
            Freelance services at your fingertips!
          </div>
          <div className="text-[16px] sm:text-lg py-2 w-[85%] text-center  md:text-left">
            Work with the best freelance talent from around the world on our
            secure, flexible and cost-effective platform.
          </div>
          <Link
            to="/login"
            id="how-it-works"
            className="border-[2px] border-[#023246]  hover:bg-[#023246] hover:text-[#FFFFFF] rounded-3xl lg:p-2 lg:px-8 p-2 px-5 text-sm sm:text-base "
          >
            Get Started
          </Link>
        </div>
        <div
          className=" max-w-[300px] lg:max-w-[400px] w-[90%] sm:w-[100%] flex justify-center items-center
           mx-auto mt-[40px] lg:mt-[100px]"
        >
          <img src={hero} className="" alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
