import React, { useState } from "react";
import Employers from "./Employers";
import Freelancers from "./Freelancers";
// import { Link } from "react-router-dom";

function Howitwork() {
  const [toggle, setToggle] = useState("Freelancers");
  return (
    <div id="how-it-works"  className="bg-[#F6F6F6]" >

        <div className="howitwork max-w-[1170px] mx-auto text-[#023246] flex justify-center items-center mt-8 flex-col">
          <div className="flex flex-col gap-5 md:gap-10 sm:mx-12 md:mx-12 lg:mx-auto mx-6 ">
            <h1 className="text-[28px] md:text-[40px] font-bold text-center font-serif ">
              How Freelance Hub Works
            </h1>
            <h3 className="text-[16px] md:text-[20px] mx-5 text-center md:w-[500px]">
              Find and hire freelance talent using our secure, flexible and
              cost-effective online platform.
            </h3>
          </div>
          <div className="flex border border-[#023246] my-10 rounded-[50px]">
            <button
              className={
                toggle === "Employers"
                  ? " flex items-center justify-center bg-[#023246] rounded-[50px] p-4 md:block m-0 text-[16px] md:text-[20px] text-white w-[150px]"
                  : " flex items-center justify-center border-[#023246]bg-transparent rounded-[50px] p-4 w-[150px] md:block m-0 text-[16px] md:text-[20px]"
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
                  ? " flex items-center justify-center bg-[#023246] rounded-[50px] p-4 w-[150px] md:block m-0 text-[16px] md:text-[20px] text-white"
                  : " flex items-center justify-center bg-transparent rounded-[50px] p-4 w-[150px] md:block m-0 text-[16px] md:text-[20px]"
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
