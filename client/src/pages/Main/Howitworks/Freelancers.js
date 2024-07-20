import React from "react";
import f1 from "../../../assets/f1.jpg";
import f2 from "../../../assets/j2.jpg";
import f3 from "../../../assets/j3.jpg";
import f4 from "../../../assets/j4.jpg";
import { Link } from "react-router-dom";

function Freelancers() {
  return (
    <div className="bg-[#F6F6F6] pb-20 md:pb-0">
      <div className="Hero-sec max-w-[870px] grid grid-row-2 text-black sm:mx-12  md:mx-12 lg:mx-auto mx-10 md:grid-cols-2 items-center justify-center sm:flex-row ">
        <div className="flex mx-auto items-center md:items-start flex-col justify-center order-2 gap-7">
          <div className="font-serif font-bold text-[28px] md:text-3xl md:text-left">
            Sign In
          </div>
          <div className="text-[16px]  w-[300px] text-center md:text-left ">
            Create your Freelancer profile easily.
          </div>
          <Link
            to="/Contact"
            className="border-[2px] border-[#023246]  hover:bg-[#023246] hover:text-[#FFFFFF] rounded-3xl md:p-2 md:px-6 p-2 px-5"
          >
            Get Started
          </Link>
        </div>
        <div className="order-1 mt-5 mb-5 md:mt-0 md:mb-5 mx-5">
          <img className="w-[390px]" src={f1} alt="logo" />
        </div>
      </div>

      {/* 2 */}

      <div className="Hero-sec max-w-[870px] h-[400px] grid grid-row-2 text-black sm:mx-12  md:mx-12 lg:mx-auto mx-6 md:grid-cols-2 items-center justify-center sm:flex-row mt-28 md:mt-0 ">
        <div className="flex mx-auto items-center md:items-start flex-col justify-center md:order-1 order-2 ">
          <div className="font-serif font-bold text-[28px] md:text-3xl md:text-left text-center">
            Find the Job
          </div>
          <div className="text-[16px]  pt-4 w-[300px] text-center md:text-left">
            We make it easy to identify and apply for the jobs that match your
            skills and services.
          </div>
        </div>
        <div className="md:order-2 order-1 mt-5 mb-5 md:mt-0 md:mb-5 mx-5">
          <img className="w-[390px]" src={f2} alt="logo" />
        </div>
      </div>

      {/* 3 */}

      <div className="Hero-sec max-w-[870px] h-[400px] grid grid-row-2 text-black sm:mx-12  md:mx-12 lg:mx-auto mx-6 md:grid-cols-2 items-center justify-center sm:flex-row mt-28 md:mt-0 ">
        <div className="flex mx-auto items-center md:items-start flex-col justify-center  order-2 ">
          <div className="font-serif font-bold text-[28px] md:text-3xl md:text-left mt-3 text-center">
            Manage the Work
          </div>
          <div
            className="
          text-[16px]  pt-4 w-[300px] text-center md:text-left"
          >
            Use WorkRooms to work efficiently, collaborate with team members,
            and communicate with Employers.
          </div>
        </div>
        <div className="order-1 mt-5 mb-5 md:mt-0 md:mb-5 mx-5">
          <img className="w-[390px]" src={f3} alt="logo" />
        </div>
      </div>

      {/* 4 */}

      <div className="Hero-sec max-w-[870px] h-[400px] grid grid-row-2 text-black sm:mx-12  md:mx-12 lg:mx-auto mx-6 md:grid-cols-2 items-center justify-center sm:flex-row mt-28 md:mt-0 ">
        <div className="flex mx-auto items-center md:items-start flex-col justify-center md:order-1 order-2">
          <div className="font-serif font-bold text-[28px] md:text-3xl md:text-left mt-3">
            Get Paid
          </div>
          <div className="text-[16px]  pt-4 w-[300px] text-center md:text-left">
            Get paid for the work you do in a timely manner through our secure
            payment system.
          </div>
        </div>
        <div className="md:order-2 order-1mt-5 mb-5 md:mt-0 md:mb-5 mx-5 ">
          <img className="w-[390px]" src={f4} alt="logo" />
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Freelancers;
