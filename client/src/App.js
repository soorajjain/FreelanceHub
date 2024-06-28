import React from "react";
import Home from "./pages/Main/Home";
import FindFreelancers from "./pages/clientJobGiver/FindFreelancers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupJobGiver from "./pages/loginSignup/jobGiver/SignupJobGiver";
import LoginJobGiver from "./pages/loginSignup/jobGiver/LoginJobGiver";

import SignupJobTaker from "./pages/loginSignup/jobTaker/SignupJobTaker";
import LoginJobTaker from "./pages/loginSignup/jobTaker/LoginJobTaker";

import Navfree from "./pages/freelancersJobTakers/NavbarFreelancers";
// import Navclient from "./pages/clientJobGiver/NavbarClient";

import FindJobs from "./pages/freelancersJobTakers/FindJobs";
import Layout from "./components/Layouts/Layout";
import Redirect from "./pages/loginSignup/Redirect";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/signupJobGiver" element={<SignupJobGiver />} />
          <Route path="/loginJobGiver" element={<LoginJobGiver />} />

          <Route path="/signupJobTaker" element={<SignupJobTaker />} />
          <Route path="/loginJobTaker" element={<LoginJobTaker />} />

          {/* trials */}

          <Route path="/navfree" element={<Navfree />} />
          {/* <Route path="/navclient" element={<Navclient />} /> */}

          {/* trials */}
          <Route
            path="/find_freelancers"
            element={
              <Layout>
                <FindFreelancers />
              </Layout>
            }
          />
          <Route
            path="/find_jobs"
            element={
              <Layout>
                <FindJobs />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
