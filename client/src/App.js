import React from "react";
import Home from "./pages/Main/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

import Navfree from "./pages/freelancersJobTakers/NavbarFreelancers";
// import Navclient from "./pages/clientJobGiver/NavbarClient";

import FindJobs from "./pages/freelancersJobTakers/FindJobs";
import PostJob from "./pages/clientJobGiver/PostJob";
import Layout from "./components/Layouts/Layout";
import UpdateJob from "./pages/clientJobGiver/UpdateJob";
import UserProfile from "./pages/Auth/UserProfile";
import EditUserProfile from "./pages/Auth/EditUserProfile";
import NoPage from "./components/NoPage/NoPage";
import FindFreelancers from "./pages/clientJobGiver/FindFreelancers";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home page route */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          {/* Auth routes starts */}
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* Auth routes ends */}

          {/* Client side routes */}
          <Route
            path="/client/freelancers"
            element={
              <Layout>
                <FindFreelancers />
              </Layout>
            }
          />
          <Route
            path="/client/postJob"
            element={
              <Layout>
                <PostJob />
              </Layout>
            }
          />
          <Route
            path="/client/updateJob/:jobId"
            element={
              <Layout>
                <UpdateJob />
              </Layout>
            }
          />
          <Route
            path="/user/profile/:id"
            element={
              <Layout>
                <UserProfile />
              </Layout>
            }
          />
          <Route
            path="/user/editProfile/:id"
            element={
              <Layout>
                <EditUserProfile />
              </Layout>
            }
          />
          {/* client side routing ends */}

          {/* Freelancer side routing */}
          <Route
            path="/freelancer/findJobs"
            element={
              <Layout>
                <FindJobs />
              </Layout>
            }
          />

          <Route
            path="/freelancer/findJobs"
            element={
              <Layout>
                <FindJobs />
              </Layout>
            }
          />
          {/* Freelancer side routing ends */}
          {/* NoPage */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
