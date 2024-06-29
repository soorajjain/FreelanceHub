import React from "react";
import Home from "./pages/Main/Home";
import FindFreelancers from "./pages/clientJobGiver/FindFreelancers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/loginSignup/Login";
import SignUp from "./pages/loginSignup/SignUp";

import Navfree from "./pages/freelancersJobTakers/NavbarFreelancers";
// import Navclient from "./pages/clientJobGiver/NavbarClient";

import FindJobs from "./pages/freelancersJobTakers/FindJobs";
import PostJob from "./pages/clientJobGiver/PostJob";
import Layout from "./components/Layouts/Layout";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };
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

          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

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
            path="/post_job"
            element={
              <Layout>
                <PostJob />
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
