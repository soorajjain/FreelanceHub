import React from "react";
import favicon from "../../assets/favicon.png";
import { Link } from "react-router-dom";

function Footer() {
  const handleScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <div>
      <div className="border-t-[1px] border-t-[#605d5d] bg-[#F6F6F6] mt-10">
        <div className="w-full pt-10 md:pt-5 pb-10 md:pb-5">
          <footer className="Navbar max-w-[970px] ext-[#141C3A] mx-auto justify-between  items-center md:h-[300px] flex flex-col md:flex-row bg-[#F6F6F6]">
            <div className="block-1 flex justify-center md:items-start item-center flex-col md:gap-6 gap-4 ">
              <Link to="/" className="flex justify-center">
                <img src={favicon} className="w-[40px]" alt="logo" />
              </Link>
              <h1 className="font-bold text-center md:text-left">
                Go Make Something Awesome
              </h1>
              <div className="text-center md:text-left w-[80%] md:w-[300px] mx-auto">
                Freelancer Hub is a marketplace where employers and employees
                are able to find each other.
              </div>
              <h1 className="text-center md:text-left">
                Made with love by&nbsp;
                <a
                  className="underline"
                  href="https://github.com/soorajjain/Freelance-app.git"
                >
                  Sooraj jain
                </a>
              </h1>
            </div>
            <div className="block-2 flex gap-10 md:items-start md:justify-start justify-center item-center mt-14 md:mt-0">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold">Navigate</h1>
                <a
                  href="#home"
                  onClick={handleScroll}
                  className="hover:underline"
                >
                  Home
                </a>
                <Link to="/redirect" className="hover:underline">
                  Post a Job
                </Link>
                <Link to="/redirect" className="hover:underline">
                  Find a Freelancer
                </Link>
                <Link to="/redirect" className="hover:underline">
                  Find a Job
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="font-bold">Company Info</h1>
                <a
                  href="#about"
                  onClick={handleScroll}
                  className="hover:underline"
                >
                  About Us
                </a>
                <a
                  href="#how-it-works"
                  onClick={handleScroll}
                  className="hover:underline"
                >
                  How Freelance<br/> Hub works
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Footer;
