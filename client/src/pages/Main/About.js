import React from "react";

function About() {
  return (
    <div id="about">
      <div className="howitwork max-w-[1170px] mx-auto text-[#141C3A] flex justify-center items-center mt-8 flex-col ">
        <div className="flex flex-col gap-5 sm:mx-12  md:mx-12 lg:mx-auto mx-6 justify-center items-center">
          <h1 className="text-[30px] font-bold text-center">About Us</h1>
          <h3 className="text-[16px] md:text-[20px] ] text-center w-[90%]">
            Welcome to Freelance HUB – your premier destination for connecting
            talented freelancers with innovative projects worldwide. Our mission
            is to revolutionize the way businesses and freelancers collaborate,
            making it easier than ever to find the right match for every
            project.
          </h3>

          <h1 className="text-[28px] font-bold text-center mt-10">
            Who are we
          </h1>
          <h3 className="text-[16px] md:text-[20px]  text-center w-[90%]">
            At Freelance HUB, we believe in the power of flexibility and the
            freedom to work on your terms. Founded in [Year], we have grown into
            a vibrant community of skilled professionals and forward-thinking
            businesses. Our platform caters to a wide range of industries,
            including technology, design, marketing, writing, and more.
          </h3>
          <h1 className="text-[28px] font-bold text-center mt-10">
            Our Mission
          </h1>
          <h3 className="text-[16px] md:text-[20px] text-center w-[90%] ">
            Our mission is to empower freelancers to showcase their skills and
            help businesses find the perfect talent for their projects. We
            strive to create an ecosystem where both freelancers and employers
            can thrive, fostering collaboration, creativity, and success.
          </h3>
          <h3 className="text-[18px] text-center w-[90%] sm:mt-5 p-5  border border-[#141C3A] mb-14">
            Join us at Freelance HUB and be a part of a community that values
            talent, creativity, and the freedom to work your way. Whether you’re
            a freelancer looking for exciting opportunities or a business
            seeking top-notch talent, we’re here to help you succeed.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default About;
