import React from "react";
import HeroSection from "./HeroSection";
import Howitwork from "./Howitworks/Howitwork";
import About from "./About";

function Home() {
  return (
    <div>
      <HeroSection />
      <Howitwork/>
      <About/>
    </div>
  );
}

export default Home;
