import React from "react";
// import Footer from './Footer'
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";

function Layout(props) {
  return (
    <div>
      <Navbar isLoggedIn={false} />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
