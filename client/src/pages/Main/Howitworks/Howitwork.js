import React, { useState } from "react";
import Employers from "./Employers";
import Freelancers from "./Freelancers";
// import { Link } from "react-router-dom";

function Howitwork() {
  const [toggle, setToggle] = useState("Freelancers");
  return (
    <div id="how-it-works" className="bg-[#F6F6F6] pb-20 md:pb-0">
      <div className="howitwork max-w-[1170px] mx-auto text-[#141C3A] flex justify-center items-center flex-col">
        <div className="flex flex-col gap-5 md:gap-10 sm:mx-12 md:mx-12 lg:mx-auto mx-6 ">
          <h1 className=" font-serif text-[28px] md:text-4xl font-bold text-center mt-20 sm:mt-10">
            How Freelance Hub Works
          </h1>
          <h3 className="text-[16px] md:text-lg mx-5 text-center md:w-[500px]">
            Find and hire freelance talent using our secure, flexible and
            cost-effective online platform.
          </h3>
        </div>
        <div className="flex border border-[#141C3A] my-10 rounded-[50px]">
          <button
            className={
              toggle === "Employers"
                ? " flex items-center justify-center bg-[#141C3A] rounded-[50px] p-4 md:block m-0 text-base md:text-lg text-white w-[150px]"
                : " flex items-center justify-center border-[#141C3A] bg-transparent rounded-[50px] p-4 w-[150px] md:block m-0 text-base md:text-lg"
            }
            onClick={() => {
              setToggle("Employers");
            }}
          >
            Employers
          </button>
          <button
            className={
              toggle === "Freelancers"
                ? " flex items-center justify-center bg-[#141C3A] rounded-[50px] p-4 w-[150px] md:block m-0 text-base md:text-lg text-white"
                : " flex items-center justify-center bg-transparent rounded-[50px] p-4 w-[150px] md:block m-0 text-base md:text-lg"
            }
            onClick={() => {
              setToggle("Freelancers");
            }}
          >
            Freelancers
          </button>
        </div>
      </div>
      <div>{toggle === "Employers" ? <Employers /> : <Freelancers />}</div>
    </div>
  );
}

export default Howitwork;
