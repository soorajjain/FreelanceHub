import React from "react";
import hero from "../../assets/hero-sec.png";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className=" ">
      <div className="w-full border-t-[1px] border-t-[#605d5d] py-[5px]">
        <div className="Hero-sec max-w-[1170px] h-[600px] grid lg:grid-row-2 text-[#023246] sm:mx-12 md:mx-12 lg:mx-18 xl:mx-auto mx-6 md:grid-cols-[50%_50%] items-center">
          <div className="flex mx-auto md:items-start items-center flex-col justify-center  sm:gap-10 gap-5">
            <div className="font-serif font-bold text-[32px] lg:text-[48px]  text-center md:text-left mt-5">
              Freelance services at your fingertips!
            </div>
            <div className="text-[16px] lg:text-[24px] py-2 w-[85%] text-center  md:text-left">
              Work with the best freelance talent from around the world on our
              secure, flexible and cost-effective platform.
            </div>
            <Link
              to="/Contact"
              className="border-[2px] border-[#023246]  hover:bg-[#023246] hover:text-[#FFFFFF] rounded-3xl lg:p-2 lg:px-8 p-2 px-5"
            >
              Get Started
            </Link>
          </div>
          <div className=" mx-7 max-w-[400px] w-[90%] sm:w-[100%] flex items-center justify-center mx-auto">
            <img src={hero} className="" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
