import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Freelance-Hub-logo.png";

function Redirect() {
  return (
    <div className=" bg-[#F6F6F6] mx-auto">
      <div className="redirect max-w-[570px] h-screen mx-auto text-[#141C3A] flex justify-center items-center flex-col">
        <Link to="/" className="px-1">
          <img src={logo} className="sm:w-[300px] w-[200px] mb-10" alt="logo" />
        </Link>

        <div className="flex flex-col sm:flex-row gap-7 justify-center items-center">
          <Link
            to="/signupJobGiver"
            className="sm:h-[200px] sm:w-[300px] h-[80%] w-[90%] bg-transparent flex items-center justify-center text-2xl text-left border rounded-sm hover:bg-[#141C3A] hover:text-white border-[#141C3A] "
          >
            <h1>
              SignUp as <br />
              <span className="font-bold text-[30px]">
                JOBGIVER
              </span>
            </h1>
          </Link>
          <Link
            to="/SignupJobTaker"
            className="sm:h-[200px] sm:w-[300px] h-[80%] w-[90%]  bg-transparent flex items-center justify-center text-2xl text-left border border-[#141C3A] rounded-sm hover:bg-[#141C3A] hover:text-white"
          >
            <h1>
              SignUp as <br />
              <span className="font-bold text-[30px]">
                JOBTAKER
              </span>
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Redirect;
